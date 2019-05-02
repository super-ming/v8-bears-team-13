import React from 'react';
import PropTypes from 'prop-types';

import Entry from './Entry';

const EntryList = ({ entries, editEntry }) => (
  <div className="entry__container">
    { entries && 
      entries.map(entry => (
        <Entry
          key={entry.id}
          entryId={entry.id}
          userId={entry.userId}
          amount={entry.amount}
          categoryId={entry.category_id}
          categoryDesc={entry.category_desc}
          date={entry.full_date.substring(0, 10)}
          description={entry.entry_desc}
          type={entry.transact_id}
          editEntry={editEntry}
          entryDetails={entry}
        />
      ))
    }
  </div>
);

EntryList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      amount: PropTypes.string,
      category: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.description
    })
  ).isRequired,
  editEntry: PropTypes.func.isRequired
};

export default EntryList;
