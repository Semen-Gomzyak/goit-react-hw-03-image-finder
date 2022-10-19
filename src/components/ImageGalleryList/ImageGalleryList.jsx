import PropTypes from 'prop-types';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import {GalleryList} from './ImageGalleryList.styled';

export const GalleryImageList = ({ images, showModal }) => {
  return (
    <GalleryList>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          card={image}
          showModal={showModal}
          id={image.id}
        />
      ))}
    </GalleryList>
  );
};

GalleryImageList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  showModal: PropTypes.func.isRequired,
};
