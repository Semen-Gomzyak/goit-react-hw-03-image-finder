import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ card, showModal, id }) => {
  return (
    <GalleryItem
      onClick={() => {
        showModal(id);
      }}
    >
      <GalleryImage
        src={card.webformatURL && card.webformatURL}
        alt={card.tags}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  showModal: PropTypes.func.isRequired,
  card: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
