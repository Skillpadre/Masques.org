import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';
import { Row, Col, Layout, List, Avatar, Divider, Radio, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { connect } from 'react-redux'

import StripeCheckout from 'react-stripe-checkout';

import Nav from './Nav'
import FooterComp from './Footer';

const { Content } = Layout;


function ScreenBasket(props) {

    const [infoUsername, setInfoUsername] = useState();
    const [articleList, setArticleList] = useState([])

    var userToken;

    useEffect(() => {
        async function loadUser() {

            //Récupération du token dans localStorage
            userToken = localStorage.getItem('token', (err, value) => {
            })

            if (userToken) {

                const rawResponse = await fetch(`/users/loadinfo/${userToken}`);
                const response = await rawResponse.json();

                if (response.user) {
                    setInfoUsername(response.user.username)
                }

            } else {
                return <Redirect to='/' />
            }

        }
        loadUser();
    }, [userToken]);

useEffect(() => {
        async function articleList() {
            setArticleList(props.order)
            console.log(articleList)
        }
        articleList();
}, [articleList]);

   
let totalCommande = 0

let totalFinal = 0
for (let i = 0; i < articleList.length; i++) {
   totalCommande = articleList[i].priceUnit * articleList[i].quantity
   totalFinal += articleList[i].priceUnit * articleList[i].quantity
}


if (totalCommande == NaN) {
    totalCommande = 0
 }

console.log(totalFinal)
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
        console.log(indexItem)
        setArticleList(articleList.splice(indexItem, 1));
        console.log(index)
    }
  
    return (

        <Layout className="layout" style={{ height: 'auto', backgroundColor: 'white' }}>
            <Nav />

            <Content style={{ padding: '0 50px', margin: '40px 0' }} className="Basket-page">

                <Row>
                    <Col md={{ span: 11 }} sm={{ span: 24 }}>
                        <h2 style={{ fontWeight: 700, fontSize: 25 }}>Bienvenue {infoUsername} !</h2>
                    </Col>
                    <Col md={{ span: 13 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                        <h1 style={{ fontWeight: 700, fontSize: 40 }}>Panier</h1>
                    </Col>
                </Row>

                <Row style={{ marginTop: 40 }} align='middle'>
                    <Col md={{ span: 12 }} sm={{ span: 24 }}>
                        <h2>Produit(s) en attente</h2>
                        <div id="dashboard-box">

                            <List
                                style={{ margin: "10px 15px 0 10px" }}
                                dataSource={articleList}
                                renderItem={item => (
                                    <List.Item
                                        actions={[<a key="list-delete"><DeleteOutlined style={{ size: 24 }} onClick={() => deleteArticle(item)} /></a>]}
                                    >
                                        <List.Item.Meta

                                            title={item.title}
                                            description={"Description : " + item.description + ' ' + "Qualité choisie : " + item.quality + ' ' + "Couleur sélectionnée : " + item.colors + ' ' + "Quantité : " + item.quantity + ' ' + "Total de cette commande : " + (item.priceUnit * item.quantity) + ' €'}
                                        />
                                    </List.Item>
                                )}

                            />

                            <Divider />
                            <div id="total">
                                <p style={{ fontSize: 18, fontWeight: 700 }}>TOTAL : {totalFinal} €</p>
                            </div>

                        </div>
                        <Link to="/fabricant/:id"><Button>Continuer la commande chez ce fabricant </Button></Link>
                        <Link to="/map"><Button>Retourner à la liste des fabricants</Button></Link>
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
                                billingAddress
                                name="Masques.org"
                                description="Masques personnalisés"
                                /* image= '../images/logo.png'  */
                                locale="auto"
                                stripeKey="pk_test_coUidDoFWymEAbFlak3JlqPf00PqNkwObW"//TO DO --> Changer
                                token={props.token}
                                zipCode
                                label="Payer avec Stripe 💳"
                                panelLabel="Acheter pour {{amount}} €"
                            />

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

function mapDispatchToProps(dispatch) {
    return {
        delete: dispatch.userToken
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenBasket)

