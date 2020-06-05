import React, { useState } from 'react';
import '../App.css';
import { Row, Col, Card, Button } from 'antd';
import GoogleMapReact from 'google-map-react';
import 'antd/dist/antd.css';
import Nav from './Nav'


function ScreenMap() {

  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);

  return (

    <div>

      <Nav />

      <div className="Map" > 
      <Button style={{backgroundColor : '#E23D70', borderRadius: 5, boxShadow: '0px 3px 3px 0px black'}}>Chercher les fabricants autour de moi</Button>
      <div style={{ height: '50vh', width: '50%', marginTop: 30}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA6lFML5Gv6tvWgNl0X7kXn6X1uMQyzX8o' }}
          defaultCenter={center}
          defaultZoom={zoom}
        
        />
      </div>
      </div>
    </div>
  );
}

export default ScreenMap;
