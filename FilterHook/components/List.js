import React from "react";
import PropTypes from "prop-types";
import './Filter.css';

function List ({sortedWords}) {
    return(
        <ul className='List_Words' >
          {sortedWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
    )
}
List.propTypes = {
  sortedWords: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default List;