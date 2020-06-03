import React, { useState } from 'react';
import '../App.css';
import { Row, Col, Card, Button, Layout, List, Avatar, Divider, Radio, Input } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Nav from './Nav'


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

        <div>
            <Nav />

            <div className="Dashboard-page">
                <Row>
                    <Col span={8}>
                        <h1>Dashboard</h1>
                    </Col>
                    <Col span={6}>
                        <h2>Bienvenue John !</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
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
                    <Col span={10}>

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
                            <Button>Paiement</Button>
                        </div>
                    </Col>
                </Row>



            </div>
        </div>
    );
}

export default ScreenBasket;
