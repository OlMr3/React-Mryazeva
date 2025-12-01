import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Controls from './Controls';
import List from './List';
import './Filter.css';

function Filter({ wordsArr }) {
  const [checked, setChecked] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [sortedWords, setSortedWords] = useState(wordsArr);
  const originalWords = wordsArr;
  useEffect(() => {
    let filteredWords = [...originalWords];
    if (checked) {
      filteredWords.sort();
    }
    if (searchText.trim()) {
      filteredWords = filteredWords.filter(word => word.toLowerCase().includes(searchText));
    }
    setSortedWords(filteredWords);
  }, [checked, searchText, originalWords]);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleSearchChange = (value) => {
    setSearchText(value.toLowerCase());
  };

  const handleReset = () => {
    setChecked(false);
    setSearchText('');
    setSortedWords(originalWords);
  };
  return (
    <div className='Filter_Container'>
      <Controls
        checked={checked}
        searchText={searchText}
        onCheckboxChange={handleCheckboxChange}
        onSearchChange={handleSearchChange}
        onReset={handleReset}
      />
      <List sortedWords={sortedWords} />
    </div>
  )
}
Filter.propTypes = {
  wordsArr: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Filter;
