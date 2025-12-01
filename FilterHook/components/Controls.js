import React from "react";
import PropTypes from "prop-types";

function Controls({ checked, searchText, onCheckboxChange, onSearchChange, onReset }) {
    return (
        <React.Fragment>
            <input type='checkbox' checked={checked} onChange={onCheckboxChange} />
            <input type='text' value={searchText} onChange={onSearchChange} />
            <input type='button' value="Сброс" onClick={onReset} />
        </React.Fragment>
    );
}
Controls.propTypes = {
    checked: PropTypes.bool.isRequired,
    searchText: PropTypes.string.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
};

export default Controls;