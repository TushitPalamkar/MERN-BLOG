import  ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useState } from "react"
import axios from "axios"
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom"
export default function CreatePost(){
    const[title,setTitle]=useState('')
    const[summary,setSummary]=useState('')
    const[content,setContent]=useState('')
    const[files,setFiles]=useState('')
    const[cookie,setCookie]=useCookies(["access-tokens"])
    const navigate=useNavigate();
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
    async function createnewPost(event){
        event.preventDefault()
        const data=new FormData();
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        const author=window.localStorage.getItem("userID")
        data.set('author',author)
        data.set('file',files[0]);
        
        console.log(author)
        const response=await axios.post('http://localhost:4000/post',data)
        console.log(response.data)
        console.log(files)
        alert("New Post has been Created!!")
        navigate('/');
    }
    
    return(
        <form onSubmit={createnewPost}>
            <input type="title" placeholder="Title" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
            <input type="summary" placeholder="Summary" value={summary} onChange={(event)=>{setSummary(event.target.value)}} />
            <input type="file" onChange={(event)=>setFiles(event.target.files)} />
            <ReactQuill value={content} onChange={newvalue=>setContent(newvalue)} modules={modules} formats={formats} />
            <button style={{marginTop:'10px'}} type="submit">Create Post</button>
        </form>
    )

}