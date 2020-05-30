import React from 'react';
import '../App.css';
import { Row, Col, Card, Button} from 'antd';
import 'antd/dist/antd.css';
import Nav from './Nav'


function ScreenMap() {
 return (
   <div>
 <Nav/>

<body>
    <div className="Map">

    <Button style={{backgroundColor:"purple"}}>Chercher les fabricants autour de moi</Button>


    </div>


</body>
</div>
  );
}

export default ScreenMap;
