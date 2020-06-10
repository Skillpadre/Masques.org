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

    const [avatar, setAvatar] = useState('');
    const [changAvatar, setChangAvatar] = useState();

    useEffect(() => {
        // On charge les info pour les afficher
        console.log(props.user);
        async function loadInfo() {
            const rawResponse = await fetch(`/users/loadinfo/${props.user.token}`);
            const response = await rawResponse.json();

            setInfoLN(response.user.lastName);
            setInfoFN(response.user.firstName);
            setInfoAddress(response.user.address);
            setInfoZip(response.user.zip_code);
            setInfoCity(response.user.city);
            setInfoTel(response.user.tel);
            setAvatar(response.user.avatar);
        }
        loadInfo();
    }, [props.user]);

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    
    const handleClickChangement = async () => {
        let values = {nom : infoLN, prenom: infoFN, telephone: infoTel, adresse: infoAddress, zipcode: infoZip, city: infoCity};

        const data = await fetch('/users/update-info/' + props.user.token, {
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

        setChangementOk(<p style={{color: '#52C41A', margin: 20}}>Vos changement on bien été pris en compte !</p>)

    };

    var fileSelectedHandler= event =>{
        console.log(event.target.files[0]);
        setAvatar(event.target.files[0])
      }

    const handleClickAvatar = async () =>{

        var data = new FormData();
        data.append('avatar', avatar, 'blabla.jpg');

        var rawResponse = await fetch('/users/add-avatar/'+ props.user.token, {
            method: 'POST',
            body: data
        });

        var response = await rawResponse.json();

        console.log('data =' + data)
        console.log(response.user);
        
        let newAvatarUser = props.user;
        newAvatarUser.urlAvatar = response.user.avatar;

        console.log(newAvatarUser)
        props.addUser(newAvatarUser);
        setAvatar(response.user.avatar)

        localStorage.setItem('user', JSON.stringify(newAvatarUser));
        setChangAvatar(<p style={{color: '#52C41A', margin : 20}}>Le changement de votre avatar à bien été effectué !</p>)

       
    }

    let urlImg;

    if(avatar === ''){
        urlImg = "https://res.cloudinary.com/dmvudxnlz/image/upload/v1591715224/noavatar_wceh4i.png"
    } else {
        urlImg = avatar;
    }
    
 
    /* if(!props.user.token){
        return <Redirect to='/' />
    } */

    return (
        <Layout style={{height: 'auto', backgroundColor: 'white'}}className="layout">
           
            <Nav />

            <Content style={{ padding: '0 50px', margin: '40px 0', display: 'flex', flexDirection: 'column'}} className="Profil-page" >

                <Row><h1 style={{fontWeight: 700}}>Mon Compte</h1></Row>


                    <h3 style={{fontSize: 20, fontWeight: 700}}>Avatar</h3>

                    <Input type='file' onChange={fileSelectedHandler} style={{margin: 20, width: '20%'}}/>
                    
    <div><img style={{width: 150, height: 150, borderRadius: '50%'}} src={urlImg}/></div>
                    <Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 40}} type="primary" onClick={() => handleClickAvatar()}>
                        Valider
                    </Button>

                    {changAvatar}
            
                    <div style={{width: '50%'}}>
                        {changementOk}

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

           

            </Content>
            <FooterComp/>
        </Layout>
    )
}

function mapStateToProps(state) {
    return { user: state.user }
}

function mapDispatchToProps(dispatch){
    return {
        addUser: function(user){
            dispatch( {type: 'addUser', user: user} )
          }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
   )(ScreenProfil);