import React, {useEffect, useState} from 'react';
import '../App.css';
import {Menu} from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'



function Nav(props) {
    
    //Récupération du token dans localStorage
    var userData=localStorage.getItem('token', (err, value) => {  
        console.log('value = ' + value)       
    })


    useEffect(() => {
        /* Prends en compte tous les changeent de userData --> localStorage*/
    }, [userData])


    let items;

    if(userData){

        let itemLogout = 
            <Menu.Item key="4" style={{float: 'right'}}>

                    <Link onClick={()=>{props.deleteToken(); localStorage.clear()}} to='/' className="customclass" >Logout</Link>
                
            </Menu.Item>
        
        let itemCompte = 
            <Menu.Item key="5" style={{float: 'right'}}>
                {/* icone     */}
                <Link to='/dashboard' className="customclass" >Mon Compte</Link>
        
             </Menu.Item>

        let itemPanier = 
            <Menu.Item key="6" style={{float: 'right'}}>
                {/* icone     */}
                <Link to='/basket' className="customclass" >panier</Link>

            </Menu.Item>

        items=[itemLogout, itemCompte, itemPanier];
            
    } else {
        items = 
            <Menu.Item key="4" style={{float: 'right'}}>
                <Link to='/login' className="customclass" >S'inscrire / Se connecter</Link>
            </Menu.Item>
    }

  return (
 
    <Menu className='Menu' theme="dark" style={{backgroundColor: '#1e272e'}} mode="horizontal" defaultSelectedKeys={['2']}>

        <Menu.Item className='logo' key="1">
            <Link to='/' className="customclass" style={{fontSize: 20}}>Masques.org</Link>
        </Menu.Item>
        <Menu.Item key="2" className="menuItem">
            <Link to='/' className="customclass">Accueil</Link> 
        </Menu.Item>
        <Menu.Item key="3">
            <Link to='/map' className="customclass" >Fabricants</Link>
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
        deleteToken: function(){
            dispatch({type: 'deleteToken'})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
