import React from 'react'
import {format, formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';
 
const Post = ({_id,title,summary,content,cover,createdAt,author}) => {
  return (
    <div className="post">
    <div className="image">
      <Link to={`/post/${_id}`}>
      <img src={'https://blog-backend-fu1c.onrender.com/'+cover} alt="" />
      </Link>
    </div>
    <div className="texts">
      <Link to={`/post/${_id}`}>
    <h2>{title}</h2>
    </Link>
    <p className="info">
      <a href="" className="author">{author.username}</a>
      <time>{formatISO9075(new Date(createdAt), 'MMM d yyyy HH:mm')}</time>
    </p>
    <p className='summary'>{summary}</p>
    </div>
    </div>
  )
}

export default Post
