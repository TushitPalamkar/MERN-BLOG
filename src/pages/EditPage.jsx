import  ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
export default function EditPage(){
    const[title,setTitle]=useState('')
    const[summary,setSummary]=useState('')
    const[content,setContent]=useState('')
    const[files,setFiles]=useState('')
    const[cookie,setCookie]=useCookies(["access-tokens"])
    const[postinfo,setPostinfo]=useState(null)
    const[cover,setCover]=useState('')
    const navigate=useNavigate();
    const {id}=useParams();
    useEffect(()=>
        {
            async function editpost(){
                try{
                    const response = await axios.get(`https://blog-backend-fu1c.onrender.com/post/${id}`);
                setPostinfo(response.data)
                setTitle(postinfo.title)
                setSummary(postinfo.summary)
                setContent(postinfo.content)
                setCover(postinfo.cover)
            
                console.log(response.data)
                }
                catch(error){
                    console.log(error)
                }
                
            } 
            editpost()  
        },[])
    const modules={
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'},
                ['link', 'image'],
                ['clean']
                ]
                
        ]
    }
   
    const formats = [
        'header',    
        'bold',      
        'italic',    
        'underline', 
        'strike',    
        'blockquote',
        'list',      
        'indent',    
        'link',      
        'image',     
        'clean'      
    ];
    async function updatepost(event){
        event.preventDefault()
        const data=new FormData();
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        const author=window.localStorage.getItem("userID")
        data.set('author',author)
        data.set('file',files[0]);
        try{

            const response=await axios.put(`https://blog-backend-fu1c.onrender.com/editpost/${id}`,data)
            console.log(response.data)
            console.log(author)
       
    
        console.log(files)
        navigate('/')
        }
        catch(error){
            console.log(error)
        }
        
       
    }
    
    return(
        <form onSubmit={updatepost}>
            <input type="title" placeholder="Title" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
            <input type="summary" placeholder="Summary" value={summary} onChange={(event)=>{setSummary(event.target.value)}} />
            <input type="file" onChange={(event)=>setFiles(event.target.files)} />
            <ReactQuill value={content} onChange={newvalue=>setContent(newvalue)} modules={modules} formats={formats} />
            <button style={{marginTop:'10px'}} type="submit">Edit Post</button>
        </form>
    )
}
