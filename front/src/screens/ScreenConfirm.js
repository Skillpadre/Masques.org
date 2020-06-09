import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import Nav from './Nav'
import FooterComp from './Footer';

import { Layout, Button } from 'antd';
import {CheckCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Content } = Layout;


function LayoutDesign (){

    return(
            

    <Layout className="layout" style={{height: 'auto'}}>
        
        <Nav />
    
        <Content style={{ padding: '0 50px', margin: '40px 0' }}>
            {/* ----------------CONTENU---------------- */}
          
                
            <h3 style={{fontFamily: 'Oswald', fontWeight: 700, fontSize: 25, marginTop: 20}}> Merci Jacob Wilson !</h3>

            <div style={{textAlign : 'center', color : '#1E272E', fontSize: 20, marginTop: 80}}>


                <CheckCircleFilled style={{color: '#5CCF33', fontSize: 150}}/>
                <p style={{fontWeight : 700, margin: 30}}>Votre commande à bien été prise en compte !</p>
                <p>Merci pour votre confiance.</p>

                <Link to='/'><Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', margin: 20}} type="primary">Retour à l'accueil</Button></Link>

            </div>


        </Content>
        <FooterComp/>
    </Layout>

    )

    
}

export default LayoutDesign;
