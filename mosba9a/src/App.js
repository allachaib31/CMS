import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './screens/home';
import Auth from './screens/auth';
import { Admin, Result, StartResponse, Welcome } from './components';
import HomeAdmin from './screens/homeAdmin';
import AuthAdmin from './screens/authAdmin';

function App() {
  return (
    <div dir="rtl" lang="ar" className="fontCairo">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}>
            <Route path='/' element={<Welcome />}/>
            <Route path='/start' element={<StartResponse />}/>
            <Route path='/result' element={<Result />}/>
          </Route>
          <Route exact path='/admin' element={<HomeAdmin />}>
            <Route path='/admin' element={<Admin />}/>
          </Route>
          <Route exact path='/authAdmin' element={<AuthAdmin />}/>
          <Route exact path='/auth' element={<Auth />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
