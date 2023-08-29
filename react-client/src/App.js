import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Redirect from './components/authorization/Redirect';
import Logout from './components/authorization/Logout';
import Register from './components/authorization/Register';
import PrivateRoute from './authorization/PrivateRoute';
import BoardPage from './components/kanban/BoardPage';
import TimelinePage from './components/timeline/TimelinePage';




function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/redirect' element={<Redirect />} />
          <Route path='/authorized' element={<Redirect />} />

          <Route path='/' element={<Profile />} />

          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />

          <Route path='/board/:boardId' element={<PrivateRoute />}>
            <Route path='/board/:boardId' element={<BoardPage />} />
          </Route>

          <Route path='/timeline/:timelineId' element={<PrivateRoute />}>
            <Route path='/timeline/:timelineId' element={<TimelinePage />} />
          </Route>

          <Route path='/test' element={<TimelinePage />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
