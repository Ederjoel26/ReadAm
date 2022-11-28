import './styles/App.css';
import { Login } from './account/Login'
import { Feed } from './views/Feed';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './account/Register';
import { ValidationRegister } from './account/ValidationRegister';
import { RecoverPassword } from './account/RecoverPassword';
import { ChangePassword } from './account/ChangePassword';
import { Error } from './views/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={ <Login/> }></Route>
        <Route path='/feed' element={ <Feed/> }></Route>
        <Route path='/register' element={ <Register/> }></Route>
        <Route path='/validation' element={ <ValidationRegister/> }></Route>
        <Route path='/recover' element={ <RecoverPassword/> }></Route>
        <Route path='/change-pass' element= { <ChangePassword/> }></Route>
        <Route path='*' element={ <Error/> }></Route>
      </Routes>
    </Router>
  );
}

export default App;
