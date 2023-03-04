import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Image, Row, Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import bigStar from '../assets/bigStar.png'
import { fetchOneDevice } from '../http/deviceAPI';


const DevicePage = () => {
   const [device, setDevice] = useState({ info: [] })
   const { id } = useParams()
   useEffect(() => {
      fetchOneDevice(id).then(data => setDevice(data))
   }, [])
   return (
      <Container className='mt-3'>
         <Row>
            <Col md={4}>
               <Image width={300} height={300} src={'http://localhost:5000/' + device.img}></Image>
            </Col>
            <Col md={4}>
               <div className='d-flex flex-column align-items-center justify-content-center'>
                  <h2>{device.name}</h2>
                  <div
                     className='d-flex justify-content-center align-items-center '
                     style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
                  >
                     <div>{device.rating}</div>
                  </div>
               </div>
            </Col>
            <Col md={4}>
               <Card
                  className='d-flex flex-column justify-content-around align-items-center '
                  style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}>
                  <h3>От: {device.price} руб.</h3>
                  <Button variant='outline-dark'>Добавить в корзину</Button>
               </Card>
            </Col>
         </Row>
         <Row className='d-flex flex-column m-3'>
            <h2>Характеристики</h2>
            {device.info.map((info, idx) =>
               <Row key={info.id} style={{ background: idx % 2 === 0 ? 'lightgray' : 'transparent', padding: 14 }}>
                  {info.title}: {info.description}
               </Row>
            )}
         </Row>
      </Container>
   );
};

export default DevicePage;