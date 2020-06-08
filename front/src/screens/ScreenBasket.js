import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';

import { Row, Col, Card, Button, Layout, List, Avatar, Divider, Radio, Input } from 'antd';
import {CloseCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import {connect} from 'react-redux'

import StripeCheckout from 'react-stripe-checkout';

import Nav from './Nav'

const { Content, Footer } = Layout;


function ScreenBasket(props) {

    const [infoUsername, setInfoUsername] = useState();

    var userToken;

    useEffect(() => {
        async function loadUser() {

            //Récupération du token dans localStorage
            userToken = localStorage.getItem('token', (err, value) => {    
            })

            if(userToken){

                const rawResponse = await fetch(`/users/loadinfo/${userToken}`);
                const response = await rawResponse.json();
                    
                if(response.user){
                    setInfoUsername(response.user.username)
                }

            }else{
                return <Redirect to='/' />
            }
           
          

        }
        loadUser();
      }, [userToken]);

    

    const data = [
        {
            title: 'Modèle 1',
        },
        {
            title: 'Modèle 2',
        },
        {
            title: 'Modèle 3',
        },
        {
            title: 'Modèle 4',
        },
    ];

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const [radioValue, setRadioValue] = useState('')

    var onChange = e => {
        console.log('radio checked', e.target.value);
        setRadioValue(e.target.value);
    };



    return (

        <Layout className="layout" style={{height: 'auto', backgroundColor: 'white'}}>
            <Nav />

            <Content style={{ padding: '0 50px', marginTop: 20}} className="Basket-page">
                
                <Row>
                    <Col md={{span: 11}} sm={{span: 24}}>
                        <h2 style={{fontWeight: 700, fontSize: 25}}>Bienvenue {infoUsername} !</h2>
                    </Col>
                    <Col md={{span: 13}} sm={{span: 12}} xs={{span: 24}}> 
                        <h1 style={{fontWeight: 700, fontSize: 40}}>Panier</h1>
                    </Col>
                </Row>

                <Row style={{marginTop: 40}} align='middle'>
                    <Col md={{span: 12}} sm={{span: 24}}>
                        <h2>Produits en attente</h2>
                        <div id="dashboard-box">

                            <List
                                style={{margin: "0 20px"}}
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="Masque personnalisé de couleur noir avec logo et inscription"
                                            
                                            
                                        />
                                        <CloseCircleOutlined/>
                                    </List.Item>
                                )}
                            />
                            <Divider />
                            <div id="total">
                                <p style={{fontSize: 18, fontWeight: 700}}>TOTAL : 1000€</p>
                            </div>

                        </div>
                    </Col>

                    <Col md={{span: 12}} sm={{span: 24}}>

                        <div id="retrait">
                            <h2>Moyen de retrait</h2>
                            <Radio.Group onChange={onChange} value={radioValue}>
                                <Radio style={radioStyle} value={'Retrait'}>
                                    Retrait
        </Radio>
                                <Radio style={radioStyle} value={'Livraison'}>
                                    Livraison
        </Radio>
                            </Radio.Group>
                            <h2>Procéder au paiement</h2>
                        
                            {/* Stripe */}
                            <StripeCheckout
                                amount="500" //TO DO --> Dynamiser
                                billingAddress
                                name="Masques.org"
                                description="Masques personnalisés"
                                /* image= '../images/logo.png'  */
                                locale="auto"
                                stripeKey="pk_test_coUidDoFWymEAbFlak3JlqPf00PqNkwObW"//TO DO --> Changer
                                token={props.token}
                                zipCode
                                label="Payer avec Stripe 💳"
                                panelLabel="Acheter pour {{amount}}"
                            />
                                                
                        </div>
                    </Col>
                </Row>



            </Content>
        
            <Footer style={{ textAlign: 'center'}}>© 2020 Masques.org. Tous droits réservés.</Footer>
           
        </Layout>
    );
}


function mapStateToProps(state){
    return { token: state.userToken}
}


export default connect(mapStateToProps, null)(ScreenBasket)

