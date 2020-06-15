import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import {Menu, Avatar} from 'antd';
import {ShoppingFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';

import {connect} from 'react-redux'



function Nav(props) {
    
    const [avatar, setAvatar] = useState("https://res.cloudinary.com/dmvudxnlz/image/upload/v1591715224/noavatar_wceh4i.png")
    
    //Récupération du token dans localStorage
    var user = localStorage.getItem('user', (err, value) => {console.log('value = ' + value)  });     

    useEffect(() => {   
        
        props.addUser(JSON.parse(user));  
        /* Prends en compte tous les changement de userData --> localStorage */
    }, [user])

    useEffect(() => {
        if(props.user)
            setAvatar(props.user.urlAvatar);
            
    }, [props.user]);


    let items;

    if(user){

        let itemLogout = 
            <Menu.Item key="8" style={{float: 'right'}}>

                    <Link onClick={()=>{props.deleteUser(); localStorage.clear()}} to='/'>Deconnexion</Link>
                
            </Menu.Item>
        
        let itemCompte = 
            <Menu.Item key="7" style={{float: 'right'}}>
                
                <Avatar style={{marginRight: 10}} size={30} src={avatar} />
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
            <Menu.Item key="5" style={{float: 'right'}}>
                <Link to='/login'>S'inscrire / Se connecter</Link>
            </Menu.Item>
    }

  return (
 
    <Menu className='Menu' theme="dark" style={{backgroundColor: '#1e272e'}} mode="horizontal" defaultSelectedKeys={['1']}>

        <Menu.Item className='logo' key="1" icon={<img src='../logo.png' alt='logo' style={{width: 30, margin: '0 10px 5px'}}/>}>
            <Link to='/' style={{fontSize: 20}}>Masques.org</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to='/'>Accueil</Link> 
        </Menu.Item>
        <Menu.Item key="3">
            <Link to='/map'>Fabricants</Link>
        </Menu.Item>
        <Menu.Item key="4">
            <Link to='/quisommesnous'>Qui sommes nous ?</Link>
        </Menu.Item>
        
        {items}

    </Menu>

  );
}

function mapStateToProps(state){
    return { user: state.user}
}
function mapDispatchToProps(dispatch){
    return {
        addUser: function(user){
            dispatch( {type: 'addUser', user: user} )
          },
        deleteUser: function(){
            dispatch({type: 'deleteUser'})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
