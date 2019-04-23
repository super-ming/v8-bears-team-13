import React from 'react';
import PropTypes from 'prop-types';

const SavingsCard = ({ income, expenses }) => {
  return (
    <div className="savings-card">
      <h2 className="savings-card__heading">Total Income: ${income}</h2>
      <h2 className="savings-card__heading">Total Expenses: ${expenses}</h2>
      <div className="savings-card__divider" />
      <h2 className="savings-card__heading">Total Savings: ${income - expenses}</h2>
    </div>
  );
};

SavingsCard.propTypes = {
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired
};

export default SavingsCard;
