import React from 'react';
import '../App.css';
import { Row, Col, Card} from 'antd';
import 'antd/dist/antd.css';


function ScreenHome() {


  return (
   <div>
<header>
   
      <Row align="middle"> 
      <Col span={4}><h1>Masques.org</h1></Col> 
       <Col span={1}><h3 class="headers">Accueil</h3></Col>
       <Col span={1}><h3 class="headers">Fabricants</h3></Col>
       <Col offset={14} span={2} ><h3 class="headers">Sign In/ Sign Up</h3></Col> 
       </Row>
</header>

<body>

<h1 id="title">Masques personnalisés</h1>

<h3 id="choix">Entreprises | Collectivités | Grand Public</h3>

<div>
  <Row justify="space-around">  
<Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 400 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width:400 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 400 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 400 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 400 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 400 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
   
    </Row>
  </div>

</body>
</div>
  );
}

export default ScreenHome;
