import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';

import Nav from './Nav'
import FooterComp from './Footer';

import { Layout, Button, List, Row, Col, Table, Tag, Space} from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Content } = Layout;


function LayoutDesign (){

    const [infoUsername, setInfoUsername] = useState();

    //Tableau Récapitulatif
    const columns = [
        {
          title: 'Description',
          dataIndex: 'Description',
          key: 'Description',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Couleur',
          dataIndex: 'Couleur',
          key: 'Couleur',
        },
        {
          title: 'Qualité',
          dataIndex: 'Qualité',
          key: 'Qualité',
        },
        {
          title: 'Quantité',
          dataIndex: 'Quantité',
          key: 'Quantité',
        
        },
        {
            title: 'Total',
            dataIndex: 'Total',
            key: 'Total',
          
          }
       
      ];
      

    var user;
    useEffect(() => {
        async function loadUser() {
    
           //Récupération du token dans localStorage
            user = JSON.parse(localStorage.getItem('user', (err, value) => {    
          }))
    
          if(user){
    
            const rawResponse = await fetch(`/users/loadinfo/${user.token}`);
            const response = await rawResponse.json();
    
            console.log(response.user)
    
            if (response.user){ 
    
              setInfoUsername(response.user.username)
    
            }
    
          }else{
            return <Redirect to='/' />
          }
        }
        loadUser();
      }, [user]);

    return(
            

    <Layout className="layout" style={{height: 'auto', backgroundColor: 'white'}}>
        
        <Nav />
    
        <Content style={{ padding: '0 50px', margin: '40px 0'}}>
            {/* ----------------CONTENU---------------- */}
          
                
            <h3 style={{fontFamily: 'Oswald', fontWeight: 700, fontSize: 25}}> Merci {infoUsername} !</h3>

            <div style={{display: 'flex', flexDirection: 'column', alignItems : 'center', color : '#1E272E', fontSize: 20, marginTop: 40}}>


                <CheckCircleFilled style={{color: '#5CCF33', fontSize: 100}}/>
                <p style={{fontWeight : 700, margin: '10px 30px 50px'}}>Votre commande à bien été prise en compte !</p>
                
                <p>Récapitulatif</p>
                <Table bordered columns={columns} style={{margin: '20px 0 20px', width: '70%'}}/>
                <p>Merci pour votre confiance.</p>

                <Link to='/'><Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', margin: 20}} type="primary">Retour à l'accueil</Button></Link>

            </div>


        </Content>
        <FooterComp/>
    </Layout>

    )

    
}

export default LayoutDesign;
