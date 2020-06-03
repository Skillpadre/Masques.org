import React from 'react';
import '../App.css';
import {Menu} from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';



function Nav() {


  return (
 
    <Menu className='Menu' theme="dark" style={{backgroundColor: '#1e272e'}} mode="horizontal" defaultSelectedKeys={['2']}>

        <Menu.Item className='logo' key="1">
            <Link to='/' className="customclass">Masques.org</Link>
        </Menu.Item>
        <Menu.Item key="2" className="menuItem">
            <Link to='/' className="customclass">Accueil</Link> 
        </Menu.Item>
        <Menu.Item key="3">
            <Link to='/screenmap' className="customclass" >Fabricants</Link>
        </Menu.Item>
        <Menu.Item key="4" style={{float: 'right'}}>
            <Link to='/screenlogin' className="customclass" >S'inscrire / Se connecter</Link>
        </Menu.Item>

    </Menu>

  );
}

export default Nav;
