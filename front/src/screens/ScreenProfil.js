import React, {useState, useEffect} from 'react';
import '../App.css';

import {connect} from 'react-redux'

import { Layout, Row, Col, Input, AutoComplete, Button} from 'antd';
import 'antd/dist/antd.css';

import Nav from './Nav'
import FooterComp from './Footer';

const { Content } = Layout;

function ScreenProfil(props) {

    const [value, setValue] = useState('');

    const [infoLN, setInfoLN] = useState('');
    const [infoFN, setInfoFN] = useState('');
    const [infoAddress, setInfoAddress] = useState('');
    const [infoZip, setInfoZip] = useState('');
    const [infoCity, setInfoCity] = useState('');
    const [infoTel, setInfoTel] = useState('');
    const [infoCoord, setInfoCoord] = useState([]); // [longitude, latitude]

    const [changementOk, setChangementOk] = useState();

    const [avatar, setAvatar] = useState('');
    const [changAvatar, setChangAvatar] = useState();

    const [option, setOption] = useState([]);



    useEffect(() => {
        // On charge les info pour les afficher
        console.log(props.user);
        async function loadInfo() {
            const rawResponse = await fetch(`/users/loadinfo/${props.user.token}`);
            const response = await rawResponse.json();

            if(response.user){
                setInfoLN(response.user.lastName);
                setInfoFN(response.user.firstName);
                setInfoAddress(response.user.address);
                setInfoZip(response.user.zip_code);
                setInfoCity(response.user.city);
                setInfoTel(response.user.tel);
                setAvatar(response.user.avatar);

                if(response.user.coordinates){
                    setInfoCoord(response.user.coordinates);
                }
                
            }
            
            
        }
        loadInfo();
    }, [props.user.token]);

    

    
    const handleClickChangement = async () => {
        let values = {nom : infoLN, prenom: infoFN, telephone: infoTel, adresse: infoAddress, zipcode: infoZip, city: infoCity, coord: infoCoord};

        const data = await fetch('/users/update-info/' + props.user.token, {
            method: 'POST',
            headers: {'Content-Type':'application/Json'},
            body: JSON.stringify(values)
        });

        const response = await data.json();

        setInfoLN(response.user.lastName);
        setInfoFN(response.user.firstName);
        setInfoAddress(response.user.address);
        setInfoZip(response.user.zip_code);
        setInfoCity(response.user.city);
        setInfoTel(response.user.tel);
        setAvatar(response.user.avatar);

        setChangementOk(<p style={{color: '#52C41A', margin: 20}}>Vos changement on bien été pris en compte !</p>)

    };

    var fileSelectedHandler= event =>{
        console.log(event.target.files[0]);
        setAvatar(event.target.files[0])
      }

    const handleClickAvatar = async () =>{

        var data = new FormData();
        data.append('avatar', avatar);

        var rawResponse = await fetch('/users/add-avatar/'+ props.user.token, {
            method: 'POST',
            body: data
        });

        var response = await rawResponse.json();
        
        let newAvatarUser = props.user;
        newAvatarUser.urlAvatar = response.user.avatar;//J'ajoute un nouveau Url à l'avatar du user

        props.addUser(newAvatarUser);
        setAvatar(response.user.avatar)

        localStorage.setItem('user', JSON.stringify(newAvatarUser));
        setChangAvatar(<p style={{color: '#52C41A', margin : 20}}>Le changement de votre avatar à bien été effectué !</p>)

       
    }

    // Fonction au changement de l'input adresse
    function onChangeAddress(text){
        //setInfoAddress(text);
        search(text)
    }
    // Fonction de recherche pour autocomplétion
    async function search(text) {
        let rawResponse = await fetch('https://api-adresse.data.gouv.fr/search/?q=' + text)
        let response = await rawResponse.json();
        console.log(response.features);

        let responseList = [];

        response.features.map((item, i)=>{
            let type;
            if(item.properties.type === 'municipality'){
                type = 'Commune'
            } else if(item.properties.type === 'housenumber'){
                type = 'Numéro'
            } else if(item.properties.type === 'street'){
                type = 'Rue'
            } else if(item.properties.type === 'locality'){
                type = 'Lieu-dit'
            }
            responseList.push(renderItem(item.properties.context, item.properties.label, type, item.geometry.coordinates, item.properties.city, item.properties.postcode ,i));
        });
        setOption(responseList);
    }


    const renderItem = (context, label, type, coord, city, zipcode, i) => ({
        label: (
            
          <div
            id={'AC-div1-' + i}
            className={'AC-div1'}
            onClick={e=>handleClickAutoComplet(e, label, coord, city, zipcode, i)}
            style={{
            display: 'flex',
            flexDirection: 'column',
              
            }}
          >
              <div id={'AC-div2-' + i} className={'AC-div2'} style={{display: 'flex', justifyContent:'space-between'}}>
                  <h3 id={'AC-label-' + i} className={'AC-label'}>{label}</h3> 
                  <h3 id={'AC-type-' + i} className={'AC-type'}>{type}</h3>
              </div>
            
            <h4 id={'AC-h4-' + i} className={'AC-h4'}>{context}</h4>
          
          </div>
        ),
      });

      // Selection de la bonne adresse dans l'autocomplétion
      function handleClickAutoComplet(e, label, coord, city, zipcode, i) {
        console.log('click')
        
        console.log(label);
        console.log(coord)
        setInfoAddress(label);
        setInfoCoord(coord)  
        setInfoCity(city)
        setInfoZip(zipcode)      
    }


    let urlImg;

    if(avatar === ''){
        urlImg = "https://res.cloudinary.com/dmvudxnlz/image/upload/v1591715224/noavatar_wceh4i.png"
    } else {
        urlImg = avatar;
    }
    
    

    return (
        <Layout style={{height: 'auto', backgroundColor: 'white'}}className="layout">
           
            <Nav />

            <Content style={{ padding: '0 50px', margin: '40px 0', display: 'flex', flexDirection: 'column'}} className="Profil-page" >

                <Row><h1 style={{fontWeight: 700}}>Mon Compte</h1></Row>

                <Row justify= 'center' align='middle'>
                    <Col md={{span: 6}} sm={{span: 22}} offset={-3}>
                        <h3 style={{fontSize: 20, fontWeight: 700}}>Mon avatar</h3>

                        <Input type='file' onChange={fileSelectedHandler} style={{margin: 20}}/>
                        
                        <div><img style={{width: 150, height: 150, borderRadius: '50%'}} src={urlImg}/></div>

                        {changAvatar}
                        
                        <Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 40}} type="primary" onClick={() => handleClickAvatar()}>
                            Télécharger
                        </Button>
                    </Col>
                    <Col md={{span: 8}} sm={{span: 22}}offset={3}>
                        
                        <h3 style={{fontSize: 20, fontWeight: 700}}>Mes informations</h3>

                        <Input onChange={e => setInfoFN(e.target.value)} value={infoFN} placeholder='Votre prénom' style={{marginTop: 20}}/>
                        <Input onChange={e => setInfoLN(e.target.value)} value={infoLN} placeholder='Votre nom' style={{marginTop: 20}}/>
                        <Input onChange={e => setInfoTel(e.target.value)} value={infoTel} placeholder='Votre numéro de téléphone' style={{marginTop: 20}}/>
                        <Input readOnly={true} value={infoAddress} placeholder='Votre adresse' style={{marginTop: 20}}/>

                        {/* {infoAddress} */}

                        <AutoComplete
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownMatchSelectWidth={500}
                            style={{
                            width: '100%',
                            }}
                            options={option}
                        >
                            <Input.Search onChange={e => onChangeAddress(e.target.value)} value={infoAddress} placeholder='Chercher une adresse' style={{marginTop: 20}}/>
                            {/* <Input.Search allowClear={true} size="large" placeholder="Entrez votre adresse" value={infoAddress} onChange={e=>onChangeAddress(e.target.value)} /> */}
                        </AutoComplete>


                        {/* <Input onChange={e => setInfoAddress(e.target.value)} value={infoAddress} placeholder='Votre addresse' style={{marginTop: 20}}/> */}
                        
                        {changementOk}

                        <Button style= {{ borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 40}} type="primary" onClick={() => handleClickChangement()}>
                            Valider mes changement
                        </Button>
                   
                    </Col>
                </Row>

           

            </Content>
            <FooterComp/>
        </Layout>
    )
}

function mapStateToProps(state) {
    return { user: state.user }
}

function mapDispatchToProps(dispatch){
    return {
        addUser: function(user){
            dispatch( {type: 'addUser', user: user} )
          }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
   )(ScreenProfil);