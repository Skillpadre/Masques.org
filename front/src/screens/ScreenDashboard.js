import React from 'react';
import '../App.css';
import { Row, Col, Card, Button, Layout, List, Avatar } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Nav from './Nav'


function ScreenDashboard() {

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
  return (
    <div>
      <Nav />

      <div className="Dashboard-page">
        <Row>
          <Col span={8}>
            <h1>Dashboard</h1>
          </Col>
          <Col span={6}>
            <h2>Bienvenue John !</h2>
          </Col>
          <Col offset={4} span={6}>
            <Button><Link to='/map'>Passer une commande</Link></Button>
          </Col>

        </Row>
        <Row>
          <Col span={10}>
            <h2>Commandes en attente de validation</h2>
            <div id="dashboard-box">

              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />,
  </div>
          </Col>
          <Col span={10}>
            <h2>Historique des commandes</h2>
            <div id="dashboard-box">

              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />,
  </div>
          </Col>
        </Row>



      </div>
    </div>
  );
}

export default ScreenDashboard;
