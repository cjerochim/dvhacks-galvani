import React, { Component } from 'react';
import { map, prop, dropLast } from 'ramda';

import Chart from '../Chart/Chart';
import View from '../View/View';
import ActionListContainer from '../../containers/ActionListContainer';
// import ActionList from '../ActionList/ActionList';

import './ProfileView.scss';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onMonth = this.onMonth.bind(this);
    this.onWeek = this.onWeek.bind(this);
  }

  componentDidMount() {
    const { requestData } = this.props;
    requestData();
  }

  onSelect(date) {
    const { selectDay } = this.props;
    selectDay(date);
  }

  onMonth() {
    const { setViewType } = this.props;
    setViewType('month');
  }

  onWeek() {
    const { setViewType } = this.props;
    setViewType('week');
  }

  render() {
    // const { categories } = this.state;
    const { actions, date, data, type } = this.props;

    // Quick hack to show month vs year
    const results = type === 'month' ? data : dropLast(data.length - 7, data);
    // Quick hack to generate the formatting of the dates for week and month
    const categories = map(prop('date'))(results);
    // display sentiment
    const sentimentResults = map(prop('sentiment'))(results);

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
            data={sentimentResults}
          />
          <ActionListContainer />
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
