import React from 'react';
import PropTypes from 'prop-types';

import formatMoney from '../../helpers/formatMoney';

const SavingsCard = ({ income, expenses }) => (
  <div className="savings-card">
    <h2 className="savings-card__heading">Total Income: ${formatMoney(income)}</h2>
    <h2 className="savings-card__heading">Total Expenses: ${formatMoney(expenses)}</h2>
    <div className="savings-card__divider" />
    <h2 className="savings-card__heading">Total Savings: ${formatMoney(income - expenses)}</h2>
  </div>
);

SavingsCard.propTypes = {
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired
};

export default SavingsCard;
