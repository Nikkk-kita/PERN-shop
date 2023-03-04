import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '../index';
import { SHOP_ROUTE } from '../consts';
import { authRoutes, publicRoutes } from '../routes';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
   const { user } = useContext(Context)

   return (
      <Routes>
         {user.isAuth && authRoutes.map(({ path, element }) =>
            <Route key={path} path={path} element={element} exact />
         )}
         {publicRoutes.map(({ path, element }) =>
            <Route key={path} path={path} element={element} exact />
         )}
         <Route path='*' element={<Navigate to={SHOP_ROUTE} />} />
      </Routes>
   );
})

export default AppRouter;