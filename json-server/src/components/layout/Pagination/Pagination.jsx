import './Pagination.css'
export default function Pagination({currentPage, setCurrentPage, postsPerPage, totalPosts}){
const totalPages = Math.ceil(totalPosts / postsPerPage)
const pages = []
for(let i = 1; i <= totalPages; i++){
    pages.push(i)
}
return (
    <ul className='pagination'>
        {pages.map((page)=>{
            return (           
            <li 
            key={page} 
            className={`pagination-item ${currentPage === page ? 'active' : ''}`}
             onClick={()=>setCurrentPage(page)}>
                {page}
            </li>
            )
        })}
    </ul>
)
}