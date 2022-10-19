import { createPortal } from 'react-dom';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalBlock } from './Modal.styled';

const rootRef = document.querySelector('#root');

export class Modal extends PureComponent {
  componentDidMount() {
    const modalRef = document.querySelector('[data-modal="wrap"]');
    modalRef.addEventListener('click', this.closeModalByBackdrop);
    window.addEventListener('keydown', this.closeModalByEsc);
  }

  componentWillUnmount() {
    const modalRef = document.querySelector('[data-modal="wrap"]');
    modalRef.removeEventListener('click', this.closeModalByBackdrop);
    window.removeEventListener('keydown', this.closeModalByEsc);
  }

  closeModalByBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  closeModalByEsc = e => {
    e.preventDefault();

    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <Overlay data-modal="wrap">
        <ModalBlock>
          <img
            src={this.props.modalCard.largeImageURL}
            alt={this.props.modalCard.tags}
          />
        </ModalBlock>
      </Overlay>,
      rootRef
    );
  }
}

Modal.propTypes = {
  modalCard: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
