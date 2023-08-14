import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Home  from './components/Home';
import Welcome from './components/Welcome';
import  Redirect  from './components/authorization/Redirect';
import Logout from './components/authorization/Logout';
import Register from './components/authorization/Register';
import PrivateRoute from './authorization/PrivateRoute';
import BoardPage from './components/kanban/BoardPage';




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
          <Route path='/register' element={<Register />} />

          <Route path='/board/:boardId' element={<PrivateRoute/>}>
            <Route path='/board/:boardId' element={<BoardPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

    
    </div>
  );
}

export default App;
