import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import formatMoney from '../../helpers/formatMoney';

/*
Font Awesome Icon Usage: https://github.com/FortAwesome/react-fontawesome#explicit-import
*/

const handleEditClick = (editEntry, entryDetails) => {
  editEntry(entryDetails);
}

const Entry = ({ amount, categoryDesc, date, description, type, editEntry, entryDetails }) => (
  <div className="entry">
    <div className="entry__row">
      <div className="entry__description">{description}</div>
      <div className="entry__amount">{ type === 1 && '-' }${formatMoney(amount)}</div>
    </div>
    <div className="entry__row">
      <div className="entry__column">
        <div className="entry__group">
          <div className="entry__date">{date}</div>
          <div className="entry__category-container">
            <div className="entry__category">{categoryDesc}</div>
          </div>
        </div>
      </div>
      <div className="entry__column">
        <div className="entry__icons">
          <FontAwesomeIcon className="entry__icon entry__icon--edit" icon={faPencilAlt} onClick={() => handleEditClick(editEntry, entryDetails)} />
          <FontAwesomeIcon className="entry__icon entry__icon--delete" icon={faTrashAlt} />
        </div>
      </div>
    </div>
  </div>
);

Entry.propTypes = {
  amount: PropTypes.string.isRequired,
  categoryDesc: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Entry;
