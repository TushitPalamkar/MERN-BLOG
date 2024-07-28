import { useState } from "react";
import {useCookies} from "react-cookie"
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
export default function LoginPage(){
    const [username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[_,setCookies]=useCookies(["access-tokens"]);
    const navigate=useNavigate();
    async function login(event){
        event.preventDefault();
        try{
            const response=await axios.post('https://blog-backend-fu1c.onrender.com/login',{username,password},{withCredentials:true});
            console.log(response.data)
            setCookies("access-tokens",response.data.token)
            window.localStorage.setItem("userID",response.data.userID)
            navigate('/');
            alert('Login Successfull')
            
        }catch(error)
        {
            alert('Wrong Credentials')
            console.log(error)
        }
    }
    return(
        
    
      
        <form action="" className="login" onSubmit={login}>
        <h1>Login</h1>
            <input type="text" placeholder="username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
            <button>Login</button>
        </form>
        
    );
}
