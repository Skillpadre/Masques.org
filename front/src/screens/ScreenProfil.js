import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';

import {connect} from 'react-redux'

import { Layout, Row, Input, Button} from 'antd';
import 'antd/dist/antd.css';

import Nav from './Nav'
import FooterComp from './Footer';

const { Content } = Layout;

function ScreenProfil(props) {

    const [infoLN, setInfoLN] = useState();
    const [infoFN, setInfoFN] = useState();
    const [infoAddress, setInfoAddress] = useState();
    const [infoZip, setInfoZip] = useState();
    const [infoCity, setInfoCity] = useState();
    const [infoTel, setInfoTel] = useState();

    const [changementOk, setChangementOk] = useState();

    useEffect(() => {
        // On charge les info pour les afficher
        async function loadInfo() {
            const rawResponse = await fetch(`/users/loadinfo/${props.token}`);
            const response = await rawResponse.json();

            setInfoLN(response.user.lastName);
            setInfoFN(response.user.firstName);
            setInfoAddress(response.user.address);
            setInfoZip(response.user.zip_code);
            setInfoCity(response.user.city);
            setInfoTel(response.user.tel);
        }
        loadInfo();
    }, []);

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    
    const handleClickChangement = async () => {
        let values = {nom : infoLN, prenom: infoFN, telephone: infoTel, adresse: infoAddress, zipcode: infoZip, city: infoCity};

        const data = await fetch('/users/update-info/' + props.token, {
            method: 'POST',
            headers: {'Content-Type':'application/Json'},
            body: JSON.stringify(values)
        });

        const response = await data.json();

        setInfoLN(response.user.lastName);
        setInfoFN(response.user.firstName);
        setInfoAddress(response.user.address);
        setInfoZip(response.user.zip_code);
        setInfoCity(response.user.city);
        setInfoTel(response.user.tel);

        setChangementOk(<p>Vos changement on bien été pris en compte</p>)

    };
    
 
    if(!props.token){
        return <Redirect to='/' />
    }

    return (
        <Layout style={{height: 'auto', backgroundColor: 'white'}}className="layout">
           
            <Nav />

            <Content style={{ padding: '0 50px', margin: '40px 0'}} className="Profil-page" >

                <Row><h1 style={{fontWeight: 700}}>Mon Compte</h1></Row>


                <Row justify='center'>
                    {/* <div id="profil-box">

                        <List
                            itemLayout="horizontal"
                            dataSource={info}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                title={item.title}
                                description={item.value}
                                />
                            </List.Item>
                            )}
                        />
                
                    </div> */}
                    
                    <div id="profil-box">
                        {changementOk}

                        {/* <h2>Infos personnelles</h2> */}

                        <Input onChange={e => setInfoFN(e.target.value)} value={infoFN} placeholder='Votre prénom' style={{marginTop: 20}}/>
                        <Input onChange={e => setInfoLN(e.target.value)} value={infoLN} placeholder='Votre nom' style={{marginTop: 20}}/>
                        <Input onChange={e => setInfoAddress(e.target.value)} value={infoAddress} placeholder='Votre addresse' style={{marginTop: 20}}/>
                        <Input onChange={e => setInfoZip(e.target.value)} value={infoZip} placeholder='Votre code postal' style={{marginTop: 20}}/>
                        <Input onChange={e => setInfoCity(e.target.value)} value={infoCity} placeholder='Votre ville' style={{marginTop: 20}}/>
                        <Input onChange={e => setInfoTel(e.target.value)} value={infoTel} placeholder='Votre numéro de téléphone' style={{marginTop: 20}}/>


                        <Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 40}} type="primary" onClick={() => handleClickChangement()}>
                            Valider mes changement
                        </Button>
                    </div>

                    {/* <div id="profil-box">

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

                    </div> */}
                </Row>

                {/* <Row><Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Valider mes changements
        </Button>
                </Form.Item></Row> */}
            </Content>
            <FooterComp/>
        </Layout>
    )
}

function mapStateToProps(state) {
    return { token: state.userToken }
}
  

export default connect(
    mapStateToProps,
    null
   )(ScreenProfil);