import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

/*
Font Awesome Icon Usage: https://github.com/FortAwesome/react-fontawesome#explicit-import
*/

const Entry = ({ id, amount, category, date, description, editEntry }) => (
  <div className="entry">
    <div className="entry__row">
      <div className="entry__description">{description}</div>
      <div className="entry__amount">${amount}</div>
    </div>
    <div className="entry__row">
      <div className="entry__column">
        <div className="entry__group">
          <div className="entry__date">{date}</div>
          <div className="entry__category-container">
            <div className="entry__category">{category}</div>
          </div>
        </div>
      </div>
      <div className="entry__column">
        <div className="entry__icons">
          <FontAwesomeIcon className="entry__icon entry__icon--edit" icon={faPencilAlt} onClick={editEntry}/>
          <FontAwesomeIcon className="entry__icon entry__icon--delete" icon={faTrashAlt} />
        </div>
      </div>
    </div>
  </div>
);

Entry.propTypes = {
  amount: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Entry;
