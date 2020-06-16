import React, { useState, useEffect } from 'react';
import '../App.css';
import { Row, Col, Button, Layout, List, Modal } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Nav from './Nav'
import FooterComp from './Footer';
import { connect } from 'react-redux'
import moment from 'moment';

const { Content } = Layout;


function ScreenDashboard(props) {

  const [infoUsername, setInfoUsername] = useState();
  const [infoLN, setInfoLN] = useState(); //Last Name
  const [infoFN, setInfoFN] = useState(); //First Name
  const [infoAddress, setInfoAddress] = useState();
  const [infoZip, setInfoZip] = useState();
  const [infoCity, setInfoCity] = useState();
  const [infoTel, setInfoTel] = useState();
  const [avatar, setAvatar] = useState();

  const [listSale, setListSale] = useState([]);
  const [listCommandes, setListCommandes] = useState([])//Commandes coté Acheteur
  const [listOrders, setListOrders] = useState([])//Commandes coté Vendeur

  const [isLogin, setIsLogin] = useState(true);

  const [visible, setVisible] = useState(false)//modal
  const [article, setArticle] = useState({});


  var user;

  useEffect(() => {
    async function loadUser() {

      //Récupération du token dans localStorage
      user = JSON.parse(localStorage.getItem('user', (err, value) => {
      }))

      if (user) {

        const rawResponse = await fetch(`/users/loadinfo/${user.token}`);
        const response = await rawResponse.json();

  
        if (response.user.commandes) {

          setInfoUsername(response.user.username)
          setInfoLN(response.user.lastName);
          setInfoFN(response.user.firstName);
          setInfoAddress(response.user.address);
          setInfoZip(response.user.zip_code);
          setInfoCity(response.user.city);
          setInfoTel(response.user.tel);
          setAvatar(response.user.avatar);
          setListCommandes(response.user.commandes)
          setListOrders(response.user.orders)
          setListSale(response.user.articles);
          
        }

      } else {
        setIsLogin(false)
      }

    }
    loadUser();
  }, [user]);


  //MODAL PERSONNALISATION
  var showModal = (article) => {
    setVisible(true);
    setArticle(article);
  };

  var handleOk = e => {
    setVisible(false)
  };

  var handleCancel = e => {
    setVisible(false)
  };
 

  let afficherNom = infoFN + ' ' + infoLN;
  if (!infoFN || !infoLN) {
    afficherNom = infoUsername;
  }

  let finaliserCompte;
  if (!infoFN || !infoLN || !infoAddress || !infoCity || !infoZip || !infoTel || avatar === '') {
    finaliserCompte = <p style={{ fontSize: 15 }}>Pour vendre des articles, veuillez finalisez votre compte <Link to='/mon-profil'>ICI</Link> !</p>;
  }

  let listPendingSale = [];

  listSale.map((article, i) => {
    if (!article.sellout) {
      listPendingSale.push(article);
    }
  });

  if (!isLogin) {
    return (<Redirect to='/' />)
  }

  return (
    <Layout className="layout" style={{ minHeight: '100vh', height: 'auto', backgroundColor: 'white' }}>
      <Nav />

      <Content style={{ height: '100%', padding: '0 50px', margin: '40px 0' }} className="Dashboard-page">

        <Row justify='center' align='top'>
          {finaliserCompte}
        </Row>

        <Row justify='space-between' align='middle'>
          <Col md={{ span: 8 }} sm={{ span: 24 }}>

            <h2 style={{ fontWeight: 700, fontSize: 25 }}>Bienvenue {afficherNom} !</h2>

          </Col>
          <Col md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>

            <h1 style={{ fontWeight: 700, fontSize: 40 }}>Tableau de bord</h1>

          </Col>

          <Col md={{ span: 3 }} sm={{ span: 12 }} xs={{ span: 24 }} style={{ display: 'flex', flexDirection: 'column' }}>
            <Button disabled={finaliserCompte ? true : false} style={{ width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20 }} type="primary"><Link to='/creation-vente'>Vendre des articles</Link></Button>
            <Button style={{ width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20 }} type="primary"><Link to='/map'>Passer une commande</Link></Button>
            <Button style={{ marginTop: 20, width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black' }} type='primary'><Link to='/mon-profil'>Modifier mes infos</Link></Button>
          </Col>

        </Row>

        <Row style={{ marginTop: 40 }} justify='center'>
          <Col md={{ span: 12 }} sm={{ span: 24 }}>
            <h2 style={{color: '#E23D70'}}>Mes offres publiées</h2>
            <div className='dashboard-box'>
              
               <List 
                  locale={{emptyText : 'Aucun offre publiée.'}}
                  style={{ margin: "10px 15px 0 10px", textAlign: 'left'}}
                  dataSource={listPendingSale}
                  renderItem={item => (
                    <List.Item style={{ marginLeft: 7 }}>
                    <List.Item.Meta
                      title={"Offre n° " + item._id}
                      description={"Créé le " + moment(item.date_insert).format('L')}
                    />

                    <List.Item.Meta
                      title={item.description}
                    />
                    
                  </List.Item>
                  )} 
              />

            </div>
          </Col>
         
          <Col md={{ span: 12 }} sm={{ span: 24 }}>
            <h2 style={{color: '#E23D70'}}>Mes commandes passées</h2>
            <div className='dashboard-box'>
              
               <List 
                  locale={{emptyText : 'Aucun commande passée.'}}
                  style={{ margin: "10px 15px 0 10px"}}
                  dataSource={listCommandes}
                  renderItem={item => (
                      <List.Item>
                      
                          <List.Item.Meta
                              title={"Numéro de commande : " + item._id}
                              description={"Passée le " + moment(item.date_insert).format('L')}
                          />

                          <List.Item.Meta
                              title={"Quantité commandée : "}
                              description={item.quantity}
                              
                          />

                          <List.Item.Meta
                              title={"Livraison : "}
                              description={item.livraison}
                          />

                          <List.Item.Meta
                              title={" Prix total :"}
                              description={item.totalPrice + '€'}
                          />

      
                      </List.Item>
                  )} 
              />

            </div>
          </Col>
        
          <Col md={{ span: 20 }} sm={{ span: 24 }}>
            <h2 style={{color: '#E23D70'}}>Commandes clients</h2>
            <div className='dashboard-box'>
              
               <List 
                  locale={{emptyText : 'Aucun commande client.'}}
                  style={{ margin: "10px 15px 0 10px"}}
                  dataSource={listOrders}
                  renderItem={item => (
                      <List.Item>
                      
                          <List.Item.Meta
                              title={"Numéro de commande : " + item._id}
                              description={"Passée le " + item.date_insert}
                          />

                          <List.Item.Meta
                              title={"Modèle : "}
                              description={item.articles.model}
                          />

                          <List.Item.Meta
                              title={"Quantité commandée : "}
                              description={item.quantity}
                              
                          />

                          <List.Item.Meta
                                title={"Couleur : "}
                                description={item.articles.colors}
                          />

                          <List.Item.Meta
                              title={"Matière : "}
                              description={item.articles.material}
                          />
                          <List.Item.Meta
                              title={"Prix total : "}
                              description={item.totalPrice + '€'}
                          />
                          <List.Item.Meta
                            title={<Button style={{ width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black'}} type="primary" onClick={() => showModal(item.articles)}>Voir personnalisation</Button>}
                          />
          
                          <Modal style={{textAlign: 'center'}}
                                  title="Personnalisation client"
                                  visible={visible}
                                  onOk={handleOk}
                                  onCancel={handleCancel}
                            >
                              <div className='masque' style={{backgroundImage: `url(${article.urlImg})`}}>
                                  <p style={{ marginTop: 90, fontSize: 25, color: article.textColor, maxWidth: '270px'}}>{article.designText}</p>
                                  {article.designImg!== ''?<img style={{ width: 150, height: 100}} src={article.designImg} alt='image sur masque'/> :null}
                              </div>
        
                            </Modal>
                      </List.Item>
                  )}
                  
              />

            </div>
          </Col>
        </Row>

      </Content>
      <FooterComp />
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(ScreenDashboard);