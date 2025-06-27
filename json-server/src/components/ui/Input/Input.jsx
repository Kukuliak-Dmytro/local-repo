import './Input.css'
export default function Input({ type, placeholder, value, onChange, isEditable = false }) {
    if (type === 'textarea') {
        return (
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={isEditable ? 'input-editable' : 'input-uneditable'}
                disabled={!isEditable}
                rows={5}
            />
        )
    } else {
        return (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={isEditable ? 'input-editable' : 'input-uneditable'}
                disabled={!isEditable}
            />
        )
    }
}