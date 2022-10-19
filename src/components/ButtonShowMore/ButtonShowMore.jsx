import PropTypes from 'prop-types';
import { LoadMore } from './ButtonShowMore.styled';

export const ButtonShowMore = ({ showMore }) => {
  return (
    <LoadMore type="button" onClick={showMore}>
      Load more
    </LoadMore>
  );
};

ButtonShowMore.propTypes = {
  showMore: PropTypes.func.isRequired,
};
