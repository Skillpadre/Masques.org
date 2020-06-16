import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Row, Col, Layout, List, Divider, Radio, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js';

import Nav from './Nav'
import FooterComp from './Footer';

const stripePromise = loadStripe('pk_test_T60y6sAVREOC6Dq9Cixjjx6I00TSGd4n7j');
const { Content } = Layout;


function ScreenBasket(props) {

    const [infoUsername, setInfoUsername] = useState();
    const [articleList, setArticleList] = useState([])
    const [userToken, setUserToken] = useState('')

    const [livraison, setLivraison] = useState('Retrait')
 

    //Récupération du panier dans localStorage
    var userPanier = JSON.parse(localStorage.getItem('panier'));

    useEffect(() => {
        function readArticleList() {
            
            setArticleList(userPanier)

        }
        readArticleList();
    }, []);
   


     let idCommande;
     if(props.order.length !== 0){
        idCommande = props.order[0]._id
    }
    
    let totalCommande = 0
    let totalFinal = 0
    let totalQuantity = 0
    for (let i = 0; i < articleList.length; i++) {
        totalCommande = articleList[i].priceUnit * articleList[i].quantity
        totalFinal += (articleList[i].priceUnit * articleList[i].quantity)
        totalQuantity += articleList[i].quantity
    }
   
    if (totalCommande == NaN) {
        totalCommande = 0
    }
   
    const radioStyle = {
        display: 'flex',
        margin: 10
    };


    var onChange = e => {
        setLivraison(e.target.value);
        console.log(e.target.value)
    };
    
    //supression article panier
    var deleteArticle = index => {
        var indexItem = articleList.indexOf(index);
        var panier=articleList; //je récupère les produits
        panier.splice(indexItem,1); //je supprime celui choisi
       
        localStorage.setItem("panier", JSON.stringify(panier)); //je renvoi le nouveau tableau dans le local storage
        userPanier= JSON.parse(localStorage.getItem('panier'));
        setArticleList(userPanier)
       
    }

    const handleClick = async (event) => {
        const rawResponse = await fetch(`/new-basket?id=${idCommande}&price=${totalFinal}`);
        const response = await rawResponse.json();
        const priceId = response.price.id
        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                // Replace with the ID of your price
                { price: priceId, quantity: 1 }
            ],
            mode: 'payment',
            successUrl: `http://localhost:3001/confirm`,
            cancelUrl: 'http://localhost:3001/basket',
        })
            .then(async function (result) {
                console.log(result.error.message)
            });
    };

    const majStock = async () => {

        const rawResponse = await fetch(`/valid-order?id=${idCommande}&quantity=${totalQuantity}`);
        const response = await rawResponse.json();
        console.log(response)

    };
// Route pour add panier en sous doc
    const addOrder = async (orders, quantity, total) => {

        const body = {orders : orders, quantity : quantity, total : total, livraison : livraison}
        const bodyString = JSON.stringify(body)
        
        let data = await fetch('/add-order/' + props.token, {
            method: 'POST',
            headers: {'Content-Type':'application/Json'},
            body: bodyString
        });
        let response = await data.json();
        localStorage.setItem("panier", JSON.stringify([])); //je renvoi le panier vide dans le local storage
    }

    const confirmBasket = async (orders, quantity, total) => {
        props.sendOrder(orders, quantity, total)
    }


    return (

        <Layout className="layout" style={{ minHeight: '100vh', height: 'auto', backgroundColor: 'white' }}>
            <Nav />

            <Content style={{ padding: '0 50px', margin: '40px 0' }} className="Basket-page">

                <Row justify='center'>

                    <h1 style={{ fontWeight: 700, fontSize: 40 }}>Panier</h1>

                </Row>

                <Row style={{ marginTop: 40, textAlign: 'center' }} justify='center' align= 'top'>
                    <Col md={{ span: 14 }} sm={{ span: 24 }}>
                        <h2>Produit(s) en attente</h2>
                        <div id="dashboard-box">
                            
                            <List bordered
                                locale={{emptyText : 'Votre panier est vide.'}}
                                style={{ margin: "10px 15px 0 10px"}}
                                dataSource={articleList}
                                renderItem={item => (
                                    <List.Item
                                        actions={[<a key="list-delete"><CloseCircleOutlined style={{ size: 25, color: '#E23D70' }} onClick={() => deleteArticle(item)} /></a>]}
                                    >
                                    
                                        <List.Item.Meta
                                            title={"Modèle : "}
                                            description={item.model}

                                        />

                                        <List.Item.Meta
                                            title={"Couleur : "}
                                            description={item.colors}
                                        />

                                        <List.Item.Meta
                                            title={"Matière : "}
                                            description={item.material}
                                        />

                                        <List.Item.Meta
                                        title={"Qualité : "}
                                            description={item.quality}
                                        />
                                        <List.Item.Meta
                                        title={"Quantité : "}
                                            description={item.quantity}
                                        />

                                        <List.Item.Meta
                                            style={{ fontWeight: 600 }}
                                            title={"Prix : "}
                                            description={(item.priceUnit * item.quantity) + ' €'}
                                        />

                                    </List.Item>
                                )}

                            />
                            

                            <Divider />
                            <div id="total">
                                <p style={{ fontSize: 18, fontWeight: 700 }}>TOTAL : {totalFinal} €</p>
                            </div>

                        </div>

                        { props.order.length !== 0? <Link to={`/fabricant/${idCommande}`}><Button style={{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', margin: '20px 10px' }} type="primary">Continuer la commande chez ce fabricant </Button></Link>: null}
                        <Link to="/map"><Button style={{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', margin: '20px 10px' }} type="primary">Retourner à la liste des fabricants</Button></Link>
                    </Col>

                    <Col md={{ span: 9 }} sm={{ span: 24 }}>

                        <div id="retrait">
                            <h2>Moyen de retrait</h2>
                            <Radio.Group onChange={onChange} value={livraison}>
                                <Radio style={radioStyle} value={'Retrait'}>
                                    Retrait
                                 </Radio>
                                <Radio style={radioStyle} value={'Livraison'}>
                                    Livraison
                             </Radio>
                            </Radio.Group>
                            <h2>Procéder au paiement</h2>

                                                      {/* <button role="link" onClick={() => {handleClick();majStock()}}>
                                Checkout
                                </button> */}
                            <Button role="link" onClick={() => {handleClick();majStock();addOrder(articleList, totalQuantity, totalFinal, livraison); confirmBasket(articleList, totalQuantity, totalFinal)}} type='primary' style={{marginTop:20, width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black'}}>
                                Paiement
                            </Button>

                         <Link to="/confirm"><Button role="link" onClick={() => {confirmBasket(articleList, totalQuantity, totalFinal)}} type='primary' style={{marginTop:20, width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black'}}>
                                Test
                            </Button></Link>   


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
        token: state.user.token,
        order: state.basket
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendQuantity: function (quantity) {
            dispatch({ type: 'sendQuantity', userQuantity: quantity })
        } ,
        
        sendOrder:function(orders, quantity, total) {
            var order = {
                orders: orders,
                quantity: quantity,
                total: total
            }
            dispatch({type: "addConfirm", newOrder: order})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenBasket)

