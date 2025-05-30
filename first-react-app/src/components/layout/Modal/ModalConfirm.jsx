export default function ModalConfirm({yes, decline}){
    return (
        <div className="modal-body">
            <h2>Are you sure?</h2>
            <p>This action cannot be undone.</p>
            <div className="modal-buttons">
                <button className="btn btn-confirm" onClick={yes}>Yes</button>
                <button className="btn btn-cancel" onClick={decline}>No</button>
            </div>
        </div>
    )
}