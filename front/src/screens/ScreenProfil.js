import React, {useState, useEffect} from 'react';
import '../App.css';
import { Row, Form, Input, Button, Checkbox, List, Skeleton, Avatar } from 'antd';
import 'antd/dist/antd.css';
import { Redirect, Link } from 'react-router-dom';
import Nav from './Nav'
import {connect} from 'react-redux'


function ScreenProfil(props) {

    const [info, setInfo] = useState([]);

    useEffect(() => {
        // On charge les info pour les afficher
        async function loadInfo() {
            const rawResponse = await fetch(`/users/loadinfo/:${props.token}`);
            const response = await rawResponse.json();
            console.log(response);
        }
        loadInfo();
    }, []);

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

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const onFinish = async values => {
        console.log('Success:', values);

        await fetch('/users/update-info/' + props.token, {
            method: 'POST',
            headers: {'Content-Type':'application/Json'},
            body: JSON.stringify(values)
        });
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div>
            <Nav />



            <div className="Profil-page" >

                <Row><h1>Mon Compte</h1></Row>


                <Row>
                    <div id="profil-box">

<List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
/>
                
                    </div>

                    <div id="profil-box">

                        <h2>Infos personnelles</h2>

                        <Form
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Prénom"
                                name="prenom"
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
                                label="code postal"
                                name="zipcode"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Ville"
                                name="city"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Téléphone"
                                name="telephone"
                            >
                                <Input />
                            </Form.Item>

                            <Row>  
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Sign-up
                                    </Button>
                                </Form.Item>
                            </Row>
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

function mapStateToProps(state) {
    return { token: state.userToken }
}
  

export default connect(
    mapStateToProps,
    null
   )(ScreenProfil);