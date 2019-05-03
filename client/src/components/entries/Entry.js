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
};

// const handleDeleteClick = (deleteEntry, entryId) => {
//   deleteEntry(entryId);
// };

const Entry = ({
  amount,
  categoryDesc,
  date,
  description,
  type,
  entryId,
  entryDetails,
  editEntry,
  deleteEntry
}) => (
  <div className="entry">
    <div className="entry__row">
      <div className="entry__description">{description}</div>
      {type ? (
        <div className="entry__amount entry__amount--expense">-{formatMoney(amount)}</div>
      ) : (
        <div className="entry__amount entry__amount--income">{formatMoney(amount)}</div>
      )}
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
          <FontAwesomeIcon
            className="entry__icon entry__icon--edit"
            icon={faPencilAlt}
            onClick={() => handleEditClick(editEntry, entryDetails)}
          />
          <FontAwesomeIcon
            className="entry__icon entry__icon--delete"
            icon={faTrashAlt}
            onClick={() => deleteEntry(entryId)}
          />
        </div>
      </div>
    </div>
  </div>
);

Entry.propTypes = {
  amount: PropTypes.string.isRequired,
  categoryDesc: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  entryId: PropTypes.number.isRequired,
  type: PropTypes.bool.isRequired,
  entryDetails: PropTypes.object.isRequired,
  editEntry: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired
};

export default Entry;
