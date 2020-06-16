import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';

import {connect} from 'react-redux'

import { Layout, Form, Row, Col, Input, Button} from 'antd';
import 'antd/dist/antd.css';

import Nav from './Nav'
import FooterComp from './Footer';

const { Content } = Layout;


function ScreenLogin(props) {

  // State SIGN UP
  const [singUpUsername, setSingUpUsername] = useState('');
  const [singUpEmail, setSingUpEmail] = useState('');
  const [singUpPassword, setSingUpPassword] = useState('');
  const [singUpPasswordConfirm, setSingUpPasswordConfirm] = useState('')
  const [listErrorSignup, setErrorSignup] = useState([]);

  // State SIGN IN
  const [singInEmail, setSingInEmail] = useState('');
  const [singInPassword, setSingInPassword] = useState('');
  const [listErrorSignin, setErrorSignin] = useState([]);

  const [userExist, setUserExist] = useState(false);

  // Au click sur Sign-up
 let handleSubmitSingUp = async () => {
  setErrorSignup([]);
    if(singUpPassword === singUpPasswordConfirm){
      let data = await fetch('/users/signup', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `username=${singUpUsername}&email=${singUpEmail}&password=${singUpPassword}`
      });
      let response = await data.json();

      // On test la réponse du back
      if(response.result){      // Si on a bien un user
        let user = {
          token : response.user.token,
          username: response.user.username,
          urlAvatar: response.user.avatar
        }
        props.addUser(user);// add user reducer
        localStorage.setItem('user', JSON.stringify(user));//envoi des infos user dans le localStorage
        localStorage.setItem('panier', JSON.stringify([])); //création du panier dans le local storage
        setUserExist(true);
      } else {                  // Si pas de user
        setErrorSignup(response.error)
      }

    } else {
      setErrorSignup(['Les mots de passe doivent être identiques'])
    }
  }

  // Liste des error de sign up à afficher
  let tabErrorSignup = listErrorSignup.map((error, i)=>{
    return(<p key={i}>{error}</p>)
  });


  // Au click sur Sign-in
  let handleSubmitSingIn = async () => {
    setErrorSignin([]);

    let data = await fetch('/users/signin', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${singInEmail}&password=${singInPassword}`
    });
    let response = await data.json();

    // On test la réponse du back
    if(response.result){      // Si on a bien un user
      let user = {
        token : response.user.token,
        username: response.user.username,
        urlAvatar: response.user.avatar
      }
      props.addUser(user);// add user reducer
      localStorage.setItem('user', JSON.stringify(user));//envoi des infos user dans le localStorage
      localStorage.setItem('panier', JSON.stringify([])); //création du panier dans le local storage
      setUserExist(true);
    } else {                  // Si pas de user
      setErrorSignin(response.error)
    }
  }

  // Liste des error de sign in à afficher
  let tabErrorSignin = listErrorSignin.map((error, i)=>{
    return(<p key={i}>{error}</p>)
  });

  //Disposition form
  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
 


  if(userExist)
    return <Redirect to='/' />

  return (
    <Layout style={{minHeight: '100vh', height: 'auto', backgroundColor: 'white'}}className="layout">

      <Nav/>

      <Content style={{padding: '0 50px', display: 'flex', flexDirection:'column', alignItems: 'center', margin: '40px 0'}}>
        <h1>Rejoingnez-nous!</h1>

          {/* SIGN-IN */}
          <Row className="Sign Login-page">
            <Col md={{span: 6}} sm={{span: 22}} className='Sign'>
              <h2 style={{fontWeight: 700}}>Se connecter</h2>

              {tabErrorSignin}

              <Form {...layout} name="basic" initialValues={{remember: true}}>

                <Form.Item label="Email"
                          name="Email"
                          rules={[
                            {
                              required: true,
                            }
                          ]}
                >
                  <Input onChange={e => setSingInEmail(e.target.value)} value={singInEmail}/>
                </Form.Item>

                <Form.Item
                  label="Mot de passe"
                  name="Mot de passe"
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input.Password onChange={e => setSingInPassword(e.target.value)} value={singInPassword}/>
                </Form.Item>

                <Form.Item>
                  <Button onClick={()=> handleSubmitSingIn()} style= {{width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary" htmlType="submit">
                    Valider
                  </Button>
                </Form.Item>
              </Form>
            </Col>

          {/* SIGN-UP */}

            <Col md={{span: 6}} sm={{span: 22}} className='Sign'>
              <h2 style={{fontWeight: 700}}>S'inscrire</h2>

              {tabErrorSignup}

              <Form {...layout} name="basic" initialValues={{remember: true}}>

                <Form.Item label="Nom d'utilisateur"
                          name="Nom d'utilisateur"
                          rules={[
                            {
                              required: true,
                            }
                          ]}
                >
                  <Input onChange={e => setSingUpUsername(e.target.value)} value={singUpUsername}/>
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="Email"
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input onChange={e => setSingUpEmail(e.target.value)} value={singUpEmail}/>
                </Form.Item>

                <Form.Item
                    label="Mot de passe"
                    name="Mot de passe"
                    rules={[
                      {
                        required: true,
                      }
                    ]}
                  >
                    <Input.Password required minLength="8" maxLength="24" onChange={e => setSingUpPassword(e.target.value)} value={singUpPassword}/>
                  </Form.Item>

                  <Form.Item
                    label="Confirmer le mot de passe"
                    name="Confirmation mot de passe"
                    rules={[
                      {
                        required: true,
                      }
                    ]}
                  >
                    <Input.Password onChange={e => setSingUpPasswordConfirm(e.target.value)} value={singUpPasswordConfirm}/>
                  </Form.Item>

                  <Form.Item>
                  <Button onClick={()=> handleSubmitSingUp()} style= {{width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary" htmlType="submit">
                    Valider
                  </Button>
                </Form.Item>
              </Form>

            </Col>
          </Row>

      </Content>
      <FooterComp/>
    </Layout>
  )
}

function mapDispatchToProps(dispatch){
  return {
    addUser: function(user){
      dispatch( {type: 'addUser', user: user} )
    }
  }
}


export default connect(null, mapDispatchToProps)(ScreenLogin);