import React from 'react';
import '../App.css';

import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Nav from './Nav';
import FooterComp from './Footer';

const { Header, Content } = Layout;

function ScreenActualité() {


  return (
    <Layout style={{minHeight: '100vh', height: 'auto', backgroundColor: 'white'}}className="layout">

      <Nav />
      <Header style={{backgroundImage: "url('https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_1280.jpg')",backgroundSize: 'cover',  height: 350, backgroundPosition: '0 55%'}} />
      <Content style={{padding: '0 50px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0', textAlign: 'center', fontSize: 25}}>

        <h1 style={{fontWeight: 700, fontSize: 35}}>Actualités</h1>
       
        <p>Fête de la musique</p>
        <p>Ne manquez pas cet évènement organisé le 21 juin!</p>
        
      
      
        <h3 style={{fontWeight: 700, fontSize: 20, marginTop: 40}}>Pour plus d'actualités, suivez nous sur les réseaux sociaux !</h3>
          
        <div style={{margin: 20}}>
          <a href= '#' target="_blank" rel="noopener noreferrer"><img src= './assets/icones/instagram.png' alt='instagram' style={{width: 45, height: 'auto', margin: '0 3px'}}/></a>
          <a href= 'https://www.facebook.com/Masquesorg-110068767322252/' target="_blank" rel="noopener noreferrer"><img src='./assets/icones/facebook.png' alt='facebook' style={{width: 45, height: 'auto', margin: '0 3px'}}/></a>
          <a href='https://twitter.com/MasquesOrg' target="_blank" rel="noopener noreferrer"><img src='./assets/icones/twitter.png' alt='twitter' style={{width: 45, height: 'auto', margin: '0 3px'}}/></a>
        </div>

      </Content>
      <FooterComp/>
    </Layout>
  );
}

export default ScreenActualité;
