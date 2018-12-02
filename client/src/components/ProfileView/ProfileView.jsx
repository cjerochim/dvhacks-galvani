import React, { Component } from 'react';
import { range, compose, map } from 'ramda';

import Chart from '../Chart/Chart';
import View from '../View/View';
import ActionList from '../ActionList/ActionList';

import './ProfileView.scss';

import utils from './utils';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    
    // TODO: Clean up, not ideal for running initial data for dispaly
    const date = '2018-02-05';
    const type = 'week';
    const categories = type === 'month' ? utils.getDaysForMonth(date) : utils.getDaysForWeek(date);
    // Generate data
    const randomValueGen = () => utils.randomRange(0, 0.1);
    const data = compose(map(randomValueGen), range(0))(categories.length);

    this.state = {
      date,
      type,
      categories,
      data,
    };


    this.onSelect = this.onSelect.bind(this);
    this.onMonth = this.onMonth.bind(this);
    this.onWeek = this.onWeek.bind(this);
  }

  onSelect(category) {
    console.log('select', category);
  }

  onMonth() {
    const { date } = this.state;
    const categories = utils.getDaysForMonth(date);
    const randomValueGen = () => utils.randomRange(0, 0.1);
    const data = compose(map(randomValueGen), range(0))(categories.length);
    this.setState({ type: 'month', categories, data });
  }

  onWeek() {
    const { date } = this.state;
    const categories = utils.getDaysForWeek(date);
    const randomValueGen = () => utils.randomRange(0, 0.1);
    const data = compose(map(randomValueGen), range(0))(categories.length);
    this.setState({ type: 'week', categories, data });
  }

  render() {
    const {
      date,
      type,
      categories,
      data,
    } = this.state;

    const { actions } = this.props;

    return (
      <View>
        <div className="profile">
          <Chart
            date={date}
            type={type}
            onWeek={this.onWeek}
            onMonth={this.onMonth}
            onSelect={this.onSelect}
            categories={categories}
            data={data}
          />

          <ActionList list={actions} />
        </div>
      </View>
    );
  }
}

ProfileView.defaultProps = {
  actions: [{
    id: 'ewqewrq',
    title: 'Activate Snooze mode for emails between 7pm and 10am',
    text: 'Implemented on the 7-11-2018',
  },
  {
    id: '3255qewrq',
    title: 'Activate Snooze mode for emails between 7pm and 10am',
    text: 'Implemented on the 7-11-2018',
  }],
};

export default ProfileView;
