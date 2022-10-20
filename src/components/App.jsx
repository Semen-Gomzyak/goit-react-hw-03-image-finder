import React, { PureComponent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AppContainer } from './App.styled';
import { SearchbarForm } from './Searchbar/Searchbar';
import { fetchImages } from './Api/Api';
import { GalleryImageList } from './ImageGalleryList/ImageGalleryList';
import { ButtonShowMore } from './ButtonShowMore/ButtonShowMore';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends PureComponent {
  state = {
    queryString: '',
    images: [],
    page: 1,
    modalCard: null,
    status: 'idle',
    showModal: false,
    totalHits: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { queryString, page, images } = this.state;

    if (prevState.images !== images) {
      this.ScrollByGallery(page);
    }

    if (prevState.queryString !== queryString || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const response = await fetchImages(queryString, page);
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...response],
            status: 'resolved',
          };
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
        console.log(error);
      }
    }
  }

  submitForm = ({ queryString }, { resetForm }) => {
    if (!queryString.trim()) {
      resetForm();
      return;
    }
    if (queryString === this.state.queryString) {
      resetForm();
      return;
    }
    this.setState({ images: [], page: 1, queryString: queryString });
    resetForm();
  };

  ScrollByGallery = page => {
    window.scrollBy({
      top: window.screen.availHeight / (page / window.screen.availHeight),
      behavior: 'smooth',
    });
  };

  showMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  showModal = id => {
    this.setState({ showModal: true });
    const modalCard = this.state.images.find(image => image.id === id);
    this.setState({ modalCard });
  };

  render() {
    const { images, page, status, showModal, modalCard } = this.state;

    return (
      <AppContainer>
        <SearchbarForm onSubmit={this.submitForm} />
        {status === 'resolved' && (
          <GalleryImageList images={images} showModal={this.showModal} />
        )}
        {status === 'resolved' && images.length / page === 12 && (
          <ButtonShowMore showMore={this.showMore} />
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && toast.warning('Please try again')}
        {showModal && (
          <Modal modalCard={modalCard} closeModal={this.closeModal} />
        )}
        <ToastContainer autoClose={3000} />
      </AppContainer>
    );
  }
}
