import React from 'react';
import '../App.css';

import { Layout, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import Nav from './Nav';
import FooterComp from './Footer';

const { Header, Content } = Layout;

function ScreenAPropos() {


  return (
    <Layout style={{minHeight: '100vh', height: 'auto', backgroundColor: 'white'}}className="layout">

      <Nav />
      <Header className='headerAPropos' style={{backgroundImage: "url('https://images.pexels.com/photos/4127601/pexels-photo-4127601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')", height: 350, backgroundPosition: '35% 35%'}} />
      <Content style={{padding: '0 50px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0', textAlign: 'center', fontSize: 25}}>

        <h1 style={{fontWeight: 700, fontSize: 35, color: '#E23D70'}}>Bienvenu(e) dans l'APP de MASQUES.ORG</h1>
        <h3 style={{fontSize: 30}}>Plateforme de fabrication et distribution de masques</h3>
       
        <p>Responsables . Solidaires . Fashion</p>
        
      
      
        <Row style={{marginTop: 50}} align='middle'>
            <Col md={{span: 12}} sm={{span: 24}}>
                <img style={{width: '100%', height: 'auto', opacity: '80%'}} src='../assets/images/image2.jpeg' alt='eco-responsable'/>
            </Col>
            <Col md={{span: 12}} sm={{span: 24}}>
                <p style={{marginLeft: 20}}>En ce début 2020, l'histoire de Masques.org est directement liée au contexte de crise sanitaire et économique que traverse le monde. C'est pourquoi nous avons mis en place une plateforme liant Achat Responsable et Fabrication en privilégiant le 'local et les circuits courts.' </p>
            </Col>
        </Row>

        <Row style={{marginTop: 50}} align='middle'>
            <Col md={{span: 12}} sm={{span: 24}}>
                <p style={{marginLeft: 20}}>Vos achats sont solidaires. En effet, pour toute commande, nous faisons produire des masques, et les offrons aux personnes en situation de précarité. Nos partenaires ONG comme la Croix-Rouge, les dristribuerontauprès des publics concernés. </p>
            </Col>
            <Col md={{span: 12}} sm={{span: 24}}>
                <img style={{width: '100%', height: 'auto', opacity: '80%'}} src='../assets/images/image1.jpeg' alt='solidaire'/>
            </Col>
        </Row>

      </Content>
      <FooterComp/>
    </Layout>
  );
}

export default ScreenAPropos;
