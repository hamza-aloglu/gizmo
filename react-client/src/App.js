import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Home  from './components/Home';
import Welcome from './components/Welcome';
import  Redirect  from './components/Redirect';
import PrivateRoute from './authorization/PrivateRoute';
import Logout from './components/Logout';




function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/redirect' element={ <Redirect /> } />
          <Route path='/authorized' element={ <Redirect /> } /> 
          <Route path='/home' element={ <Home /> } />

          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/' element={<Welcome/>}/>
          </Route>

          <Route path='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>

    
    </div>
  );
}

export default App;
