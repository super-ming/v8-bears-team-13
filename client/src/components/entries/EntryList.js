import React from 'react';
import PropTypes from 'prop-types';

import Entry from './Entry';

const EntryList = ({ entries }) => (
  <div className="entry__container">
    { entries && 
      entries.map(entry => (
        <Entry
          key={entry.id}
          id={entry.userId}
          amount={entry.amount}
          category={entry.category_desc}
          date={entry.full_date.substring(0, 10)}
          description={entry.entry_desc}
        />
      ))
    }
  </div>
);

EntryList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      amount: PropTypes.string,
      category: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.description
    })
  ).isRequired
};

export default EntryList;
