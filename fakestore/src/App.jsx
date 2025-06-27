import { useState, useEffect } from 'react'
import Button from './components/ui/Button'
import './App.css'
import { getProducts } from './services/productServices'
import ProductsList from './layout/ProductsList/ProductsList'
import { liveSearch } from './utils/liveSearch'
import getCategories from './services/categoriesService'
import Filter from './layout/Filter/Filter'
function App() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100)

  // Pending filter state (used in the form)
  const [pendingCategories, setPendingCategories] = useState([])
  const [pendingMinPrice, setPendingMinPrice] = useState(0)
  const [pendingMaxPrice, setPendingMaxPrice] = useState(100)

  useEffect(() => {
    getProducts().then(setProducts)
    getCategories().then(setCategories).finally(() => setIsLoading(false))
  }, [])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(0) // Reset to first page on search
  }

  const handleCategorySelect = (e) => {
    console.log('Raw checkbox value:', e.target.value, 'Type:', typeof e.target.value);
    const value = Number(e.target.value);
    if (isNaN(value)) {
      console.error('Checkbox value is not a valid number:', e.target.value);
      return;
    }
    if (e.target.checked) {
      setSelectedCategories(prev => [...prev, value]);
    } else {
      setSelectedCategories(prev => prev.filter(category => category !== value));
    }
    setCurrentPage(0);
  }
  const handlePriceChange = (e) => {
    const { name, value } = e.target
    if (name === 'min_price') {
      setMinPrice(Math.min(value, maxPrice))
    } else {
      setMaxPrice(Math.max(value, minPrice))
    }
  }

  // Category checkbox handler (pending)
  const handlePendingCategorySelect = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    if (e.target.checked) {
      setPendingCategories(prev => [...prev, value]);
    } else {
      setPendingCategories(prev => prev.filter(category => category !== value));
    }
  };

  // Price input handler (pending)
  const handlePendingPriceChange = (e) => {
    const { name, value } = e.target;
    const numValue = Number(value);
    if (name === 'min_price') {
      setPendingMinPrice(numValue);
    } else if (name === 'max_price') {
      setPendingMaxPrice(numValue);
    }
  };

  // On filter form submit, copy pending to active
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setSelectedCategories(pendingCategories);
    setMinPrice(pendingMinPrice);
    setMaxPrice(pendingMaxPrice);
    setCurrentPage(0);
  };

  // Filtering logic uses only active state
  let filteredProducts = liveSearch(products, search)
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      selectedCategories.includes(product.category.id)
    );
  }
  filteredProducts = filteredProducts.filter(product => {
    const price = product.price;
    return price >= minPrice && price <= maxPrice;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const pagedProducts = filteredProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )


  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (isLoading) return <div className="loader"></div>
  return (
    <div className="app-wrapper">
      <div className="hero">
        <h1>Fake Store</h1>
      </div>
      <form className="search" onSubmit={e => e.preventDefault()}>
        <input type="search" name="search" id="search" value={search} placeholder="Search products" onChange={handleSearchChange} />
        <Button type="submit">Search</Button>
      </form>
      <div className="products">
        <div className="filters">
          <Filter
            categories={categories}
            pendingCategories={pendingCategories}
            onPendingCategorySelect={handlePendingCategorySelect}
            pendingMinPrice={pendingMinPrice}
            pendingMaxPrice={pendingMaxPrice}
            onPendingPriceChange={handlePendingPriceChange}
            onSubmit={handleFilterSubmit}
          />
        </div>
        <div className="product-list">
          <ProductsList
            products={pagedProducts}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  )
}

export default App
