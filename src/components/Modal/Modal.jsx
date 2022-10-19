import { createPortal } from 'react-dom';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalBlock } from './Modal.styled';

const rootRef = document.querySelector('#root');

export class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEsc);
  }

  closeModalByBackdrop = e => {
    console.log(e.target);
    console.log(e.currentTarget);
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
      <Overlay data-modal="wrap" onClick={this.closeModalByBackdrop}>
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
