import './ModalWrapper.css'
import { ModalContext } from '../../../providers/ModalProvider'
import { useContext } from 'react'
export default function ModalWrapper({children}){
    const [isOpen, setIsOpen] = useContext(ModalContext)
    return(
        <>
            {isOpen ? (
                <>
                    <div className='modal-wrapper'>
                        {children}
                    </div>
                    <div className='modal-overlay' onClick={()=>setIsOpen(false)}></div>
                </>
            ):null  }
        </>
    )
}