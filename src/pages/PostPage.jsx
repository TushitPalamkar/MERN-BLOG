import { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
export default function PostPage(){
    const[postinfo,setPostinfo]=useState(null);
   const {id}=useParams();
    useEffect(()=>{
        async function postInfo(){
            try{

                const response = await axios.get(`https://blog-backend-fu1c.onrender.com/post/${id}`);
                setPostinfo(response.data)
                console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
        postInfo();
    },[id])
    return (
        <>
     
            {postinfo?
            ( <div className="post-page">
                <h1>{postinfo.title}</h1>
                <time>{formatISO9075(new Date(postinfo.createdAt))}</time>
                <div className="author">By @{postinfo.author.username}</div>
                {
                    cookie["access-tokens"]?<Link to={`/editpost/${postinfo._id}`} className="edit-btn">Edit Post
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
    
                    </Link>:
                    <div style={{marginBottom: '10px', fontWeight:'bolder', fontSize:'1.2rem'}}>
                        <Link to={'/login'}>Login to Edit this Post</Link></div>
                }
                
                <div className="image">
                    <img src={`http://localhost:4000/${postinfo.cover}`} alt="image"/>
                </div>
                
                    <div dangerouslySetInnerHTML={{__html:postinfo.content}}></div>
            
                
                
            </div>
        ):(
            <div>Loading..</div>
        )}
               
            
        </>  
    );
}
