import React from "react";
import "./css/Modal.css";
export const Modal = (props:any) => {
    if(!props.show) {
        return null
    }
    return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title"> Modal title</h4>
                </div>
                <div className="modal-body">
                    Here is modal content
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="button">Save</button>
                </div>
            </div>
        </div>
    )
}