import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

function Provider({ children }) {
  const [fetchSearch, setFetchSearch] = useState('');
  const [fetchRadio, setFetchRadio] = useState('');
  function handleSearch(search) {
    return setFetchSearch(search);
  }
  function handleRadio(radio) {
    return setFetchRadio(radio);
  }
  const context = {
    handleRadio,
    handleSearch,
    fetchRadio,
    fetchSearch,
  };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
