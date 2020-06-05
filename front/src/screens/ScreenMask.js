import React, { useState } from 'react';
import '../App.css';
import { Row, Form, Input, Button, Checkbox, Col, Slider, InputNumber, Modal } from 'antd';
import 'antd/dist/antd.css';
import { Redirect, Link } from 'react-router-dom';
import Nav from './Nav'


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
        <div>
            <Nav />



            <div className="Mask-page" >

                <Row><h1>Création de masques</h1></Row>


                <Row>

                        <h2>Paramètres de la création</h2>
                 </Row>
                         
                        <Form id="form-articles" style={{ size: 'large' }}>
                <Row>
                    <Col span={24}>
                            <Form.Item
                                label="Modèle"
                                name="modèle"
                            >
                                <Input onChange={e => setModèle(e.target.value)} value={modèle} />
                            </Form.Item>
                            </Col>
                </Row>
                <Row>
                            <Form.Item
                                label="Description"
                                name="description"
                            >
                                <TextArea rows={6} onChange={e => setDescription(e.target.value)} value={description} />
                            </Form.Item>
                            </Row>
                            <Row>

                                <Col span={12}>
                                    <Form.Item
                                        label="Prix"
                                        name="value"
                                    >
                                        <Slider
                                            min={1}
                                            max={2000}
                                            onChange={onChangePrice}
                                            value={typeof inputPrice === 'number' ? inputPrice : 0}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <InputNumber
                                        min={1}
                                        max={2000}
                                        style={{ margin: '0 16px' }}
                                        value={inputPrice}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="Stock"
                                        name="stock"
                                    >

                                        <Slider
                                            min={1}
                                            max={2000}
                                            onChange={onChangeStock}
                                            value={typeof inputStock === 'number' ? inputStock : 0}
                                        />

                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <InputNumber
                                        min={1}
                                        max={2000}
                                        style={{ margin: '0 16px' }}
                                        value={inputStock}
                                    />
                                </Col>
                            </Row>
            <Row>
                            <Form.Item
                                label="Couleur"
                                name="couleur"
                            >
                                <Input onChange={e => setCouleur(e.target.value)} value={couleur} />
                            </Form.Item>
            </Row>
            <Row>
                            <Form.Item
                                label="Image"
                                name="Image"
                            >
                                <Input onChange={e => setImage(e.target.value)} value={image} />
                            </Form.Item>
            </Row>
            <Row>
                            <Form.Item
                                label="Qualité"
                                name="Qualité"
                            >
                                <Input onChange={e => setQualité(e.target.value)} value={qualité} />
                            </Form.Item>
                            </Row>
                        </Form>
       

                <Row><Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={(e) => {handleNewOrder(); clearFields(e); showModal()}}>
                        <Link to="/mask">
                        Valider la création
                        </Link>
                       
                    </Button>
                </Form.Item></Row>

                <Modal
          title="Validation"
          visible={isVisible}
          onOk={handleOk}
        >
          <p>Article mis en ligne !</p>
        </Modal>
            </div>

        </div>
    )
}

export default ScreenMasks