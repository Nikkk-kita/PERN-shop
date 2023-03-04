import React from 'react';
import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Context } from '../..';
import { deleteBrand, fetchBrands, fetchDevices } from '../../http/deviceAPI';

const DeleteBrand = ({ show, onHide, brand }) => {
   const { device } = useContext(Context)
   const clickDeleteBrand = (name) => {
      deleteBrand(name).then(data => {
         fetchDevices(null, null, 1, 6).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setLimit(6)
         })
         fetchBrands().then(data => {
            device.setBrands(data)
         })
         onHide()
         alert(data)
      })
   }
   return (
      <Modal show={show} onHide={onHide}>
         <Modal.Header closeButton>
            <Modal.Title>{`Вы уверены, что хотите удалить ${brand.name} из списка брендов?`} </Modal.Title>
         </Modal.Header>
         <Modal.Body>После нажатия на кнопку "УДАЛИТЬ", вы не сможете восстановить этот бренд и связанные с ним товары</Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
               Закрыть
            </Button>
            <Button variant="danger" onClick={() => clickDeleteBrand(brand.name)}>
               УДАЛИТЬ
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default DeleteBrand;