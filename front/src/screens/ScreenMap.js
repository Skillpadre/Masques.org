import React, { useState, useEffect } from 'react';
import '../App.css';
import { Row, Col, Layout, Card, Button, List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import 'antd/dist/antd.css';
import Nav from './Nav'
const { Content, Footer } = Layout;


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

  return (

    <div>

      <Nav />

      <Row>
        <Col offset={10} span={4}>
          <Button style={{ backgroundColor: '#E23D70', borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20 }}>Chercher les fabricants autour de moi</Button>
        </Col>

      </Row>
      <div className="Map" >
        <Row>
          <Col offset={1} span={11}>
            <div style={{ height: '75vh', width: '100%', marginTop: 25 }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyA6lFML5Gv6tvWgNl0X7kXn6X1uMQyzX8o' }}
                defaultCenter={center}
                defaultZoom={zoom}
              />

            </div>
          </Col>

          <Col offset={1} span={11}>
            <Row> <Col offset={4}><h1>Liste des fabricants</h1></Col></Row>
            <Row gutter={15} >
              {buyingList}
            </Row>
          </Col>

        </Row>
      </div>

      <Footer style={{ textAlign: 'center', marginTop: 30 }}>© 2020 Masques.org. Tous droits réservés.</Footer>
    </div>
  );
}

export default ScreenMap;
