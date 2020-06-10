import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import { Row, Col, Layout, Card, Button, List} from 'antd';
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

  let buyingList = articleList.map((item, i) => {
    return (

      <List.Item key={i} style={{alignItems: 'flex-start'}}>
        <Card hoverable title={item.title} bodyStyle={{width: 400}}>

          <Card.Meta description={item.description} avatar={item.img}>
          </Card.Meta>

          <Card.Meta description={item.priceUnit + " €"}>

          </Card.Meta><Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary"><Link to={`/fabricant/${item._id}`}>Choisir cet article</Link></Button>
        </Card>
      </List.Item>

    )
  })

  return (

    <Layout className="layout" style={{height: 'auto', backgroundColor: 'white'}}>

      <Nav />

      <Content style={{ padding: '0 50px', margin: '40px 0'}} className="Map" > 
      <Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary">Chercher les fabricants autour de moi</Button>
        
        <div style={{ height: '60vh', width: '70%', marginTop: 30}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyA6lFML5Gv6tvWgNl0X7kXn6X1uMQyzX8o' }}
            defaultCenter={center}
            defaultZoom={zoom}

          />

        </div>


        <div style={{width: '100%', marginTop: 25}}>

          <h3 style={{fontWeight: 700, fontSize: 30}}>Liste des fabricants</h3>
          <Row > {buyingList}</Row>
         

        </div>

      </Content>
      <FooterComp/>
    </Layout>
  );
}

export default ScreenMap;
