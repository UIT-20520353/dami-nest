import { Route, Routes } from 'react-router-dom';
import Home from '~/pages/Home';
import About from '~/pages/About';
import Hanbook from '~/pages/Hanbook';
import ProductsPage from '~/pages/ProductsPage';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/about'} element={<About />} />
      <Route path={'/hanbook'} element={<Hanbook />} />
      <Route path={'/products'} element={<ProductsPage />} />
    </Routes>
  );
}

export default App;
