import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

import {Row, Col, Layout, Divider} from 'antd';
import {FacebookFilled, TwitterSquareFilled, InstagramFilled} from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Footer } = Layout;

function FooterComp() {
  return (
    
    <Footer style={{background: '#1e272e', color: 'white', textAlign: 'center'}}>
        
          <Row justify='center' align='start' style={{marginTop: 10}}>

            <Col span={6}>
                <Link to='/contact'><p style={{color: 'white'}}>Nous contacter</p></Link>
            </Col>

            <Col span={6}>
                <Link to='/quisommesnous'><p style={{color: 'white'}}>Qui sommes nous ?</p></Link>
            </Col>
      
            <Col span={6} style={{color : 'white'}}>
                <p>Suivez nous !</p>
                <a href= '#' target="_blank" rel="noopener noreferrer" style={{color: '#92D050'}}><InstagramFilled style={{fontSize: 25, marginRight: 3}}/></a>
                <a href= 'https://www.facebook.com/Masquesorg-110068767322252/' target="_blank" rel="noopener noreferrer" style={{color: '#92D050'}}><FacebookFilled style={{fontSize: 25, marginRight: 3}}/></a>
                <a href='https://twitter.com/MasquesOrg' target="_blank" rel="noopener noreferrer" style={{color: '#92D050'}}><TwitterSquareFilled style={{fontSize: 25}}/></a>
            </Col>
          </Row>

          <Divider/>
        
        <Row style={{fontSize: 14, marginTop: 0, color : '#9fa1a5', flexDirection: 'column'}} justify='center'>
          <p>L'APP Masques<span style={{color: '#92D050'}}>.ORG</span> | Plateforme d'achats Responsables & Solidaires</p>
          <p>© 2020 Masques.org. Tous droits réservés.</p>
        </Row>
     
    </Footer>

  );
}

export default FooterComp;