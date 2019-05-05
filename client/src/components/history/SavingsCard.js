import React from 'react';
import PropTypes from 'prop-types';

import formatMoney from '../../helpers/formatMoney';

const SavingsCard = ({ income, expenses }) => (
  <div className="savings-card">
    <h2 className="savings-card__heading">
      Total Income: <span className="savings-card__amount">{formatMoney(income)}</span>
    </h2>
    <h2 className="savings-card__heading">
      Total Expenses: <span className="savings-card__amount">{formatMoney(expenses)}</span>
    </h2>
    <div className="savings-card__divider" />
    <h2 className="savings-card__heading">
      Total Savings:{' '}
      <span
        className={
          income - expenses >= 0
            ? 'savings-card__amount green-text'
            : 'savings-card__amount red-text'
        }
      >
        {formatMoney(income - expenses)}
      </span>
    </h2>
  </div>
);

SavingsCard.propTypes = {
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired
};

export default SavingsCard;
