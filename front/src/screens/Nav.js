import React from 'react';
import '../App.css';
import {Menu, Row} from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'



function Nav(props) {

    let items;

    if(props.token){
        let itemLogout = 
            <Menu.Item key="4" style={{float: 'right'}}>

                    <Link onClick={()=>props.deleteToken()} to='/' className="customclass" >Logout</Link>
                
            </Menu.Item>
        
        let itemCompte = 
            <Menu.Item key="5" style={{float: 'right'}}>
                {/* icone     */}
                <Link to='/screendashboard' className="customclass" >Mon Compte</Link>
        
             </Menu.Item>

        let itemPanier = 
            <Menu.Item key="6" style={{float: 'right'}}>
                {/* icone     */}
                <Link to='/screenbasket' className="customclass" >panier</Link>

            </Menu.Item>

        items=[itemLogout, itemCompte, itemPanier];
            
    } else {
        items = 
            <Menu.Item key="4" style={{float: 'right'}}>
                <Link to='/screenlogin' className="customclass" >S'inscrire / Se connecter</Link>
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
            <Link to='/screenmap' className="customclass" >Fabricants</Link>
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
