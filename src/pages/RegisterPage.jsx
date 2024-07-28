import { useState } from "react";
import axios from "axios";
export default function RegisterPage(){
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
   async function register(event){
        event.preventDefault();
        try{
            const response=await axios.post('http://localhost:4000/register',{username,password})
            console.log(response.data)
            alert('Registration Completed! Now Login')

        }catch(error)
        {
            console.log(error)
            alert('Registration Failed')
        }
    }
    return(
        <>
        
        <form action="" className="register" onSubmit={register}>
        <h1>Register</h1>
            <input type="text" placeholder="username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
            <button>Register</button>
        </form>
        </>
    );
}