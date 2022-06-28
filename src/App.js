import './App.css';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss'
import Header from './components/header';
import Favorites from './pages/favorites';
import { ThemeProvider } from './context/theme.context';
import { AuthProvider } from './context/auth.context';
import { Routes, Route } from "react-router-dom";
import Authentication from './pages/authentication';
import RequireAuth from './auth/auth.component';
import Privacy from './pages/privacy/privacy';
import Terms from './pages/terms/terms';
import Cookies from './pages/cookies/cookies';

function App() {

  return (

    <ThemeProvider>
      <AuthProvider>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/authentication' element={<Authentication></Authentication>}></Route>
          <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}></Route>
          <Route path='/favorites' element={<RequireAuth><Favorites></Favorites></RequireAuth>}></Route>
          <Route path='/privacy' element={<Privacy></Privacy>}></Route>
          <Route path='/terms' element={<Terms></Terms>}></Route>
          <Route path='/cookies' element={<Cookies></Cookies>}></Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>

  );
}

export default App;
