import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';
import { connect } from 'react-redux'
import Nav from './Nav'
import FooterComp from './Footer';

import { Layout, Button, Table } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Content } = Layout;


function ScreenConfirm(props) {

  const [infoUsername, setInfoUsername] = useState();
  const [articleList, setArticleList] = useState([])

  const dataSource = []
  let position = 0
  var user;


  useEffect(() => {
    async function loadUser() {

      //Récupération du token dans localStorage
      user = JSON.parse(localStorage.getItem('user', (err, value) => {
      }))

      if (user) {

        const rawResponse = await fetch(`/users/loadinfo/${user.token}`);
        const response = await rawResponse.json();

        if (response.user) {

          setInfoUsername(response.user.username)
        }
      } else {
        return <Redirect to='/' />
      }
    }
    loadUser();
  }, [user]);

// if( props.myConfirm[0] == undefined || props.myConfirm[0].orders == [] || userConfirm[0] == undefined || userConfirm[0].orders == []){
//   return <Redirect to='/' />
// }

  var total = 0
  var price = 0

  if (props.myConfirm[0] != undefined) {

    for (var i = 0; i < props.myConfirm[0].orders.length; i++) {
      position++
      var thisCommande = {
        key: props.myConfirm[0].orders[i],
        id: position,
        couleur: props.myConfirm[0].orders[i].colors,
        qualité: props.myConfirm[0].orders[i].quality,
        quantité: props.myConfirm[0].orders[i].quantity,
        prixUnitaire: props.myConfirm[0].orders[i].priceUnit
      }
      dataSource.push(thisCommande)
      total = props.myConfirm[0].total
      price = props.myConfirm[0].quantity
    }
  } else {
    var userConfirm = JSON.parse(localStorage.getItem('confirm'));
    for (var i = 0; i < userConfirm[0].orders.length; i++) {
      position++
      var thisCommande = {
        key: userConfirm[0].orders[i],
        id: position,
        couleur: userConfirm[0].orders[i].colors,
        qualité: userConfirm[0].orders[i].quality,
        quantité: userConfirm[0].orders[i].quantity,
        prixUnitaire: userConfirm[0].orders[i].priceUnit
      }
      dataSource.push(thisCommande)
      total = userConfirm[0].quantity
      price = userConfirm[0].total
    }

  }

  //Tableau Récapitulatif
  //Titre Colonne
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Couleur',
      dataIndex: 'couleur',
      key: 'couleur',
    },
    {
      title: 'Qualité',
      dataIndex: 'qualité',
      key: 'qualité',
    },
    {
      title: 'Quantité',
      dataIndex: 'quantité',
      key: 'quantité',

    },
    {
      title: 'Prix Unitaire',
      dataIndex: 'prixUnitaire',
      key: 'prixUnitaire',

    }

  ];


  return (


    <Layout className="layout" style={{ minHeight: '100vh', height: 'auto', backgroundColor: 'white' }}>

      <Nav />

      <Content style={{ padding: '0 50px', margin: '40px 0' }}>
        {/* ----------------CONTENU---------------- */}


        <h3 style={{ fontFamily: 'Oswald', fontWeight: 700, fontSize: 25 }}> Merci {infoUsername} !</h3>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1E272E', fontSize: 20, marginTop: 40 }}>


          <CheckCircleFilled style={{ color: '#92D050', fontSize: 100 }} />
          <p style={{ fontWeight: 700, margin: '10px 30px 50px' }}>Votre commande de {total} masque(s) pour un total de {price} € a bien été prise en compte !</p>
          <p style={{ color: '#92D050' }}>Merci pour votre achat responsable et solidaire !</p>


          <p>Récapitulatif</p>
          <Table bordered
            dataSource={dataSource}
            columns={columns}
            style={{ margin: '20px 0 20px', width: '70%' }}
            locale={{ emptyText: 'Aucun article.' }}
          />

          <Link to='/'><Button style={{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', margin: 20 }} type="primary">Retour à l'accueil</Button></Link>

        </div>


      </Content>
      <FooterComp />
    </Layout>

  )

}


function mapStateToProps(state) {
  return {
    myConfirm: state.confirm
  }
}
export default connect(mapStateToProps, null)(ScreenConfirm)
