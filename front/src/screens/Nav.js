import React from 'react';
import '../App.css';
import { Row, Col, Card, Menu} from 'antd';
import 'antd/dist/antd.css';
import { Redirect, Link } from 'react-router-dom';
import {Icon} from '@ant-design/compatible'
import { LoginOutlined } from '@ant-design/icons'



function Nav() {


  return (
   <div>
<header>
   
      <Row align="middle"> 
      <Col offset={2} span={4}><h1>Masques.org</h1></Col>
      <Col span={18}>
<Menu mode="horizontal">

<Menu.Item key="mail">
<Col span={4}>
  <Icon type="home" />
  
  <Link to='/' className="customclass">Accueil</Link> 
  </Col>
</Menu.Item>


<Menu.Item key="fab">
<Col span={4}>
<Link to='/screenmap' className="customclass" >Fabricants</Link>
</Col>
</Menu.Item>


<Menu.Item key="sign" className="customclass">
  
  <Col span={4}>
  <Icon type="login" />
  <Link to='/screenlogin'> Sign In/ Sign Up</Link>
  </Col>
</Menu.Item>



</Menu>
</Col>
  </Row>
</header>


</div>
  );
}

export default Nav;
