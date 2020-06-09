import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import { Form, Input, Button, Layout, Slider, InputNumber, Modal } from 'antd';
import 'antd/dist/antd.css';

import Nav from './Nav'
import FooterComp from './Footer';

const { Content } = Layout;


function ScreenMasks() {

    const [modèle, setModèle] = useState('')
    const [description, setDescription] = useState('')
    const [inputPrice, setInputPrice] = useState(1)
    const [inputStock, setInputStock] = useState(1)
    const [couleur, setCouleur] = useState('')
    const [image, setImage] = useState('')
    const [qualité, setQualité] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const { TextArea } = Input

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };
    // Cale le prix sur la position du Slider
    let onChangePrice = (value) => {
        setInputPrice(value)
    };


    // Cale le stock sur la position du slider
    let onChangeStock = (value) => {
        setInputStock(value)
    };

    console.log(inputStock)
    // au click sur "Valider la création"
    let handleNewOrder = async () => {
        let data = await fetch('/articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `modèle=${modèle}&description=${description}&price=${inputPrice}&stock=${inputStock}&couleur=${couleur}&image=${image}&qualité=${qualité}`
        });
        let response = await data.json();
        setModèle('')
    }

    // Fonction pour clear les fields après validation - Work in progress

    let clearFields = (e) => {
         setModèle('');
        setDescription('');
          setInputPrice(1);
          setInputStock(1);
             setCouleur('');
             setImage('');
             setQualité('')
     }

 let   showModal = () => {
       setIsVisible(true)
      };

    let  handleOk = () => {
             setIsVisible(false)
        }


    return (
        
        <Layout style={{height: 'auto', backgroundColor: 'white'}}className="layout">

            <Nav />

            <Content style={{ padding: '0 50px', margin: '40px 0'}} className="Mask-page" >

                <h1>Création de masques</h1>
        
                <h2>Paramètres de la création</h2>
    
                <Form size='middle' style={{ width: '50%', textAlign: 'center'}}>
                  
                    <Form.Item label="Modèle"
                            name="modèle"
                    >
                        <Input onChange={e => setModèle(e.target.value)} value={modèle} />
                    </Form.Item>
                      
                <Form.Item label="Description"
                        name="description"
                >
                    <TextArea rows={6} onChange={e => setDescription(e.target.value)} value={description} />
                </Form.Item>
                   
                    <Form.Item label="Prix"
                            name="value"
                    >

                        <Slider min={1}
                                max={50}
                                onChange={onChangePrice}
                                value={typeof inputPrice === 'number' ? inputPrice : 0}
                                
                        />
                        <InputNumber min={1}
                                    max={2000}
                                    style={{ margin: '0 16px' }}
                                    value={inputPrice}
                                    
                        />
                        
                    </Form.Item>
                           
                    <Form.Item label="Stock"
                            name="stock"
                    >

                        <Slider min={1}
                                max={2000}
                                onChange={onChangeStock}
                                value={typeof inputStock === 'number' ? inputStock : 0}
                        />

                        <InputNumber min={1}
                                    max={2000}
                                    style={{ margin: '0 16px' }}
                                    value={inputStock}
                        />

                    </Form.Item>
                           
                       
                    
                    <Form.Item label="Couleur"
                            name="couleur"
                    >
                        <Input onChange={e => setCouleur(e.target.value)} value={couleur} />
                    </Form.Item>
                    
                    <Form.Item label="Image"
                            name="Image"
                    >
                        <Input onChange={e => setImage(e.target.value)} value={image} />
                    </Form.Item>
                
                    <Form.Item label="Qualité"
                            name="Qualité"
                    >
                        <Input onChange={e => setQualité(e.target.value)} value={qualité} />
                    </Form.Item>
                      
                </Form>
            
                <Link to="/mask"><Button style= {{width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary" htmlType="submit" onClick={(e) => {handleNewOrder(); clearFields(e); showModal()}}>   
                    Valider la création
                </Button></Link>

                <Modal title="Validation"
                    visible={isVisible}
                    onOk={handleOk}
                >
                    <p>Article mis en ligne !</p>
                </Modal>

            </Content>
            <FooterComp/>
        </Layout>
    )
}

export default ScreenMasks