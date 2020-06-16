import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import { Popover} from 'antd';
import 'antd/dist/antd.css';


const Marker = (props) => {
    const { color, username, urlAvatar, lien, articles } = props;
    let link = '/login'

    let articlesDisplay = [];
    articles.map((item, i)=>{
        if(lien === '/fabricant/')
            link = lien + item._id;

        articlesDisplay.push(
            <Link to={link}><p style={{color: '#E23D70', marginTop: 5, marginBottom: 5}}>{item.description}</p></Link>
        )
    });

    const content = (
        
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <img alt="avatar" style={{width: 50, height: 50, borderRadius: '50%'}} src={urlAvatar} />
            {articlesDisplay}
        </div>
      );

    return (
        
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