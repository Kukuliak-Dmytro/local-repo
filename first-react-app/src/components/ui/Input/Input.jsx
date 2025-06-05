import './Input.css';

export default function Input({label, placeholder, id, type='text', defaultValue, onChange}) {
    return (
        <div className="input-container">
        <label htmlFor={id}>{label}</label>
        <input type={type} placeholder={placeholder} id={id} value={defaultValue} onChange={onChange} required/>
        </div>
    )
}
