import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';
import {connect} from 'react-redux'

import { Row, Form, Input, Button, Layout, Col, Checkbox, InputNumber, Modal } from 'antd';
import 'antd/dist/antd.css';

import Nav from './Nav'
import FooterComp from './Footer';
import { PropertySafetyFilled } from '@ant-design/icons';

const { Content } = Layout;


function ScreenMasks(props) {

    const [description, setDescription] = useState('')
    const [inputPrice, setInputPrice] = useState(1)
    const [inputStock, setInputStock] = useState(1)
    const [qualité, setQualité] = useState('')
    const [couleurs, setCouleurs] = useState([])
    const [matiere, setMatiere] = useState([])
    const [model, setModel] = useState([])
    const [inscription, setInscription] = useState([]);
    const [logo, setLogo] = useState([]);

    const [isVisible, setIsVisible] = useState(false)
    const [isCreated, setIsCreated] = useState(false);

    const[isLogin, setIsLogin]=useState(true);


    const { TextArea } = Input

    useEffect(() => {
        function loadUser(){
            if(props.user==null){
                setIsLogin(false)
            }
        }
        loadUser()
    }, [props.user])

    const onFinish = values => {
        setDescription(values.description);
        setInputPrice(values.priceUnit);
        setInputStock(values.stock);
        setQualité(values.quality);
        setCouleurs(values.colors);
        setMatiere(values.matiere);
        setModel(values.model);
        setInscription(values.inscription);
        setLogo(values.logo);
    
        handleNewOrder(values); 
    }

    // au click sur "Valider la création"
    let handleNewOrder = async (article) => {
        const articleData = JSON.stringify(article)

        let data = await fetch('/add-article/' + props.user.token, {
            method: 'POST',
            headers: {'Content-Type':'application/Json'},
            body: articleData
        });
        let response = await data.json();
        console.log(response);

        if(response.result){
            showModal();
        }
    }

    let showModal = () => {
       setIsVisible(true)
    };

    let  handleOk = () => {
        setIsCreated(true);
        setIsVisible(false)

    }

    if(isCreated){
        return (<Redirect to='/dashboard' />)
    } 

    if(!isLogin){
        return (<Redirect to='/' />)
    } 

   
    return (
        
        <Layout style={{minHeight: '100vh', height: 'auto', backgroundColor: 'white'}}className="layout">

            <Nav />

            <Content style={{ padding: '0 50px', margin: '40px 0'}} className="Mask-page" >

                <h1>Publier une offre de fabrication</h1>
        
                <h2>Paramètres de la fabrication</h2>
    
                <Form size='middle' style={{ width: '50%', textAlign: 'center', marginTop: 15}}
                    onFinish={onFinish}
                    initialValues={{
                        'stock': 1,
                        'priceUnit': 1,
                        'colors': ['bleu'],
                        'matiere': ['tissu'],
                        'model': ['anatomique'],
                        'inscription': [],
                        'logo': []
                    }}
                >


                    <p className='textMask'>Indiquez les types de masques que vous pouvez fabriquer.</p>
                    <Form.Item name="model" label="Modèle">
                        <Checkbox.Group style= {{textAlign: 'left'}}>
                            <Row> 
                                <Col span={8}> 
                                    <Checkbox
                                        value="Grand public"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Grand public
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Barrière"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Barrière
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Chrirugical"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Chrirugical
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="FFP1"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        FFP1
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="FFP2"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                    FFP2
                                </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="FFP3"
                                        style={{
                                        lineHeight: '32px',
                                        }}
                                    >
                                        FFP3
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>


                    <p className='textMask'>Indiquez le nombre de masques que vous pouvez réaliser.</p>

                    <Form.Item label="Quantité"
                            name="stock"
                    >

                        <InputNumber min={1}
                                    value={inputStock}
                                    onChange={setInputStock}
                        />

                    </Form.Item>

                    
                    <p className='textMask'>Indiquez le prix unitaire.</p>

                    <Form.Item label="Prix unitaire"
                            name="priceUnit"
                    >

                        <InputNumber min={1}
                                    max={2000}
                                    value={inputPrice}
                                    onChange={setInputPrice}
                        />

                    </Form.Item>
                  
                    <p className='textMask'>Indiquez les couleurs de masque que vous pouvez réaliser.</p>
                    <Form.Item name="colors" label="Couleurs disponibles">
                        <Checkbox.Group style= {{textAlign: 'left'}}>
                            <Row>
                                <Col span={8}>
                                    <Checkbox
                                        value="Blanc"
                                        style={{
                                         lineHeight: '32px',
                                        }}
                                    >
                                        Blanc
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Bleu"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Bleu
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Bleu-Ciel"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Bleu Ciel
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Gris"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Gris
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Gris-Fonce"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Gris Foncé
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Jaune"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Jaune
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Jaune-Clair"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Jaune Clair
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Noir"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Noir
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Orange"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Orange
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Rose"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Rose
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Rose-Clair"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Rose Clair
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Rouge"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Rouge
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Rouge-Fonce"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Rouge Foncé
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Saumon"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                       Saumon
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Vert"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                       Vert
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Vert-Fonce"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                       Vert Foncé
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Violet"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                       Violet
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    

                    <p className='textMask'>Indiquez les matières que vous possedez.</p>
                    <Form.Item name="matiere" label="Matières disponibles">
                        <Checkbox.Group style= {{textAlign: 'left'}}>
                            <Row>
                                <Col span={8}>
                                <Checkbox
                                    value="Coton"
                                    style={{
                                        ineHeight: '32px',
                                    }}
                                >
                                    Coton
                                </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Coton Bio"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Coton Bio
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Autre"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Autre
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Lin"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Lin
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Jean (upcycling)"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Jean (upcycling)
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Cuir (upcycling)"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Cuir (upcycling)
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox
                                        value="Autre matière organique/végétale"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Autre matière organique/végétale
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>


                    <Form.Item label="Qualité"
                            name="quality"
                    >
                        <Input onChange={e => setQualité(e.target.value)} value={qualité} placeholder='moyenne, supérieure ...' />
                    </Form.Item>

                    <p className='textMask'>Indiquez si vous pouvez mettre une inscription.</p>
                    <Form.Item name="inscription" label="Inscription">
                        <Checkbox.Group style= {{textAlign: 'left'}}>
                            <Row> 
                                <Col span={8}> 
                                    <Checkbox
                                        value="Flocage"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Flocage
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Brodure"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Brodure
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>

                    <p className='textMask'>Indiquez si vous pouvez mettre un logo.</p>
                    <Form.Item name="logo" label="Logo">
                        <Checkbox.Group style= {{textAlign: 'left'}}>
                            <Row> 
                                <Col span={8}> 
                                    <Checkbox
                                        value="Flocage"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Flocage
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Brodure"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Brodure
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                      
                    <p className='textMask'>Vous pouvez ajouter la description que vous souhaitez.</p>
                    <Form.Item label="Description"
                            name="description"
                    >
                        <TextArea rows={6} onChange={e => setDescription(e.target.value)} value={description} />
                    </Form.Item>
                   
                                  
                    <Button style= {{width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary" htmlType="submit" >   
                        Valider
                    </Button>
                </Form>


                <Modal title="Article mis en ligne !"
                    visible={isVisible}
                    onOk={handleOk}
                >
                    <h3>Récapitulatif</h3>
                    <p>Nombre de masques : {inputStock}</p>
                    <p>Prix d'un masque : {inputPrice}€</p>
                    <p>Couleurs disponibles : {couleurs.join(', ')}</p>
                    <p>Matières disponibles : {matiere.join(', ')}</p>
                    <p>Modèles disponibles : {model.join(', ')}</p>
                    <p>Types d'inscription : {inscription.join(', ')} </p>
                    <p>Types de logo : {logo.join(', ')} </p>
                    <p>Qualitée : {qualité}</p>

                </Modal>

            </Content>
            <FooterComp/>
        </Layout>
    )
}

function mapStateToProps(state) {
    return { user: state.user }
  }
  

  export default connect(
    mapStateToProps,
    null
   )(ScreenMasks);
  