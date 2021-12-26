import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import styles from './Searchbar.module.css';

const Searchbar = ({ onFormSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      console.log('event');
      toast.error('please, enter movies name');
      return;
    }
    onFormSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <div className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.searchFormInput}
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          value={searchQuery}
          placeholder="Search movies"
          onChange={handleQueryChange}
        />
        <button type="submit" className={styles.searchFormButton}>
          <ImSearch />
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>
      </form>
    </div>
  );
};

Searchbar.propTypes = {
  searchQuery: PropTypes.string,
};

export default Searchbar;
