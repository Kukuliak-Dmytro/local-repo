import './Button.css'
const Button = ({children, title, description}) => {
    return (
    <>
        <button className='primary-button'>{description}</button>
    </>
)
}
export default Button
