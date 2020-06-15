import React from 'react';
import '../App.css';
import { Layout, Row, Col, Card } from 'antd';

import 'antd/dist/antd.css';
import Nav from './Nav';
import FooterComp from './Footer';

const { Content } = Layout;
const { Meta } = Card;

function ScreenHome() {


  return (
    <Layout style={{minHeight: '100vh', height: 'auto', backgroundColor: 'white'}}className="layout">

      <Nav />

      <Content style={{padding: '0 50px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0', textAlign: 'center', fontSize: 20}}>

        <h1 id="title">Masques personnalisables | Vos achats solidaires</h1>

        <h3 id="choix">Entreprises | Collectivités | Grand Public</h3>

        <Row style={{marginTop: 50}}> 

            <Col md={{span :8}} sm={{span: 20}}>
              <Card
                hoverable
                style={{
                  width: 350,
                  margin: '0 20px',
                  borderColor: 'white'
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque1.jpg'
                  />
                }
              >
                <Meta title="Culture et Evènementiel"/>
              </Card>
            </Col>

            <Col md={{span :8}} sm={{span: 20}}>
              <Card
                hoverable
                style={{
                  width: 350,
                  margin: '0 20px',
                  borderColor: 'white'
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque2.jpg'
                  />
                }
              >
                <Meta title="Vie quotidienne"/>
              </Card>
            </Col>

            <Col md={{span :8}} sm={{span: 20}}>
              <Card
                hoverable
                style={{
                  width: 350,
                  margin: '0 20px',
                  borderColor: 'white'
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque3.jpg'
                  />
                }
              >
                <Meta title="Logistique"/>
              </Card>
              
            </Col>
          </Row>
          <Row>

            <Col md={{span :8}} sm={{span: 20}}>
              <Card
                hoverable
                style={{
                  width: 350,
                  margin: '0 20px',
                  borderColor: 'white'
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque4.jpg'
                  />
                }
              >
               <Meta title="Commerce et Restauration"/>
              </Card>
            </Col>

            <Col md={{span :8}} sm={{span: 20}}>
              <Card
                hoverable
                style={{
                  width: 350,
                  margin: '0 20px',
                  borderColor: 'white'
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque5.jpg'
                  />
                }
              >
                <Meta title="Personnel de santé"/>
              </Card>
            </Col>

            <Col md={{span :8}} sm={{span: 20}}>
              <Card
                hoverable
                style={{
                  width: 350,
                  margin: '0 20px',
                  borderColor: 'white'
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque6.jpg'
                  />
                }
              >
                <Meta title="Transport en commun"/>
              </Card>
            </Col>
          </Row>

      </Content>
      <FooterComp/>
    </Layout>
  );
}

export default ScreenHome;
