import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap'
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '..';
import { useEffect } from 'react';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import Pages from '../components/Pages';

const Shop = observer(() => {
   const { device } = useContext(Context)
   useEffect(() => {
      fetchTypes().then(data => device.setTypes(data))
      fetchBrands().then(data => device.setBrands(data))
      fetchDevices(null, null, 1, 6).then(data => {
         device.setDevices(data.rows)
         device.setTotalCount(data.count)
         device.setLimit(6)
      })
   }, [])

   useEffect(() => {
      fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 6).then(data => {
         device.setDevices(data.rows)
         device.setTotalCount(data.count)
      })
   }, [device.page, device.selectedType, device.selectedBrand])
   return (
      <div>
         <Container>
            <Row className='mt-2 d-flex'>
               <Col md={3}>
                  <TypeBar />
               </Col>
               <Col md={9}>
                  <BrandBar />
                  <DeviceList />
                  <Pages />
               </Col>
            </Row>
         </Container>
      </div>
   );
})

export default Shop;