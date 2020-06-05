import React, { useState } from 'react';
import '../App.css';
import { Row, Col, Card, Button, Layout, List, Avatar, Divider, Radio, Input } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Nav from './Nav'

const { Content, Footer } = Layout;


function ScreenBasket() {

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
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

    console.log(radioValue)

    return (

        <Layout className="layout" style={{height: 'auto', backgroundColor: 'white'}}>
            <Nav />

            <Content style={{ padding: '0 50px', marginTop: 20}} className="Basket-page">
                
                <Row>
                    <Col md={{span: 11}} sm={{span: 24}}>
                        <h2 style={{fontWeight: 700, fontSize: 25}}>Bienvenue John !</h2>
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
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                        />
                                    </List.Item>
                                )}
                            />
                            <Divider />
                            <div id="total">
                                <p >TOTAL : 1000€</p>
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
                            <Button style={{marginTop:20, width: 100, borderRadius: 5, boxShadow: '0px 3px 3px 0px black'}} type='primary'>Paiement</Button>
                        </div>
                    </Col>
                </Row>



            </Content>
            <Footer style={{ textAlign: 'center'}}>© 2020 Masques.org. Tous droits réservés.</Footer>
        </Layout>
    );
}

export default ScreenBasket;
