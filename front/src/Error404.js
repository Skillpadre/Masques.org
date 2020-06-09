import React from 'react'
import { Link } from 'react-router-dom';

import { Result, Button } from 'antd';

export default function Error404(){

  return(
    <Result
      style={{marginTop:40}}
      status="404"
      title="404"
      subTitle="Désolé, la page que vous avez demandé n'existe pas."
      extra={<Link to='/'><Button style= {{width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary">Back Home</Button></Link>}
    />
  )

}
  
 
