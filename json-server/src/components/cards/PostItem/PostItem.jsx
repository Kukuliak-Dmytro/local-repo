import './PostItem.css'

export default function PostItem({post}){
    return (
        <li className='post-item'>
            <h3 className='post-item-title'>{post.title}</h3>
            <p className='post-item-content'>{post.content}</p>
        </li>
    )
}