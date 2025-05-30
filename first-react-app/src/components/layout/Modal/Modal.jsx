import './Modal.css';

export default function Modal({ opened, toggleModal, children }) {
    // if (isOpen === true) {
    //     modalClass = 'modal-open';
    // }
    // else { modalClass = 'modal-closed'; }
    return (
        <>
            <div className={`modal-wrapper ${opened ? 'active' : 'inactive'}`}>
                <div className="modal-header">
                    <button id='modal-close' onClick={toggleModal}>&#10006;</button>
                </div>
                
                {children}
            </div>
            <div id="overlay" className={`${opened?'active':'inactive'}` } onClick={toggleModal}></div>
        </>
    )
}