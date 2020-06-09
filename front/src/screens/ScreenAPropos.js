import React from 'react';
import '../App.css';

import { Layout, Form, Input, Row, Col } from 'antd';
import { FacebookFilled, TwitterSquareFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Nav from './Nav';
import FooterComp from './Footer';

const { Header, Content } = Layout;

function ScreenAPropos() {


  return (
    <Layout style={{height: 'auto', backgroundColor: 'white'}}className="layout">

      <Nav />
      <Header className='headerAPropos' style={{backgroundImage: "url('https://images.pexels.com/photos/3985187/pexels-photo-3985187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')", height: 350, backgroundPosition: '75% 35%'}} />
      <Content style={{padding: '0 50px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0', textAlign: 'center', fontSize: 25}}>

        <h1 style={{fontWeight: 700, fontSize: 35, color: '#E23D70'}}>Masques.org</h1>
        <h3 style={{fontSize: 30}}>Plate-forme de fabrication et distribution de masques</h3>
       
        <p>Responsables . Solidaires . Fashion</p>
        
      
      
        <Row style={{marginTop: 50}} align='middle'>
            <Col md={{span: 12}} sm={{span: 24}}>
                <img style={{width: '100%', height: 'auto'}} src='../assets/images/image2.jpeg'/>
            </Col>
            <Col md={{span: 12}} sm={{span: 24}}>
                <p style={{marginLeft: 20}}>En ce début 2020, l'histoire de masques.org est directement liée au contexte de crise sanitaire et économique que traverse le monde. C'est pourquoi nous avons mis en place une plateforme liant Fabrication et Distribition tout en privilégiant le 'local' </p>
            </Col>
        </Row>

        <Row style={{marginTop: 50}} align='middle'>
            <Col md={{span: 12}} sm={{span: 24}}>
                <p style={{marginLeft: 20}}>Nous avons aussi un partenariat avec la croix rouge. Pour tout masque acheté, 1€ est collecté afin d'offrir des masques aux personnes dans le besoin. </p>
            </Col>
            <Col md={{span: 12}} sm={{span: 24}}>
                <img style={{width: '100%', height: 'auto'}} src='../assets/images/image1.jpeg'/>
            </Col>
        </Row>

      </Content>
      <FooterComp/>
    </Layout>
  );
}

export default ScreenAPropos;
