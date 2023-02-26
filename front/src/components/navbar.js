import {Link} from 'react-router-dom';
import Login from './Login';
import {useEffect,useState} from 'react';


export default function NavBar()  {
    const [username,setusername] = useState(null);
    useEffect(() => {
        fetch("http://localhost:5000/profile",{
          credentials:'include'
        })
        .then(response => {
        response.json().then(userinfo => {
          setusername(userinfo.username)
        })})
      },[])

    return(
        <header>
            <div className='blog'>
                <h1>Welcome to Blog Section</h1>
            </div>
            {username && (
                <div className='links'>
                <Link to={"/posts"}>Create Post</Link>
                <Link to={"/logout"}>Logout</Link>
                <Link to={"/"}> Home</Link>
                </div>
            )}
            {!username && (
            <div className='links'>
                <Link to={"/Login"}> Login</Link>
                <Link to={"/Register"}>Register</Link>
                <Link to={"/"}> Home</Link>
            </div>
            )}
        </header>
    );
}
