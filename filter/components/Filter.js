import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';

class Filter extends React.Component {
  static propTypes = {
    wordsArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  state = {
    checked: false,
    originalWords: this.props.wordsArr,
    sortedWords: this.props.wordsArr,
    searchText: '',

  }
  handleCheckboxChange = () => {
    const newChecked = !this.state.checked;
    this.setState({
      checked: newChecked,
    },
      () => this.updateFilteredWords())

  };
  handleSearchChange = (eo) => {
    const text = eo.target.value.toLowerCase();
    this.setState({
      searchText: text,
    },
      () => this.updateFilteredWords()
    )
  };
  resetFilters = () => {
    this.setState({
      checked: false,
      sortedWords: this.state.originalWords,
      searchText: '',
    })
  }
  updateFilteredWords = () => {
    let filteredWords = [...this.state.originalWords];
    if (this.state.checked) {
      filteredWords.sort()
    }
    if (this.state.searchText.trim()) {
      filteredWords = filteredWords.filter(word => word.toLowerCase().includes(this.state.searchText));
    }

    this.setState({
      sortedWords: filteredWords,
    })
  };


  render() {
    return (
      <div className='Filter_Container'>
        <input type='checkbox' checked={this.state.checked} onChange={this.handleCheckboxChange} />
        <input type='text' value={this.state.searchText} onChange={this.handleSearchChange} />
        <input type='button' value="Сброс" onClick={this.resetFilters} />
        <ul className='List_Words' >
          {this.state.sortedWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}

        </ul>
      </div>
    );
  }

}

export default Filter;
