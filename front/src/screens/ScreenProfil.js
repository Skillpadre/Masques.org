import React from 'react';
import '../App.css';
import { Row, Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { Redirect, Link } from 'react-router-dom';
import Nav from './Nav'


function ScreenProfil() {

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    return (
        <div>
            <Nav />



            <div className="Profil-page" >

                <Row><h1>Mon Compte</h1></Row>


                <Row>
                    <div id="profil-box">

                        <h2>Infos personnelles</h2>

                        <Form>
                            <Form.Item
                                label="Prénom"
                                name="prénom"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Nom"
                                name="nom"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Adresse"
                                name="adresse"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Téléphone"
                                name="téléphone"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mail"
                                name="mail"
                            >
                                <Input />
                            </Form.Item>


                        </Form>
                    </div>

                    <div id="profil-box">

                        <h2>Infos de connexion</h2>
                        <Form>
                            <Form.Item
                                label="Username"
                                name="username"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="Password"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Confirmer Password"
                                name="Password"
                            >
                                <Input />
                            </Form.Item>

                        </Form>

                    </div>
                </Row>

                <Row><Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Valider mes changements
        </Button>
                </Form.Item></Row>
            </div>

        </div>
    )
}

export default ScreenProfil