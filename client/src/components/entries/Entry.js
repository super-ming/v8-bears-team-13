import React from 'react';
import PropTypes from 'prop-types';

const Entry = ({ id, amount, category, date, description }) => (
  <div className="entry">
    <div className="entry__top-half">
      <div className="entry__description">{ description }</div>
      <div className="entry__date">{ date }</div>
      <div className="entry__category">{ category } </div>
    </div>
    <div className="entry__bottom-half">
      <div className="entry__amount">${ amount }</div>
      <div className="entry__edit">ED</div>
      <div className="entry__delete">DE</div>
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
