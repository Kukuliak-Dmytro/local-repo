import './Filter.css'
import CheckboxCard from '../../components/cards/CheckboxCard/CheckboxCard'
import Button from '../../components/ui/Button'
export default function Filter({
  categories,
  pendingCategories,
  onPendingCategorySelect,
  pendingMinPrice,
  pendingMaxPrice,
  onPendingPriceChange,
  onSubmit
}) {
  return (
    <form className="filter-wrapper" onSubmit={onSubmit}>
      {categories.map((category) => (
        <CheckboxCard
          key={category.id}
          category={category}
          checked={pendingCategories.includes(category.id)}
          onChange={onPendingCategorySelect}
        />
      ))}
      <span>
        <label htmlFor="min_price">Min Price</label>
        <input
          type="range"
          name="min_price"
          id="min_price"
          min={0}
          max={100}
          onChange={onPendingPriceChange}
          value={pendingMinPrice}
        />
        <span>{pendingMinPrice}</span>
      </span>
      <span>
        <label htmlFor="max_price">Max Price</label>
        <input
          type="range"
          name="max_price"
          id="max_price"
          min={0}
          max={100}
          onChange={onPendingPriceChange}
          value={pendingMaxPrice}
        />
        <span>{pendingMaxPrice}</span>
      </span>
      <Button type="submit">Apply Filters</Button>
    </form>
  )
}