import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { connect } from 'react-redux'
import Nav from './Nav'
import FooterComp from './Footer';

import { Row, Col, Layout, Avatar, Card, Form, Select, Input, InputNumber, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Option } = Select;


function ScreenFabricant(props) {

    const [articleId, setArticleId] = useState('');
    const [colorsList, setColorsList] = useState([]);
    const [color, setColor] = useState('noir');
    const [stock, setStock] = useState();
    const [description, setDescription] = useState('')

    const [quantity, setQuantity] = useState(0);

    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');


    useEffect(() => {
        var data = async () => {
            var rawResponse = await fetch(`/articleId/${props.match.params.id}`);
            var response = await rawResponse.json();
            setArticleId(response.article);
            // récuperation spécifique du tableau de couleur
            setColorsList(response.article.colors);
            setDescription(response.article.description);
            setStock(response.article.stock)

            setUsername(response.seller.username);
            setAvatar(response.seller.avatar);
        }
        data();
    }, []);


    const onChangeColor = async (value) => {
        setColor(value)
    };
    console.log(color)

    // Envoie de l'odre au reducer
    let handleOrder = async (order) => {
        order.colors = color
        order.quantity = quantity
        props.sendOrder(order)
        console.log(order)
    }

    return (


        <Layout style={{ height: 'auto', backgroundColor: 'white' }} className="layout">

            <Nav />

            <Content style={{ padding: '0 50px', margin: '40px 0' }}>

                <Row justify='start'/* style={{display: 'flex', justify: 'start', marginTop: 25}} */>
                    {/* Profil fabricant */}
                    <Col offset={1} md={{ span: 2 }} sm={{ span: 3 }}>
                        <Avatar size={64} icon={<UserOutlined />} />
                    </Col>
                    <Col md={{ span: 10 }} sm={{ span: 16 }}>
                        <div style={{ marginLeft: 10 }}>

                            <h3 style={{ fontWeight: 700, fontSize: 25 }}>{username}</h3>
                            <p style={{ width: 400 }}>{description}</p>

                        </div>
                    </Col>
                </Row>

                {/* images +  choix masques */}
                <Row justify='center' align='middle'/* style={{marginTop: 30, display : 'flex', justify:'space-around'}} */>

                    <Col md={{span : 12}} sm={{span : 24}}>
                        <Card style={{width: '70%'}}
                            cover={<img alt="masque" src={`../assets/masques/masque-${color}.png`} />}
                        >
                        </Card>


                    </Col>
                    <Col md={{ span: 7 }} sm={{ span: 14 }}>

                        <Form style={{ textAlign: 'center' }}>
                            <Form.Item><p style={{ fontSize: 20 }}>{articleId.description}</p></Form.Item>

                            <Form.Item style={{ width: 400 }} name="Couleur" label="Couleur" rules={[{ required: true }]}>
                                <Select
                                    onChange={onChangeColor}
                                    placeholder="Choisissez votre couleur"
                                    allowClear

                                >
                                    {/* Map sur le tableau de couleur  */}
                                    {
                                        colorsList.map((color, i) => {
                                            return <Option key={i} value={color}>{color}</Option>
                                        })
                                    }

                                </Select>
                            </Form.Item>

                            

                            {/* <Form.Item label="Personnalisation" name="Personnalisation"
                                rules={[{ required: false }]}
                            >
                                <Input.TextArea placeholder='Entrez l’inscription souhaitée' />
                            </Form.Item> */}

                            <Form.Item label="Quantité" name="Quantité"
                                rules={[{ required: true, message: 'Entrer la quantité de masque souhaitée' }]}
                            >
                                <InputNumber min={1}
                                    max={articleId.stock}
                                    placeholder='Entrez la quantité souhaitée'
                                    style={{ margin: '0 16px' }}
                                    value={quantity}
                                    onChange={setQuantity}
                                />

                            </Form.Item>

                            <Form.Item label="Prix Unitaire" name="Prix">
                                <p>{articleId.priceUnit} € (c'est cher hein ?)</p>
                            </Form.Item>

                            <Link to='/basket'><Button style={{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20 }} type="primary" onClick={() => handleOrder(articleId, quantity)} >Ajouter au panier</Button></Link>

                        </Form>

                    </Col>

                </Row>
            </Content>
            <FooterComp />
        </Layout>

    )


}

function mapDispatchToProps(dispatch) {
    return {
        sendOrder: function (order) {
            dispatch({ type: 'addBasket', userOrder: order })

        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(ScreenFabricant);