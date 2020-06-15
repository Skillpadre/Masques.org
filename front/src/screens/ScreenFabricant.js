import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { connect } from 'react-redux'
import Nav from './Nav'
import FooterComp from './Footer';

import { Row, Col, Layout, Avatar, Form, Select, Input, InputNumber, Button } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Option } = Select;


function ScreenFabricant(props) {

    const [articleId, setArticleId] = useState('');
    const [colorsList, setColorsList] = useState([]);
    const [color, setColor] = useState('blanc');
    const [stock, setStock] = useState();
    const [description, setDescription] = useState('')

    const [material, SetMaterial] = useState('');
    const [matiereList, SetMatiereList] = useState([]);

    const [modele, setModele] = useState('');
    const [modelList, setModelList] = useState([]);

    const [quantity, setQuantity] = useState(0);

    const [inscription, setInscription] = useState('')

    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');

    const [colorInscription, setColorInscription] = useState('black')
    const [image, setImage] = useState('');
    
    useEffect(() => {
        var data = async () => {
            var rawResponse = await fetch(`/articleId/${props.match.params.id}`);
            var response = await rawResponse.json();
            setArticleId(response.article);
            // récuperation spécifique du tableau de couleur
            setColorsList(response.article.colors);
            setModelList(response.article.model);
            SetMatiereList(response.article.material);

            setDescription(response.article.description);
            setStock(response.article.stock)

            setUsername(response.seller.username);
            setAvatar(response.seller.avatar);
        }
        data();
    }, []);

    //Disposition form
    const layout = {
        labelCol: {
        span: 4,
        },
        wrapperCol: {
        span: 20,
        },
    };

    const onChangeColor = async (value) => {
        setColor(value)
    };

    const onChangeMatiere = async (value) => {
        SetMaterial(value)
    };

    const onChangeModel = async (value) => {
        setModele(value);
    };

    const onChangeColorInscription = async (value) => {
        setColorInscription(value)
    };
    console.log(colorInscription)
 
    // Envoie de l'odre au reducer
    let handleOrder = async (order) => {
        console.log(order)
        order.colors = color
        order.quantity = quantity
        order.material = material
        order.model = modele
        order.designText= inscription //HERE
        order.designImg = image //HERE
        order.urlImg= urlImg
        props.sendOrder(order)

        
        var panier=[];
       //je récupère ce qu'il y a dans le local storage panier et je push le nouveau produit
        panier=JSON.parse(localStorage.getItem('panier'));
        panier.push(order);
        localStorage.setItem('panier', JSON.stringify(panier)); //envoi 
        
    }

    //Téléchargement image/logo
    var fileSelectedHandler= event =>{
        console.log(event.target.files[0]);
        setImage(event.target.files[0])
    }

    const handleClickImage = async () =>{

        var data = new FormData();
        data.append('image', image);

        var rawResponse = await fetch('/add-image', {
            method: 'POST',
            body: data
        });

        var response = await rawResponse.json();
        console.log(response.url)
        setImage(response.url)
    }
    
    var urlImg=`/assets/masques/masque-${color}.png`;


    return (


        <Layout style={{ minHeight: '100vh', height: 'auto', backgroundColor: 'white' }} className="layout">

            <Nav />

            <Content style={{ padding: '0 50px', margin: '40px 0' }}>

                <Row justify='start'/* style={{display: 'flex', justify: 'start', marginTop: 25}} */>
                    {/* Profil fabricant */}
                    <Col offset={1} md={{ span: 2 }} sm={{ span: 3 }}>
                        <Avatar size={64} src={avatar} />
                    </Col>
                    <Col md={{ span: 10 }} sm={{ span: 16 }}>
                        <div style={{ marginLeft: 10 }}>

                            <h3 style={{ fontWeight: 700, fontSize: 25 }}>{username}</h3>
                            <p style={{ width: 400 }}>{description}</p>

                        </div>
                    </Col>
                </Row>

                {/* images +  choix masques */}
                <Row justify='center' align='start' >

                    <Col md={{span : 12}} sm={{span : 24}}>

                        <div className='masque' style={{backgroundImage: `url(${urlImg})`/* "url('http://localhost:3001/assets/masques/masque-noir.png')" */}}>
                            <p style={{ marginTop: 90, fontSize: 25, color: colorInscription, maxWidth: '270px'}}>{inscription}</p>
                            {image!== ''?<img style={{ width: 150, height: 100}} src={image} alt='image sur masque'/> :null}
                        </div>

                    </Col>
                    <Col md={{ span: 7 }} sm={{ span: 12 }}>

                        <Form {...layout} style={{ textAlign: 'center' }}>
                    
                    {/* Modele */}
                        <Form.Item name="model" label="Modèle" rules={[{ required: true }]}>
                                <Select
                                    onChange={onChangeModel}
                                    placeholder="Choisissez votre modèle"
                                    allowClear

                                >
                                    {/* Map sur le tableau de modèles  */}
                                    {
                                        modelList.map((model, i) => {
                                            return <Option key={i} value={model}>{model}</Option>
                                        })
                                    }

                                </Select>
                            </Form.Item>

                            {/* Couleur */}
                            <Form.Item name="Couleur" label="Couleur" rules={[{ required: true }]}>
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

                            {/* Matiere */}
                            <Form.Item name="matiere" label="Matière" rules={[{ required: true }]}>
                                <Select
                                    onChange={onChangeMatiere}
                                    placeholder="Choisissez votre matière"
                                    allowClear

                                >
                                    {/* Map sur le tableau de matière  */}
                                    {
                                        matiereList.map((material, i) => {
                                            return <Option key={i} value={material}>{material}</Option>
                                        })
                                    }

                                </Select>
                            </Form.Item>

                            

                             <Form.Item label="Inscription" name="Inscription"
                                rules={[{ required: false }]}
                            >
                                <Input.TextArea 
                                    placeholder='Entrez l’inscription souhaitée'
                                    value={inscription}
                                    onChange={e=>setInscription(e.target.value)} 
                                />
                            </Form.Item> 

                            <Form.Item label="Image" name="Image">
                                <Input type='file' accept="image/png, image/jpeg" onChange={fileSelectedHandler}/>
                                <Button style={{ borderRadius: 5, marginTop: 5 }} onClick={handleClickImage}>Télécharger</Button>
                            </Form.Item>

                            <Form.Item label="Quantité" name="Quantité"
                                rules={[{ required: true, message: 'Entrer la quantité de masque souhaitée' }]}
                            >
                                <InputNumber
                                    min={1}
                                    max={articleId.stock}
                                    placeholder={`Max. ${articleId.stock}`}
                                    style={{width: 100}}
                                    value={quantity}
                                    onChange={setQuantity}
                                    
                                />

                            </Form.Item>

                            <Form.Item label="Prix Unitaire" name="Prix">
                                <p>{articleId.priceUnit} €</p>
                            </Form.Item>

                            <Form.Item label="Total" name="Total">
                                <p>{articleId.priceUnit * quantity} €</p>
                            </Form.Item>

                            <p style={{color: '#92D050'}}>Une partie reversée à nos ONG partenaires!</p>
                            <Link to='/basket'><Button style={{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20 }} type="primary" onClick={() => handleOrder(articleId, quantity)} >Ajouter à votre panier solidaire !</Button></Link>
                            
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

function mapStateToProps(state){
    return { user: state.user}
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenFabricant);