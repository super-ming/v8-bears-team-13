import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

/* 
Font Awesome Icon Usage: https://github.com/FortAwesome/react-fontawesome#explicit-import
*/

const Entry = ({ id, amount, category, date, description }) => (
  <div className="entry">
    <div className="entry__top-half">
      <div className="entry__description">{ description }</div>
      <div className="entry__date">{ date }</div>
      <div className="entry__category">{ category } </div>
    </div>
    <div className="entry__bottom-half">
      <div className="entry__amount">${ amount }</div>
      <FontAwesomeIcon className="entry__edit" icon={faPencilAlt} />
      <FontAwesomeIcon className="entry__delete" icon={faTrashAlt} />
    </div>
  </div>
);

Entry.propTypes = {
  id: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Entry;
