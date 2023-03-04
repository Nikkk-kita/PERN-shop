import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '..';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
   const { device } = useContext(Context)

   return (
      <Row className='d-flex'>
         {device.devices.map(oneDevice =>
            <DeviceItem
               key={oneDevice.id}
               oneDevice={oneDevice}
            />
         )}
      </Row>
   );
})

export default DeviceList;