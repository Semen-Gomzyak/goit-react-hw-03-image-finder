import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { Searchbar, SearchForm, SearchInput } from './Searchbar.styled';
import { IconButton } from 'components/IconButton/IconButton.styled';
import { ReactComponent as SearchIcon } from '../IconButton/search.svg';

export const SearchbarForm = submitForm => {
  return (
    <Searchbar>
      <Formik
        initialValues={{ queryString: '' }}
        onSubmit={submitForm.onSubmit}
      >
        <SearchForm>
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>

          <SearchInput
            name="queryString"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Searchbar>
  );
};

SearchbarForm.propTypes = {
  submitForm: PropTypes.shape({
    onSubmit: PropTypes.func.isRequired,
  }),
};
