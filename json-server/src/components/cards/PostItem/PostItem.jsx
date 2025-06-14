import './PostItem.css'
import { Link } from 'react-router'
export default function PostItem({post}){
    return (
        <Link to={'/posts/' + post.id} className='post-item' rel="prefetch" >
            <li >
                <h3 className='post-item-title'>{post.title}</h3>
                <p className='post-item-content'>{post.content}</p>
            </li>
        </Link>
    )
}