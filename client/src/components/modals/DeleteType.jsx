import React from 'react';
import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Context } from '../..';
import { deleteType, fetchTypes, fetchDevices } from '../../http/deviceAPI';

const DeleteType = ({ show, onHide, type }) => {
   const { device } = useContext(Context)
   const clickDeleteType = (name) => {
      deleteType(name).then(data => {
         fetchDevices(null, null, 1, 6).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setLimit(6)
         })
         fetchTypes().then(data => {
            device.setTypes(data)
         })
         onHide()
         alert(data)
      })
   }
   return (
      <Modal show={show} onHide={onHide}>
         <Modal.Header closeButton>
            <Modal.Title>{`Вы уверены, что хотите удалить ${type.name} из списка типов устройств?`} </Modal.Title>
         </Modal.Header>
         <Modal.Body>После нажатия на кнопку "УДАЛИТЬ", вы не сможете восстановить этот тип и связанные с ним товары</Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
               Закрыть
            </Button>
            <Button variant="danger" onClick={() => clickDeleteType(type.name)}>
               УДАЛИТЬ
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default DeleteType;