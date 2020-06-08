import React, { useState, useEffect } from 'react';
import '../App.css';
import { Row, Col, Layout, Card, Button, List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';

import GoogleMapReact from 'google-map-react';

import Nav from './Nav'
import FooterComp from './Footer';

const { Content } = Layout;


function ScreenMap() {

  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);

  const [articleList, setArticleList] = useState([])

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch('/article-list');
      var response = await rawResponse.json();
      setArticleList(response.article)
    }
    loadData()
  }, []);

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];




  let buyingList = articleList.map((item, i) => {
    return (

      <List.Item key={i}>
        <Card title={item.modele}>

          <Card.Meta description={item.description} avatar={item.img}>
          </Card.Meta>

          <Card.Meta description={item.price + " €"}>

          </Card.Meta>
        <Button><Link to={`/fabricant/${item._id}`}>Choisir cet article</Link></Button>
        </Card>
      </List.Item>
    )
  })

  // var cardWish = moviesWishList.map((movie,i) => {
  //   return (
  //     <ListGroupItem>
  //       <ListGroupItemText onClick={() => {handleClickDeleteMovie(movie.name)}}>
  //       <img width="25%" src={movie.img} /> {movie.name}
  //       </ListGroupItemText>
  //     </ListGroupItem>
  //   )
  // })

  return (

    <Layout className="layout" style={{height: '100vh'}}>

      <Nav />

      <Content style={{ padding: '0 50px', margin: '40px 0' }} className="Map" > 
        <Button style={{backgroundColor : '#E23D70', borderRadius: 5, boxShadow: '0px 3px 3px 0px black'}}>Chercher les fabricants autour de moi</Button>
        
        <div style={{ height: '60vh', width: '70%', marginTop: 30}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyA6lFML5Gv6tvWgNl0X7kXn6X1uMQyzX8o' }}
            defaultCenter={center}
            defaultZoom={zoom}

          />

        </div>


        <div>

          <h1>Liste des fabricants</h1>
          {buyingList}

        </div>
      </Content>
      <FooterComp/>
    </Layout>
  );
}

export default ScreenMap;
