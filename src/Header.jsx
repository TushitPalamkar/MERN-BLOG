import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
import {useCookies} from "react-cookie"
import axios from "axios"
import Cookies from "js-cookie"
import CreatePost from './pages/CreatePost'

const Header = () => {
  const[username,setUsername]=useState(null)
  const[cookies,setCookies]=useCookies(["access-tokens"])
  
  useEffect(()=>{
    const token=Cookies.get('token')
    if (token) {
      axios.get('https://blog-backend-fu1c.onrender.com/profile', { withCredentials: true })
        .then(response => {
          setUsername(response.data.username);
          console.log(response.data)
          
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  function handleLogout() {
    console.log("tokens:",cookies['access-tokens'])
  setCookies("access-tokens","");
  console.log("userID:",window.localStorage.getItem("userID"))
  window.localStorage.removeItem("userID")
  }
  
  return (
    <header>
    <Link to='/' className='logo'>MyBlog</Link>
    <nav>
      {/* {username &&(
        <Link to='/create'>Create New Post</Link>
      )} */}
      {!cookies['access-tokens']?(
        <>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        </>
      ):
      <>
      <Link to='/create'>Create New Post</Link>
      <a onClick={handleLogout}>Logout</a>
      </>}
      </nav>
    
  </header>
  )
}

export default Header
