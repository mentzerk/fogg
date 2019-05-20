import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Button from './Button';
import { FaTimes } from 'react-icons/fa';

const Modal = ({
  children,
  name,
  closeButtonText = 'Close',
  isOpen = false,
  contentLabel,
  handleCloseModal,
  appElement
}) => {
  const handleRequestClose = e => {
    handleCloseModal(e, name);
  };

  ReactModal.setAppElement(appElement);
  let modalProperties = {
    isOpen: isOpen,
    contentLabel: contentLabel,
    shouldCloseOnOverlayClick: true,
    shouldCloseOnEsc: true,
    portalClassName: 'modal ReactModalPortal',
    onRequestClose: handleRequestClose
  };
  return (
    <ReactModal {...modalProperties}>
      <div className="modal-header">
        <button
          className="modal-header-close"
          aria-label="Close Modal"
          onClick={handleCloseModal}
          data-modal={name}
        >
          <FaTimes />
        </button>
      </div>

      <div className="modal-body">{children}</div>

      <div className="modal-footer">
        <div className="button">
          <Button onClick={handleCloseModal} data-modal={name}>
            {closeButtonText}
          </Button>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  name: PropTypes.string,
  closeButtonText: PropTypes.string,
  isOpen: PropTypes.bool,
  contentLabel: PropTypes.string,
  handleCloseModal: PropTypes.func,
  appElement: PropTypes.string
};
