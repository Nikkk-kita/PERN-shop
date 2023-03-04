import { ADMIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, DEVICE_ROUTE, REGISTRATION_ROUTE } from "./consts"
import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import DevicePage from "./pages/DevicePage"
import Shop from "./pages/Shop"

export const authRoutes = [
   {
      path: ADMIN_ROUTE,
      element: <Admin />,
   },
   {
      path: BASKET_ROUTE,
      element: <Basket />,
   },
]

export const publicRoutes = [
   {
      path: SHOP_ROUTE,
      element: <Shop />,
   },
   {
      path: LOGIN_ROUTE,
      element: <Auth />,
   },
   {
      path: REGISTRATION_ROUTE,
      element: <Auth />,
   },
   {
      path: DEVICE_ROUTE + '/:id',
      element: <DevicePage />,
   },
]

