import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Home  from './components/Home';
import Welcome from './components/Welcome';
import  Redirect  from './components/Redirect';
import PrivateRoute from './authorization/PrivateRoute';




function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/redirect' element={ <Redirect /> } />
          <Route path='/authorized' element={ <Redirect /> } /> 
          <Route path='/home' element={ <Home /> } />

          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Welcome/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

    
    </div>
  );
}

export default App;
