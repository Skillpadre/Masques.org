import React, {useState, useEffect} from 'react';
import '../App.css';
import { Row, Col, Card, Button, Layout, List, Avatar } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Nav from './Nav'
import {connect} from 'react-redux'

const { Content, Footer } = Layout;


function ScreenDashboard(props) {

    const [infoUsername, setInfoUsername] = useState();
    const [infoLN, setInfoLN] = useState(); //Last Name
    const [infoFN, setInfoFN] = useState(); //First Name
    const [infoAddress, setInfoAddress] = useState(); 
    const [infoZip, setInfoZip] = useState();
    const [infoCity, setInfoCity] = useState();
    const [infoTel, setInfoTel] = useState();

  useEffect(() => {
    async function loadUser() {
      const rawResponse = await fetch(`/users/loadinfo/${props.token}`);
      const response = await rawResponse.json();

      setInfoUsername(response.user.username)
      setInfoLN(response.user.lastName);
      setInfoFN(response.user.firstName);
      setInfoAddress(response.user.address);
      setInfoZip(response.user.zip_code);
      setInfoCity(response.user.city);
      setInfoTel(response.user.tel);


    }
    loadUser();
  }, []);


  let afficherNom = infoFN + ' ' + infoLN;
  if(!infoFN || !infoLN){
    afficherNom = infoUsername;
  }

  let finaliserCompte;
  if(!infoFN || !infoLN || !infoAddress || !infoCity || !infoZip || !infoTel){
    finaliserCompte = <p>Vous pouvez finaliser votre compte en renseignant vos information <Link to='/profil'>ici</Link></p>
  }

  const data = [
    {
      title: 'Commande n° 1',
    },
    {
      title: 'Commande n° 2',
    },
    {
      title: 'Commande n° 3',
    },
    {
      title: 'Commande n° 4',
    },
  ];

  if(!props.token){
    return <Redirect to='/' />
  }

  return (
    <Layout className="layout" style={{height: 'auto', backgroundColor: 'white'}}>
      <Nav />

      <Content style={{ padding: '0 50px' }} className="Dashboard-page">

      <Row justify='center' align='middle'>
        {finaliserCompte}
      </Row>
        
        <Row justify='space-between' align='middle'>
          <Col md={{span: 6}} sm={{span: 24}}>

            <h2 style={{fontWeight: 700, fontSize: 25}}>Bienvenue {afficherNom} !</h2>
    
          </Col>
          <Col md={{span: 10}} sm={{span: 12}} xs={{span: 24}}> 

          <h1 style={{fontWeight: 700, fontSize: 40}}>Tableau de bord</h1>

          </Col>

          <Col md={{span: 3}} sm={{span: 12}} xs={{span: 24}} style={{display: 'flex', flexDirection: 'column'}}>
            <Button style= {{width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary"><Link to='/mask'>Vendre des articles</Link></Button>
            <Button style= {{width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary"><Link to='/map'>Passer une commande</Link></Button>
            <Button style={{marginTop:20, width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black'}} type='primary'><Link to='/profil'>Modifier mes infos</Link></Button>
          </Col>

        </Row>

        <Row style={{marginTop: 40}}>
          <Col md={{span: 12}} sm={{span: 24}}>
            <h2>Commandes en attente de validation</h2>
            <div id="dashboard-box">

              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />,
  </div>
          </Col>
          <Col md={{span: 12}} sm={{span: 24}}>
            <h2>Historique des commandes</h2>
            <div id="dashboard-box">

              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />,
  </div>
          </Col>
        </Row>

      </Content>
      <Footer style={{ textAlign: 'center', marginTop: 30}}>© 2020 Masques.org. Tous droits réservés.</Footer>
    </Layout>
  );
}

function mapStateToProps(state){
  return { token: state.userToken}
}

export default connect(mapStateToProps, null)(ScreenDashboard);