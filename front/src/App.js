import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar';
import {Routes,Route,Link} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Post from './components/Create';
import { UserContextProvider } from './Usercontext';
import ReadList from './components/ReadList';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Usercontext';

export default function App() {
    const {setUserInfo,userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch("http://localhost:5000/profile",{
          credentials:'include'
        })
        .then(response => {
          response.json().then(userInfo => {
            setUserInfo(userInfo)
          })
        })
      },[])

      function logout() {
        fetch("http://localhost:5000/logout",{
          credentials:'include',
          method:'POST'
        })
        setUserInfo(null);
      }

      const username = userInfo?.email;
    return(
        <header>
            <div className='blog'>
                <h1>Welcome to Blog Section</h1>
            </div>
            {username && (
                <div className='links'>
                <Link  id='a' to={"/post"}>Create Post</Link>
                <Link id='a' onClick={logout}>Logout</Link>
                <Link id='a' to={"/"}> Home</Link>
                </div>
            )}
            {!username && (
            <div className='links'>
                <Link id='a' to={"/Login"}> Login</Link>
                <Link id='a' to={"/Register"}>Register</Link>
                <Link id='a' to={"/"}> Home</Link>
            </div>
            )}
            <UserContextProvider>
              <Routes>
                <Route path='/post' element={<Post />} />
                <Route path="/" element={<ReadList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </UserContextProvider>
        </header>
  );
}


