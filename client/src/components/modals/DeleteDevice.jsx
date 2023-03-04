import React from 'react';
import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Context } from '../..';
import { deleteOneDevice } from '../../http/deviceAPI';
import { fetchDevices } from '../../http/deviceAPI';

const DeleteDevice = ({ show, onHide, oneDevice }) => {
   const { device } = useContext(Context)
   const deleteDevice = (id) => {
      deleteOneDevice(id).then(data => {
         fetchDevices(null, null, 1, 6).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setLimit(6)
         })
         onHide()
         alert(data)
      })
   }

   return (
      <Modal show={show} onHide={onHide}>
         <Modal.Header closeButton>
            <Modal.Title>{`Вы уверены, что хотите удалить ${oneDevice.name} из каталога?`} </Modal.Title>
         </Modal.Header>
         <Modal.Body>После нажатия на кнопку "УДАЛИТЬ", вы не сможете восстановить этот товар</Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
               Закрыть
            </Button>
            <Button variant="danger" onClick={() => deleteDevice(oneDevice.id)}>
               УДАЛИТЬ
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default DeleteDevice;