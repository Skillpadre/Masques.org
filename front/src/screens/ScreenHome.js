import React from 'react';
import '../App.css';
import { Layout, Row, Col, Card } from 'antd';
import 'antd/dist/antd.css';
import Nav from './Nav'

const { Content, Footer } = Layout;

function ScreenHome() {


  return (
    <Layout style={{height: 'auto', backgroundColor: 'white'}}className="layout">

      <Nav />

      <Content style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20}}>

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
      <Footer style={{ textAlign: 'center'}}>© 2020 Masques.org. Tous droits réservés.</Footer>
    </Layout>
  );
}

export default ScreenHome;
