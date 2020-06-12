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
                <Link to='/actualités'><p style={{color: 'white'}}>Actualité</p></Link>
            </Col>
      
            <Col span={6} style={{color : 'white'}}>
                <p>Suivez nous !</p>
                <a href= '#' target="_blank" style={{color: 'white'}}><InstagramFilled style={{fontSize: 25, marginRight: 3}}/></a>
                <a href= 'https://www.facebook.com/Masquesorg-110068767322252/' target="_blank" style={{color: 'white'}}><FacebookFilled style={{fontSize: 25, marginRight: 3}}/></a>
                <a href='https://twitter.com/MasquesOrg' target="_blank" style={{color: 'white'}}><TwitterSquareFilled style={{fontSize: 25}}/></a>
            </Col>
          </Row>

          <Divider/>
        
        <Row style={{fontSize: 12, marginTop: 0, color : '#9fa1a5'}} justify='center'>
        © 2020 Masques.org. Tous droits réservés.
        </Row>
     
    </Footer>

  );
}

export default FooterComp;