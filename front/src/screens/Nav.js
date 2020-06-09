import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import {Menu, Avatar} from 'antd';
import {ShoppingFilled, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import {connect} from 'react-redux'



function Nav(props) {
    
    //Récupération du token dans localStorage
    var userToken = localStorage.getItem('token', (err, value) => {
        console.log('value = ' + value)       
    })


    useEffect(() => {        
        props.addToken(userToken);  
        /* Prends en compte tous les changement de userData --> localStorage */
    }, [userToken])


    let items;

    if(userToken){

        let itemLogout = 
            <Menu.Item key="4" style={{float: 'right'}}>

                    <Link onClick={()=>{props.deleteToken(); localStorage.clear()}} to='/'>Logout</Link>
                
            </Menu.Item>
        
        let itemCompte = 
            <Menu.Item key="5" style={{float: 'right'}}>

                <Avatar style={{marginRight: 10}} size={30} icon={<UserOutlined />} />
                <Link to='/dashboard'>Mon Compte</Link>
             
            </Menu.Item>

        let itemPanier = 
            <Menu.Item key="6" style={{float: 'right'}}>
                
                <ShoppingFilled style={{fontSize:20}}/>
                <Link to='/basket'>Panier</Link>

            </Menu.Item>

        items=[itemLogout, itemCompte, itemPanier];
            
    } else {
        items = 
            <Menu.Item key="4" style={{float: 'right'}}>
                <Link to='/login'>S'inscrire / Se connecter</Link>
            </Menu.Item>
    }

  return (
 
    <Menu className='Menu' theme="dark" style={{backgroundColor: '#1e272e'}} mode="horizontal" defaultSelectedKeys={['2']}>

        <Menu.Item className='logo' key="1">
            <Link to='/' style={{fontSize: 20}}>Masques.org</Link>
        </Menu.Item>
        <Menu.Item key="2" className="menuItem">
            <Link to='/'>Accueil</Link> 
        </Menu.Item>
        <Menu.Item key="3">
            <Link to='/map'>Fabricants</Link>
        </Menu.Item>
        
        {items}

    </Menu>

  );
}

function mapStateToProps(state){
    return { token: state.userToken}
}
function mapDispatchToProps(dispatch){
    return {
        addToken: function(token){
            dispatch( {type: 'addToken', token: token} )
          },
        deleteToken: function(){
            dispatch({type: 'deleteToken'})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
