import React from 'react';

import ActionCard from '../ActionCard/ActionCard';

import './ActionList.scss';

const ActionList = ({ list }) => (
  <section className="action-list">
    <h3 className="action-list__title">Action</h3>
    <ul className="action-list__list">
      {list.map(card => <li key={card.id}><ActionCard {...card} /></li>)}
    </ul>
  </section>
);

export default ActionList;
