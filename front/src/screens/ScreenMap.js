import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import {connect} from 'react-redux'

import { Row, Layout, Card, Button, List, Avatar, Divider, Spin, Space, Modal} from 'antd';
import 'antd/dist/antd.css';

import GoogleMapReact from 'google-map-react';

import Nav from './Nav'
import FooterComp from './Footer';
import Marker from './Marker';

const { Content } = Layout;


function ScreenMap(props) {

  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(9);
  const [myPos, setMyPos] = useState({});

  const [articleList, setArticleList] = useState([]);
  const [sellerList, setSellerList] = useState([]);

  const [visible, setVisible] = useState(false) //modal

  function geo_success(position) {
    console.log('geoloc succes')
  
    setMyPos({lat: position.coords.latitude, lng: position.coords.longitude})
  
    async function loadData() {
      var rawResponse = await fetch('/article-list');
      var response = await rawResponse.json();
  
      let sellers = [];
      let articles = [];
  
      // On affiche les vendeurs selon un certain rayon en Km
      response.sellers.map((seller, i) => {
       if(calculDistance(position.coords.latitude, position.coords.longitude, seller.coordinates[1], seller.coordinates[0]) < 250) { // Rayon de 100 Km
        sellers.push(seller);
        articles.push(response.articles[i]);
       }
      })
  
      setArticleList(articles);
      setSellerList(sellers);
    }
    loadData()
  }
  
  function geo_error() {
    console.log("Sorry, no position available.");
  }
  
  var geo_options = {
    enableHighAccuracy: true, 
    maximumAge        : 30000, 
    timeout           : 27000
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      /* la géolocalisation est disponible */
      navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
    } else {
          /* la géolocalisation n'est pas disponible */
          console.log('pas de geoloc')
    }

  }, []);

  //MODAL
  let showModal = () => {
    setVisible(true)
  };

  let handleOk = () => {
   setVisible(false)
  };

  let handleCancel = () => {
    setVisible(false)
   };

  var buyingList;
  var markers=[];
  //Si articleList est vide je met un spinner en attendant le chargement
  if (articleList.length<1){
    buyingList= <Space style={{marginTop: 10, display: 'flex', width : '100%', flexDirection: 'column', textAlign: 'center'}}>
      <Spin size="large" />
      <p style={{color:' #E23D70'}}>Chargement ...</p>
      </Space>
      
  }else{

     buyingList = []
   articleList.map((item, i) => {
      let urlAvatar = "https://res.cloudinary.com/dmvudxnlz/image/upload/v1591715224/noavatar_wceh4i.png";
      let username;
      if(sellerList[i]){
        urlAvatar = sellerList[i].avatar;
        username = sellerList[i].username;
      }

    var lien;
    //Si le user existe je l'autorise à allez sur la page fabricant
    if(props.user){
      lien=`/product/${item._id}`
    }else{
      lien=`/login`
    }


 if(!item.sellout){
  buyingList.push(

    <List.Item key={i} style={{textAlign: 'center'}}>
      <Card hoverable title={item.title} bodyStyle={{width: 300, height: 330}} style={{margin : '20px 10px'}}>

        <Card.Meta title={username} avatar={<Avatar src={urlAvatar}/>}/>

        <Button onClick={showModal} style={{color: '#E23D70', border: 'white'}}>Description</Button>

        <Divider/>
        <Card.Meta description={"Prix unitaire: " + item.priceUnit + " €"}/>
        <Card.Meta description={"Quantité dispo: " + item.stock}/>
        <Card.Meta description={"Qualité: " + item.quality}/>
        <Card.Meta description={"Couleurs: " + item.colors.join()}/>
        <Card.Meta description={"Matières: " + item.material.join()}/>
    
        <Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary"><Link to={lien}>Personnaliser ICI</Link></Button>
      </Card>
      <Modal title="Description de l'offre :"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
      >
        <p>{item.description}</p>
      
      </Modal>
    </List.Item>

  )

 }
    
  });

  // Markers 
  sellerList.map((item, i) => {
    let urlAvatar = item.avatar;
    let username = item.username;
    let lat = item.coordinates[1];
    let lng = item.coordinates[0];
    let articles = [];
    
    //on ajoute que les articles encore en vente
    for(let i=0; i<articleList.length; i++){
      if(!articleList[i].sellout && articleList[i].sellerId === item._id){
        articles.push(articleList[i]);
      }
    }

    var lien;
    //Si le user existe je l'autorise à allez sur la page fabricant
    if(props.user){
      lien=`/product/`
    }else{
      lien=`/login`
    }

    markers.push(
        <Marker
          lat = {lat}
          lng = {lng}
          username={username}
          urlAvatar = {urlAvatar}
          color="#92D050"
          id={i}
          lien={lien}
          articles={articles}
          
        />
      )
    
    

    
  });

  }

  return (

    <Layout className="layout" style={{minHeight: '100vh', height: 'auto', backgroundColor: 'white'}}>

      <Nav />

      <Content style={{ padding: '0 50px', margin: '40px 0'}} className="Map" > 
      <Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary">Chercher les fabricants autour de moi</Button>
        
        <Row style={{width: '80%',height: '60vh', marginTop: 30}}>
    
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyA7dxkypDmi6PUAA5D5tCx0mQ_s_UiwimM' }}
              defaultCenter={center}
              defaultZoom={zoom}
              center={myPos}
              >
                {markers}
            </GoogleMapReact>
     
        </Row>
        <Row style={{marginTop: 25}}>
            
          <h3 style={{fontWeight: 700, fontSize: 30}}>Liste des fabricants</h3>
        
        </Row>
        <Row justify='center'>
            
          {buyingList}

        </Row>

      </Content>
      <FooterComp/>
    </Layout>
  );
}




function radian(degrees) { // transformer degrés en radians
  let pi = Math.PI;
  return degrees * (pi/180);
}

function calculDistance(lat1, lon1, lat2, lon2){ // calcul de distance entre 2 points, valeur retournée en Km
  let distance = Math.acos(Math.sin(radian(lat1))*Math.sin(radian(lat2)) + Math.cos(radian(lat1))*Math.cos(radian(lat2))*Math.cos(radian(lon1-lon2)))*6371;
  return distance;
}

function mapStateToProps(state) {
  return { user: state.user }
}


export default connect(
  mapStateToProps,
  null )(ScreenMap);

