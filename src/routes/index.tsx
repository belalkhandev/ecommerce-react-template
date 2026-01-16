import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Categories from '../pages/Categories';
import Cart from '../pages/Cart';
import Compare from '../pages/Compare';
import Checkout from '../pages/Checkout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import UserDashboard from '../pages/Dashboard/UserDashboard';
import OrderList from '../pages/Dashboard/Orders/OrderList';
import OrderDetails from '../pages/Dashboard/Orders/OrderDetails';
import Profile from '../pages/Dashboard/Profile';
import ChangePassword from '../pages/Dashboard/ChangePassword';
import Addresses from '../pages/Dashboard/Addresses';
import Wishlist from '../pages/Dashboard/Wishlist';
import CreateQuotation from '../pages/Quotation/CreateQuotation';
import QuotationList from '../pages/Quotation/QuotationList';
import QuotationDetails from '../pages/Quotation/QuotationDetails';
import About from '../pages/About';
import Contact from '../pages/Contact';
import FAQ from '../pages/FAQ';
import Returns from '../pages/Returns';
import Shipping from '../pages/Shipping';
import Support from '../pages/Support';
import NotFound from '../pages/NotFound';
import ErrorBoundary from '../components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary><NotFound /></ErrorBoundary>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <ProductDetails />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'compare',
        element: <Compare />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      // Dashboard Routes
      {
        path: 'dashboard',
        element: <UserDashboard />,
      },
      {
        path: 'orders',
        element: <OrderList />,
      },
      {
        path: 'orders/:id',
        element: <OrderDetails />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
      {
        path: 'addresses',
        element: <Addresses />,
      },
      {
        path: 'wishlist',
        element: <Wishlist />,
      },
      {
        path: 'quotations',
        element: <QuotationList />,
      },
      {
        path: 'quotations/create',
        element: <CreateQuotation />,
      },
      {
        path: 'quotations/:id',
        element: <QuotationDetails />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'faq',
        element: <FAQ />,
      },
      {
        path: 'returns',
        element: <Returns />,
      },
      {
        path: 'shipping',
        element: <Shipping />,
      },
      {
        path: 'support',
        element: <Support />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
