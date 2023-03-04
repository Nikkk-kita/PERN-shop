import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Card, Image, Button } from 'react-bootstrap';
import star from '../assets/star.png'
import { useNavigate } from "react-router-dom"
import { DEVICE_ROUTE } from '../consts';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '..';
import jwtDecode from 'jwt-decode';
import DeleteDevice from './modals/DeleteDevice';



const DeviceItem = observer(({ oneDevice }) => {
   const { device, user } = useContext(Context)
   const [deleteDeviceVisible, setDeleteDeviceVisible] = useState(false)
   const role = jwtDecode(localStorage.getItem('token')).role
   const navigate = useNavigate()
   const onHide = () => {
      setDeleteDeviceVisible(false)
   }


   return (
      <Col md={3} className='mt-3' >
         <Card onClick={() => navigate(DEVICE_ROUTE + '/' + oneDevice.id)} style={{ width: 150, cursor: 'pointer' }} border={'light'}>
            <Image width={150} height={150} src={'http://localhost:5000/' + oneDevice.img} />
            <div className='text-black-50 mt-2 d-flex justify-content-between'>
               <div>{device.brands.find(e => e.id === oneDevice.brandId).name}</div>
               <div className='d-flex align-items-center'>
                  <div>{oneDevice.rating}</div>
                  <Image width={18} src={star} />
               </div>
            </div>
            <div>
               {oneDevice.name}
            </div>
         </Card>
         {role === "ADMIN" && user.isAuth
            ?
            <>
               <Button className='mt-1'
                  size='sm'
                  variant='danger'
                  onClick={() => setDeleteDeviceVisible(true)}
               >
                  Удалить
               </Button>
               <DeleteDevice
                  show={deleteDeviceVisible}
                  oneDevice={oneDevice}
                  onHide={onHide}
               />
            </>
            : ''
         }
      </Col>
   );
});

export default DeviceItem;