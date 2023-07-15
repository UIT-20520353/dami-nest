import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import About from '~/pages/About';
import Cart from '~/pages/Cart';
import Hanbook from '~/pages/Hanbook';
import ProductsPage from '~/pages/ProductsPage';
import DetailProduct from '~/pages/DetailProduct';
import Shipping from '~/pages/Shipping';
import { ProtectedRoute } from '~/components';
import Payment from '~/pages/Payment';
import Profile from '~/pages/Profile';
import LayoutProfile from '~/pages/LayoutProfile';
import Purchases from '~/pages/Purchases';

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={<LayoutProfile />}>
          <Route index={true} element={<Profile />} />
          <Route path={'purchases'} element={<Purchases />} />
        </Route>
        <Route path={'/register'} element={<Register />} />
        <Route path={'/about'} element={<About />} />
        <Route path={'/checkout'}>
          <Route path={'cart'} element={<Cart />} />
          <Route
            path={'shipping'}
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path={'payment'}
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={'/hanbook'} element={<Hanbook />} />
        <Route path={'/products'} element={<ProductsPage />} />
        <Route path={'/products/:id'} element={<DetailProduct />} />
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} closeOnClick={false} draggable={false} />
    </div>
  );
}

export default App;
