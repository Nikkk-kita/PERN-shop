import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import React, { useContext } from 'react';
import { GrFormClose } from 'react-icons/gr'
import { Card, Form, Badge } from 'react-bootstrap'
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import DeleteBrand from './modals/DeleteBrand';

const BrandBar = observer(() => {
   const { device, user } = useContext(Context)
   const [deleteBrandVisibleArray, setDeleteBrandVisibleArray] = useState(device.brands.map(e => e = false))
   const role = jwtDecode(localStorage.getItem('token')).role
   const onHide = (idx) => {
      setDeleteBrandVisibleArray([...deleteBrandVisibleArray.slice(0, idx), false, ...deleteBrandVisibleArray.slice(idx + 1)])
   }
   const onShow = (idx) => {
      setDeleteBrandVisibleArray([...deleteBrandVisibleArray.slice(0, idx), true, ...deleteBrandVisibleArray.slice(idx + 1)])
   }
   return (
      <Form className='d-flex flex-wrap'>
         {device.brands.map((brand, idx) =>
            <Card
               style={{ cursor: 'pointer' }}
               key={brand.id}
               className='flex-row p-2'
               border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
            >
               <div onClick={() => device.setSelectedBrand(brand)}>{brand.name}</div>
               {role === "ADMIN" && user.isAuth ?
                  <>
                     <Badge
                        bg="danger"
                        className='p-1 ms-2'
                        onClick={() => onShow(idx)}>
                        <GrFormClose size={18} />
                     </Badge>
                     <DeleteBrand
                        show={deleteBrandVisibleArray[idx]}
                        onHide={() => onHide(idx)}
                        brand={brand} />
                  </>
                  : ''
               }
            </Card>)}
         <Card
            style={{ cursor: 'pointer' }}
            className="p-2"
            border={device.selectedBrand.id === undefined ? 'primary' : 'light'}
            onClick={() => device.setSelectedBrand({})}
         >
            Все устройства
         </Card>
      </Form>
   );
})

export default BrandBar;