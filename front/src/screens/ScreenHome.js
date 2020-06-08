import React, {useState, useEffect} from 'react';
import '../App.css';
import { Layout, Row, Col, Card } from 'antd';

import 'antd/dist/antd.css';
import Nav from './Nav';
import FooterComp from './Footer';

const { Content, Footer } = Layout;

function ScreenHome() {


  return (
    <Layout style={{height: 'auto', backgroundColor: 'white'}}className="layout">

      <Nav />

      <Content style={{padding: '0 50px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0'}}>

        <h1 id="title">Masques personnalisés</h1>

        <h3 id="choix">Entreprises | Collectivités | Grand Public</h3>

        <Row style={{marginTop: 50}}> 

            <Col md={{span :8}} sm={{span: 12}}>
              <Card
                hoverable
                style={{
                  width: 400,
                  margin: '25px',
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque1.jpg'
                  />
                }
              >
              </Card>
            </Col>

            <Col md={{span :8}} sm={{span: 12}}>
              <Card
                hoverable
                style={{
                  width: 400,
                  margin: '25px',
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque2.jpg'
                  />
                }
              >
                
              </Card>
            </Col>

            <Col md={{span :8}} sm={{span: 12}}>
              <Card
                hoverable
                style={{
                  width: 400,
                  margin: '25px'
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque3.jpg'
                  />
                }
              >
              </Card>
              
            </Col>

            <Col md={{span :8}} sm={{span: 12}}>
              <Card
                hoverable
                style={{
                  width: 400,
                  margin: '25px',
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque4.jpg'
                  />
                }
              >
               
              </Card>
            </Col>

            <Col md={{span :8}} sm={{span: 12}}>
              <Card
                hoverable
                style={{
                  width: 400,
                  margin: '25px',
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque5.jpg'
                  />
                }
              >
              
              </Card>
            </Col>

            <Col md={{span :8}} sm={{span: 12}}>
              <Card
                hoverable
                style={{
                  width: 400,
                  margin: '25px',
                }}
                cover={
                  <img
                    alt="article"
                    src='../assets/images/masque6.jpg'
                  />
                }
              >
               
              </Card>
            </Col>
          </Row>

      </Content>
      <FooterComp/>
    </Layout>
  );
}

export default ScreenHome;
