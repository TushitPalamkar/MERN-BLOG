import { useEffect, useState } from "react";
import Post from "../Post";
import axios from "axios"
export default function IndexPage(){
    const[post,setPosts]=useState([]);
    useEffect(()=>{
        const fetchposts=async()=>{
            const response=await axios.get("http://localhost:4000/post")
            setPosts(response.data)    
        }
        fetchposts()
        
    },[])
    return (
       <>
       {post.map(item=>(
        <Post key={item._id}{...item}/>
       ))}
       </> 
    );
}