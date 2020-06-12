import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';
import { Row, Col, Layout, List, Avatar, Divider, Radio, Button } from 'antd';
import { DeleteOutlined, SmileOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout';

import Nav from './Nav'
import FooterComp from './Footer';
const stripePromise = loadStripe('pk_test_T60y6sAVREOC6Dq9Cixjjx6I00TSGd4n7j');
const { Content } = Layout;


function ScreenBasket(props) {

    const [infoUsername, setInfoUsername] = useState();
    const [articleList, setArticleList] = useState([])
  
    
    //Récupération du token dans localStorage
    var userPanier = localStorage.getItem('panier', (err, value) => {})

    useEffect(() => {
        function articleList() {
            setArticleList([(userPanier)])
        }
        articleList();
    }, []);




    useEffect(() => {
        async function articleList() {
            setArticleList(props.order)
        }
        articleList();
    }, [articleList]);

    let idCommande;
    if(props.order.length !== 0){
        idCommande = props.order[0]._id
    }
    
    let totalCommande = 0

    let totalFinal = 0
    for (let i = 0; i <articleList.length; i++) {
        totalCommande = articleList[i].priceUnit * articleList[i].quantity
        totalFinal += (articleList[i].priceUnit * articleList[i].quantity) * 100
    }

    if (totalCommande == NaN) {
        totalCommande = 0
    }

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


    var deleteArticle = index => {
        var indexItem = articleList.indexOf(index)
        setArticleList(articleList.splice(indexItem, 1));
        localStorage.removeItem("article")
    }

    const handleClick = async (event) => {
        const rawResponse = await fetch(`/new-basket?price=${totalFinal}`);;
        const response = await rawResponse.json();
            console.log(response.price.id)
        const priceId = response.price.id 
        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
            // Replace with the ID of your price
            {price: priceId, quantity: 1}
            ],
            mode: 'payment',
            successUrl: 'http://localhost:3001/confirm',
            cancelUrl: 'http://localhost:3001/basket',
        }
        );
        
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
          
    };
    

  
    return (

        <Layout className="layout" style={{ height: 'auto', backgroundColor: 'white' }}>
            <Nav />

            <Content style={{ padding: '0 50px', margin: '40px 0' }} className="Basket-page">

                <Row justify='center'>

                    <h1 style={{ fontWeight: 700, fontSize: 40 }}>Panier</h1>

                </Row>

                <Row style={{ marginTop: 40, textAlign: 'center' }} justify='center' align='middle'>
                    <Col md={{ span: 12 }} sm={{ span: 24 }}>
                        <h2>Produit(s) en attente</h2>
                        <div id="dashboard-box">
                            
                            <List 
                                locale={{emptyText : 'Votre panier est vide.'}}
                                style={{ margin: "10px 15px 0 10px" }}
                                dataSource={articleList}
                                renderItem={item => (
                                    <List.Item
                                        actions={[<a key="list-delete"><DeleteOutlined style={{ size: 25, color: '#E23D70' }} onClick={() => deleteArticle(item)} /></a>]}
                                    >
                                        {/* <List.Item.Meta

                                            title={item.title}
                                        
                                            /> */}
                                        <List.Item.Meta
                                            description={"Description : " + item.description}

                                        />

                                        <List.Item.Meta
                                            description={"Couleur sélectionnée : " + item.colors}
                                        />

                                        <List.Item.Meta
                                            description={"Qualité choisie : " + item.quality}
                                        />
                                        <List.Item.Meta
                                            description={"Quantité : " + item.quantity}
                                        />

                                        <List.Item.Meta
                                            style={{ fontWeight: 600 }}
                                            description={"Total de cette commande : " + (item.priceUnit * item.quantity) + ' €'}
                                        />

                                    </List.Item>
                                )}

                            />
                            

                            <Divider />
                            <div id="total">
                                <p style={{ fontSize: 18, fontWeight: 700 }}>TOTAL : {totalFinal} €</p>
                            </div>

                        </div>

                        <Link to={`/fabricant/${idCommande}`}><Button style={{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', margin: '20px 10px' }} type="primary">Continuer la commande chez ce fabricant </Button></Link>
                        <Link to="/map"><Button style={{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', margin: '20px 10px' }} type="primary">Retourner à la liste des fabricants</Button></Link>
                    </Col>

                    <Col md={{ span: 12 }} sm={{ span: 24 }}>

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
                                amount={totalFinal * 100} //TO DO --> Dynamiser
                                currency='EUR'
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



    <button role="link" onClick={handleClick}>
      Checkout
    </button>


                        </div>
                    </Col>
                </Row>
            </Content>

            <FooterComp />
        </Layout>
    );
    
}

function mapStateToProps(state) {
    return {
        token: state.userToken,
        order: state.basketList
    }
}
export default connect(mapStateToProps, null)(ScreenBasket)

