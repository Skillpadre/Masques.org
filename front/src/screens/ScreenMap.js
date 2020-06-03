import React from 'react';
import '../App.css';
import { Row, Col, Card, Button } from 'antd';
import 'antd/dist/antd.css';
import Nav from './Nav'


function ScreenMap() {
  return (
    <div>
      <Nav />

      <body>
        <div className="Map">

          <Button style={{ backgroundColor: "purple", fontColor: "white", marginBottom: "10px" }}>Chercher les fabricants autour de moi</Button>

          <iframe
            width="600"
            height="450"
            frameborder="0" style={{ border: 0 }}
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA6lFML5Gv6tvWgNl0X7kXn6X1uMQyzX8o&q=Lyon+France" allowfullscreen>
          </iframe>

        </div>



      </body>
    </div>
  );
}

export default ScreenMap;
