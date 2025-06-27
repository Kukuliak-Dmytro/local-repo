import './ProductsList.css'
import ProductCard from '../../components/cards/ProductCard'
export default function ProductsList({products, itemsPerPage, currentPage, onPageChange, totalPages}){
    return(
        <div className="products-list-wrapper">
            <div className="products-list">
                {products.map((product)=>(
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
            <div className="pagination">
                {Array.from({length: totalPages}).map((_, index)=>(
                    <button 
                    className={`pagination-button ${currentPage === index? 'active' : ''}`} 
                    key={index}
                    onClick={()=>onPageChange(index)}
                    disabled={currentPage === index}
                    >{index+1}</button>
                ))}
            </div>
        </div>
    )
}