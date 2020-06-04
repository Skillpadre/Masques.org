import React, {useState} from 'react';
import '../App.css';
import { Row, Col, Card, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import { Redirect, Link } from 'react-router-dom';
import Nav from './Nav'


function ScreenLogin() {

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
        console.log(response.user.token);// add token reducer
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
      console.log(response.user.token);// add token reducer
      setUserExist(true);
    } else {                  // Si pas de user
      setErrorSignin(response.error)
    }
  }

  // Liste des error de sign in à afficher
  let tabErrorSignin = listErrorSignin.map((error, i)=>{
    return(<p key={i}>{error}</p>)
  });
 
  if(userExist)
    return <Redirect to='/ScreenHome' />

  return (
    <div>
      <Nav/>

      <div className="Login-page" >
        {/* SIGN-IN */}
        <div className="Sign">
          <h1>Se connecter</h1>

          {tabErrorSignin}

          <Input required className="Login-input" placeholder="Email" onChange={e => setSingInEmail(e.target.value)} value={singInEmail} />

          <Input.Password required className="Login-input" placeholder="Password" onChange={e => setSingInPassword(e.target.value)} value={singInPassword} />

          <Button onClick={()=> handleSubmitSingIn()} style={{ width: '80px', backgroundColor: 'purple', borderColor: 'black' }} type="primary" >Sign-in</Button>

        </div>

        {/* SIGN-UP */}

        <div className="Sign">
          <h1>S'inscrire</h1>

          {tabErrorSignup}

          <Input required maxLength={24} className="Login-input" placeholder="username" onChange={e => setSingUpUsername(e.target.value)} value={singUpUsername} />
                  
          <Input required className="Login-input" placeholder="email" onChange={e => setSingUpEmail(e.target.value)} value={singUpEmail}/>

          <Input.Password required minLength="8" maxLength="24" className="Login-input" placeholder="password" onChange={e => setSingUpPassword(e.target.value)} value={singUpPassword} />
          <Input.Password required className="Login-input" placeholder="confirm password" onChange={e => setSingUpPasswordConfirm(e.target.value)} value={singUpPasswordConfirm} />

          <Button onClick={()=> handleSubmitSingUp()} style={{width:'80px', backgroundColor:'purple', borderColor:'black'}} type="primary" >Sign-up</Button>

        </div>

      </div>
    </div>
  )}

export default ScreenLogin