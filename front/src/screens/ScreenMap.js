import React, { useState, useEffect } from 'react';
import '../App.css';
import { Row, Col, Card, Button, List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import 'antd/dist/antd.css';
import Nav from './Nav'


function ScreenMap() {

  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);

  const [articleList, setArticleList] = useState([])

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch('/article-list');
      var response = await rawResponse.json();
      setArticleList(response.article)
    }
    loadData()
  }, []);

// var sendIdToBack = async (id) => {
  
//     var rawResponse = await fetch(`/articleId/${id}`);
//     var response = await rawResponse.json();
//     console.log(response)
// }

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




  let buyingList = articleList.map((item, i) => {
    return (

      <List.Item key={i}>
        <Card title={item.modele}>

          <Card.Meta description={item.description} avatar={item.img}>
          </Card.Meta>

          <Card.Meta description={item.price + " €"}>

          </Card.Meta>
        <Button><Link to={`/fabricant/${item._id}`}>Choisir cet article</Link></Button>
        </Card>
      </List.Item>
    )
  })

  // var cardWish = moviesWishList.map((movie,i) => {
  //   return (
  //     <ListGroupItem>
  //       <ListGroupItemText onClick={() => {handleClickDeleteMovie(movie.name)}}>
  //       <img width="25%" src={movie.img} /> {movie.name}
  //       </ListGroupItemText>
  //     </ListGroupItem>
  //   )
  // })

  return (

    <div>

      <Nav />

      <div className="Map" >
        <Button style={{ backgroundColor: '#E23D70', borderRadius: 5, boxShadow: '0px 3px 3px 0px black' }}>Chercher les fabricants autour de moi</Button>
        <div style={{ height: '50vh', width: '50%', marginTop: 30 }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyA6lFML5Gv6tvWgNl0X7kXn6X1uMQyzX8o' }}
            defaultCenter={center}
            defaultZoom={zoom}

          />



        </div>


        <div>

  <h1>Liste des fabricants</h1>
          {buyingList}

        </div>
      </div>
    </div>
  );
}

export default ScreenMap;
