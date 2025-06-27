export const getCartFromStorage = ()=>{
    const cart = localStorage.getItem('cart')
    console.log(cart)
    return cart ? JSON.parse(cart) : []
}
export const addCardToStorage = (product)=>{
    localStorage.setItem('cart', JSON.stringify([...getCartFromStorage(), product]))
    console.log(getCartFromStorage())
}
export const checkStorageForProduct = (product)=>{
    const cart = getCartFromStorage()
    return cart.some(item => item.id === product.id)
}
export const removeCardFromStorage = (product)=>{
    const cart = getCartFromStorage()
    const updatedCart = cart.filter(item => item.id !== product.id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
}
