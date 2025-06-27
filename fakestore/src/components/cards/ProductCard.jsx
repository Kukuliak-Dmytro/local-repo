import React, { useState } from 'react';
import Button from '../ui/Button';
import './ProductCard.css';
import { addCardToStorage , checkStorageForProduct, removeCardFromStorage} from '../../utils/storageUtils';
export default function ProductCard({ product }) {
    
  const { id, title, price, description, category, images = [] } = product;
const [isInCart, setIsInCart] = useState(checkStorageForProduct(checkStorageForProduct(product)))

  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-card">
      <span className="separator">
          <div className="product-card-image-carousel">
            {images.length > 0 && (
              <img
                src={images[currentImage]}
                alt={title}
              />
            )}
            {images.length > 1 && (
              <>
                <button onClick={handlePrev} className="product-card-carousel-btn left">&lt;</button>
                <button onClick={handleNext} className="product-card-carousel-btn right">&gt;</button>
              </>
            )}
          </div>
          <div className="product-card-category">
            {category?.image && (
              <img src={category.image} alt={category.name} />
            )}
            <span>{category?.name}</span>
          </div>
          <h2 className="product-card-title">{title}</h2>
          <div className="product-card-price">${price}</div>
          <p className="product-card-description">{description}</p>
      </span>
            {checkStorageForProduct(product) ? 
            <Button type="button" onClick={()=>{
                
                removeCardFromStorage(product);
                setIsInCart(false)
                }
                }>
                Remove from Cart
            </Button> :
            <Button type="button" onClick={()=>{
              
                addCardToStorage(product);
                setIsInCart(true)
                }

            }>
                Add to Cart
            </Button>}
    </div>
  );
}
