import React, { Fragment } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Main from './Pages/Main';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Home from './Pages/Home';
import NavBar from './Components/Navbar';
import NotFound from './Pages/NotFound';
import ClosetsPage from './Pages/Closets';
import CreateCloset from './Pages/CreateCloset';
import CreateClothes from './Pages/CreateClothes';
import Profile from './Pages/Profile';
import SearchPage from './Pages/Search';
import PrivateRoute from './privateRoute'; // Assuming you have a private route component

const App = () => {
  const user = true;
  const location = useLocation();

  return (
    <Fragment>
      {user && 
        location.pathname !== "/" &&
        location.pathname !== '/signup' &&
        location.pathname !== '/login' &&
        location.pathname !== 'not-found' && (
          <Fragment>
            <NavBar userData={location.state ? location.state.userData : null} />
          </Fragment>
        )
      }
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/closet/:id" element={<ClosetsPage/>} />
        </Route>
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/create_closet" element={<CreateCloset/>} />
        </Route>
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/create_clothes" element={<CreateClothes/>} />
        </Route>
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/search" element={<SearchPage/>} />
        </Route>
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
