import React from 'react';

import Entry from './Entry';

const EntryList = () => (
  <div className="entry__container">
    <Entry
      id={1}
      amount={100.25}
      category="lucky"
      date="April 7, 2018"
      description="Won the lottery and became a millionaire"
    />
    <Entry
      id={2}
      amount={-100.25}
      category="restaurant"
      date="April 5, 2018"
      description="Dinner at fancy restaurant"
    />
  </div>
);

export default EntryList;
