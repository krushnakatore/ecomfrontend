import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Homepage } from './pages/Homepage';
import { About } from './pages/About';
import { Pagenotfound } from './pages/Pagenotfound';
import { Contact } from './pages/Contact';
import { Policy } from './pages/Policy';
import { Register } from './pages/Auth/Register';
import { Login } from './pages/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dashboard } from './pages/User/Dashboard';
import { PrivateRoutes } from './components/Routes/PrivateRoutes';
import { Forgotpassword } from './pages/Auth/Forgotpassword';
import { AdminRoutes } from './components/Routes/AdminRoutes';
import { Admin } from './pages/AdminDashboard/Admin';
import { CreateCategory } from './pages/AdminDashboard/CreateCategory';
import { CreateProduct } from './pages/AdminDashboard/CreateProduct';
import { Users } from './pages/AdminDashboard/Users';
import { Orders } from './pages/User/Orders';
import { Profile } from './pages/User/Profile';
import { Products } from './pages/AdminDashboard/Products';
import { UpdateProduct } from './pages/AdminDashboard/UpdateProduct';
import { Search } from './pages/User/Search';
import { ProductDetails } from './pages/User/ProductDetails';
import { Categories } from './pages/User/Categories';
import { CategoryList } from './pages/User/CategoryList';
import { CartPage } from './pages/User/CartPage';
import { AdminOrders } from './pages/AdminDashboard/AdminOrders';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug" element={<CategoryList />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<Admin />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />

          <Route
            path="admin/update-product/:slug"
            element={<UpdateProduct />}
          />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
