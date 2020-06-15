import React, {useState} from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import {Card, Popover, Button, List, Avatar, Divider, Space, Modal} from 'antd';
import 'antd/dist/antd.css';


const Marker = (props) => {
    const { color, username, id, urlAvatar, description, lien } = props;

    const content = (
        
          <List.Item key={id} style={{textAlign: 'center'}}>
            <Card hoverable title={username} bodyStyle={{width: 50, height: 50}} style={{margin : '20px 10px'}}>

            <Card.Meta title={username} avatar={<Avatar src={urlAvatar}/>}/>

            {/* <Button onClick={showModal} style={{color: '#E23D70', border: 'white'}}>Description</Button> */}

            <Divider/>
            <Card.Meta description={description}/>
            {/* <Card.Meta description={"Quantité dispo: " + item.stock}/>
            <Card.Meta description={"Qualité: " + item.quality}/>
            <Card.Meta description={"Couleurs: " + item.colors.join()}/>
            <Card.Meta description={"Matières: " + item.material.join()}/> */}
        
            <Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary"><Link to={lien}>Choisir cet article</Link></Button>
            </Card>
            {/* <Modal title="Description de l'offre :"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
            >
            <p>{item.description}</p>
            
            </Modal> */}
        </List.Item>
      
        
      );

    return (
        // <Popover className="marker" content={content} style={{ backgroundColor: color, cursor: 'pointer'}} title={username}>
        // </Popover>
        <div>
        <Popover
            content={content}
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={username}
        />
        <div className="pulse" />
      </div>
        
    );
  };

  export default Marker;