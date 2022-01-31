import React, { useEffect } from 'react'
import Loader from 'react-loader-spinner'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalPopUp({ isLoading, message, title, handleClose, show, action1, action2, action3,
    itemId,
}) {

    useEffect(() => {
        if(!itemId) return
        console.log(itemId,title)
    }, [title,itemId])
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex align-items-center justify-content-center'>
                {isLoading ? <Loader type="TailSpin" className='loading' color="#00BFFF" height={20} width={20} /> :
                    message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary"
                    disabled={isLoading && true}
                    onClick={() => {
                        switch (title) {
                            case 'Account Verification':
                                action1(itemId);
                                break;
                            case 'Password Reset':
                                action2(itemId);
                                break;
                            case 'Delete Account':
                                action3(itemId);
                                break;
                            case 'Update Fee':
                                action1(itemId);
                                break;
                            default:
                                handleClose();
                                break;
                        }
                    }}
                >
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPopUp
