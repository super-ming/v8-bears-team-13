import React from 'react';
import PropTypes from 'prop-types';

import Entry from './Entry';

const EntryList = ({ entries, editEntry }) => (
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
          type={entry.transact_id}
          editEntry={editEntry}
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
  ).isRequired, 
  editEntry: PropTypes.func
};

export default EntryList;
