import React, {useState, useEffect} from 'react';
import '../App.css';
import { Row, Form, Input, Button, Checkbox, List, Skeleton, Avatar } from 'antd';
import 'antd/dist/antd.css';
import { Redirect, Link } from 'react-router-dom';
import Nav from './Nav'
import {connect} from 'react-redux'


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
            console.log(response);
            console.log(response.user)

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
        <div>
            <Nav />



            <div className="Profil-page" >

                <Row><h1>Mon Compte</h1></Row>


                <Row>
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

                        <Input onChange={e => setInfoFN(e.target.value)} value={infoFN} placeholder='Votre prénom' />
                        <Input onChange={e => setInfoLN(e.target.value)} value={infoLN} placeholder='Votre nom' />
                        <Input onChange={e => setInfoAddress(e.target.value)} value={infoAddress} placeholder='Votre addresse' />
                        <Input onChange={e => setInfoZip(e.target.value)} value={infoZip} placeholder='Votre code postal' />
                        <Input onChange={e => setInfoCity(e.target.value)} value={infoCity} placeholder='Votre ville' />
                        <Input onChange={e => setInfoTel(e.target.value)} value={infoTel} placeholder='Votre numéro de téléphone' />


                        <Row>  
                            <Button style={{marginTop: 25}} type="primary" onClick={() => handleClickChangement()}>
                                Valider mes changement
                            </Button>
                        </Row>
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