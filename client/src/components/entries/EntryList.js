import React from 'react';
import PropTypes from 'prop-types';

import Entry from './Entry';

const EntryList = ({ entries }) => (
  <div className="entry__container">
    {
      entries.map(entry => (
        <Entry
          key={entry.id}
          amount={entry.amount}
          category={entry.category}
          date={entry.date}
          description={entry.description}
        />
      ))
    }
  </div>
);

EntryList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      amount: PropTypes.number,
      category: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.description
    })
  ).isRequired
};

export default EntryList;
