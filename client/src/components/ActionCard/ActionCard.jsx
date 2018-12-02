import React from 'react';

import './ActionCard.scss';

const ActionCard = ({ title, text }) => (
  <aside className="action-card">
    <h3 className="action-card__title">{title}</h3>
    <p className="action-card__text">{text}</p>
  </aside>
);

export default ActionCard;
