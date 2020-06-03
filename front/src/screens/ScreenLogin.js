import React from 'react';
import '../App.css';
import { Row, Col, Card, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import { Redirect, Link } from 'react-router-dom';
import Nav from './Nav'


function ScreenLogin() {


  return (
   <div>
 <Nav/>


<div className="Login-page" >

          {/* SIGN-IN */}

          <div className="Sign">
            <h1>Se connecter</h1>
                  
                  <Input className="Login-input" placeholder="Email" />

                  <Input.Password className="Login-input" placeholder="Password" />
            
                  <Button style={{width:'80px', backgroundColor:'purple', borderColor:'black'}} type="primary" ><Link to='/screendashboard'>Sign-ip</Link></Button>

          </div>

          {/* SIGN-UP */}

          <div className="Sign">
            <h1>S'inscrire</h1>

        <Input className="Login-input" placeholder="Email"   />
                  
                  <Input className="Login-input" placeholder="Name"
                  />

                  <Input.Password className="Login-input" placeholder="password"   />
            

            <Button style={{width:'80px', backgroundColor:'purple', borderColor:'black'}} type="primary" ><Link to='/screendashboard'>Sign-up</Link></Button>

          </div>

      </div>

</div>
  )}

export default ScreenLogin