import './Modal.css';

export default function Modal({ opened, toggleModal }) {
    // if (isOpen === true) {
    //     modalClass = 'modal-open';
    // }
    // else { modalClass = 'modal-closed'; }
    return (
        <>
            <div className={`modal-wrapper ${opened ? 'active' : 'inactive'}`}>
                <div className="modal-header">
                    <h3>Modal header</h3>
                    <button id='modal-close' onClick={toggleModal}>&#10006;</button>
                </div>
                <div className="modal-body">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure quisquam eaque earum error adipisci, labore corporis porro natus beatae eveniet.
                </div>
            </div>
            <div id="overlay" className={`${opened?'active':'inactive'}` } onClick={toggleModal}></div>
        </>
    )
}