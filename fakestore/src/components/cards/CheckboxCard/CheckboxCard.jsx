import './CheckboxCard.css'
export default function CheckboxCard({category, checked, onChange, onSelect}){
    return (
        <label htmlFor={category.id} className="checkbox-card">
            <input type="checkbox" name={category.id} id={category.id} value={category.id} 
                checked={checked}
                onChange={onChange || onSelect}
            />
            <span>{category.name}</span>
        </label>
    )
}