import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import {connect} from 'react-redux'

import { Row, Col, Layout, Card, Button, List, Avatar, Divider, Spin, Space, Modal} from 'antd';
import 'antd/dist/antd.css';

import GoogleMapReact from 'google-map-react';

import Nav from './Nav'
import FooterComp from './Footer';

const { Content } = Layout;


function ScreenMap(props) {

  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);

  const [articleList, setArticleList] = useState([]);
  const [sellerList, setSellerList] = useState([]);

  const [visible, setVisible] = useState(false) //modal

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch('/article-list');
      var response = await rawResponse.json();

      setArticleList(response.articles);
      setSellerList(response.sellers);
      console.log(response.sellers);
      console.log(response.articles)
    }
    loadData()
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
  //Si articleList est vide je met un spinner en attendant le chargement
  if (articleList.length<1){
    buyingList= <Space style={{marginTop: 10, display: 'flex', width : '100%', flexDirection: 'column', textAlign: 'center'}}>
      <Spin size="large" />
      <p style={{color:' #E23D70'}}>Chargement ...</p>
      </Space>
      
  }else{

    buyingList = articleList.map((item, i) => {
      let urlAvatar = "https://res.cloudinary.com/dmvudxnlz/image/upload/v1591715224/noavatar_wceh4i.png";
      let username;
      if(sellerList[i]){
        urlAvatar = sellerList[i].avatar;
        username = sellerList[i].username;
      }

    var lien;
    //Si le user existe je l'autorise à allez sur la page fabricant
    if(props.user){
      lien=`/fabricant/${item._id}`
    }else{
      lien=`/login`
    }

    return (

      <List.Item key={i} style={{alignItems: 'flex-start'}}>
        <Card hoverable title={item.title} bodyStyle={{width: 400, height: 300}} style={{margin : '20px 10px'}}>

          <Card.Meta title={username} avatar={<Avatar src={urlAvatar} style={{padding:0}}/>}/>

          <Button onClick={showModal} style={{color: '#E23D70', border: 'white'}}>Description</Button>

          <Divider/>
          <Card.Meta description={"Prix unitaire: " + item.priceUnit + " €"}/>
          <Card.Meta description={"Quantité dispo: " + item.stock}/>
          <Card.Meta description={"Qualité: " + item.quality}/>
          <Card.Meta description={"Couleurs: " + item.colors.join()}/>
          <Card.Meta description={"Matières: " + item.material.join()}/>
      
          <Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary"><Link to={lien}>Choisir cet article</Link></Button>
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
  })
  }

  return (

    <Layout className="layout" style={{height: 'auto', backgroundColor: 'white'}}>

      <Nav />

      <Content style={{ padding: '0 50px', margin: '40px 0'}} className="Map" > 
      <Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary">Chercher les fabricants autour de moi</Button>
        
        <Row style={{width: '80%',height: '60vh', marginTop: 30}}>
    
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyA6lFML5Gv6tvWgNl0X7kXn6X1uMQyzX8o' }}
              defaultCenter={center}
              defaultZoom={zoom}

            />
     
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


function mapStateToProps(state) {
  return { user: state.user }
}


export default connect(
  mapStateToProps,
  null )(ScreenMap);

