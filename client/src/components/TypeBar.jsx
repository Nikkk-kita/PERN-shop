import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext, useState } from 'react';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';
import { Badge } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import DeleteType from './modals/DeleteType';
import { GrFormClose } from 'react-icons/gr';

const TypeBar = observer(() => {
   const { device, user } = useContext(Context)
   const [deleteTypeVisibleArray, setDeleteTypeVisibleArray] = useState(device.types.map(e => e = false))
   const role = jwtDecode(localStorage.getItem('token')).role
   const onHide = (idx) => {
      setDeleteTypeVisibleArray([...deleteTypeVisibleArray.slice(0, idx), false, ...deleteTypeVisibleArray.slice(idx + 1)])
   }
   const onShow = (idx) => {
      setDeleteTypeVisibleArray([...deleteTypeVisibleArray.slice(0, idx), true, ...deleteTypeVisibleArray.slice(idx + 1)])
   }

   return (
      <ListGroup className='d-flex'>
         {device.types.map((type, idx) =>
            <ListGroup.Item
               style={{ cursor: 'pointer' }}
               className='d-flex justify-content-between'
               key={type.id}
               active={type.id === device.selectedType.id}
               onClick={() => device.setSelectedType(type)}
            >
               <div>{type.name}</div>
               {role === "ADMIN" && user.isAuth ?
                  <>
                     <Badge
                        bg="danger"
                        className='p-1 ms-2'
                        onClick={() => onShow(idx)}
                     >
                        <GrFormClose size={18} />
                     </Badge>
                     <DeleteType
                        show={deleteTypeVisibleArray[idx]}
                        onHide={() => onHide(idx)}
                        type={type} />
                  </>
                  : ''
               }
            </ListGroup.Item>
         )
         }
         <ListGroup.Item
            style={{ cursor: 'pointer' }}
            onClick={() => device.setSelectedType({})}
            active={device.selectedType.id === undefined}
         >
            Все устройства
         </ListGroup.Item>
      </ListGroup >
   );
}
)



export default TypeBar;