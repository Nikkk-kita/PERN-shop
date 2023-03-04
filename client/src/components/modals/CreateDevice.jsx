import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap';
import { Context } from '../..';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';

const CreateDevice = observer(({ show, onHide }) => {
   const { device } = useContext(Context)
   const [name, setName] = useState('')
   const [price, setPrice] = useState(0)
   const [file, setFile] = useState(null)
   const [info, setInfo] = useState([])

   useEffect(() => {
      fetchTypes().then(data => device.setTypes(data))
      fetchBrands().then(data => device.setBrands(data))
   }, [])

   const addInfo = () => {
      setInfo([...info, { title: '', description: '', number: Date.now() }])
   }
   const removeInfo = (number) => {
      setInfo(info.filter(i => i.number !== number))
   }
   const changeInfo = (key, value, number) => {
      setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
   }

   const selectFile = e => {
      setFile(e.target.files[0])
   }

   const addDevice = () => {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', `${price}`)
      formData.append('img', file)
      formData.append('brandId', device.selectedBrand.id)
      formData.append('typeId', device.selectedType.id)
      formData.append('info', JSON.stringify(info))
      createDevice(formData).then(data => onHide())
   }

   return (
      <Modal
         show={show}
         onHide={onHide}
         size="lg"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Добавить устройство
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Dropdown className='mt-2 mb-2'>
                  <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                  <Dropdown.Menu>
                     {device.types.map(type =>
                        <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                     )}
                  </Dropdown.Menu>
               </Dropdown>
               <Dropdown>
                  <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                  <Dropdown.Menu>
                     {device.brands.map(brand =>
                        <Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>
                     )}
                  </Dropdown.Menu>
               </Dropdown>
               <Form.Control className='mt-3' value={name} onChange={e => setName(e.target.value)} placeholder='Введите название устройства' />
               <Form.Control type='number' value={price} onChange={e => setPrice(Number(e.target.value))} className='mt-3' placeholder='Введите стоимость устройства' />
               <Form.Control type='file' onChange={selectFile} className='mt-3' />
               <hr />
               <Button onClick={addInfo} variant='outline-dark'>
                  Добавить новое свойство
               </Button>
               {info.map(i =>
                  <Row key={i.number} className='mt-3'>
                     <Col md={4}>
                        <Form.Control
                           value={i.title}
                           onChange={(e) => changeInfo('title', e.target.value, i.number)}
                           placeholder='Введите название свойства' />
                     </Col>
                     <Col md={4}>
                        <Form.Control
                           value={i.description}
                           onChange={(e) => changeInfo('description', e.target.value, i.number)}
                           placeholder='Введите описание свойства' />
                     </Col>
                     <Col md={4}>
                        <Button onClick={() => removeInfo(i.number)} variant='outline-danger'>Удалить</Button>
                     </Col>
                  </Row>
               )}

            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            <Button variant='outline-success' onClick={addDevice}>Добавить</Button>
         </Modal.Footer>
      </Modal>
   );
});

export default CreateDevice;