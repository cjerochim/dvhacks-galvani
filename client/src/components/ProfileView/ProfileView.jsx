import React, { Component } from 'react';
import { map, prop, dropLast } from 'ramda';

import Chart from '../Chart/Chart';
import View from '../View/View';
import ActionListContainer from '../../containers/ActionListContainer';

import './ProfileView.scss';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onMonth = this.onMonth.bind(this);
    this.onWeek = this.onWeek.bind(this);
  }

  // Batch data to generate historical data of user
  componentDidMount() {
    const { requestData } = this.props;
    requestData();
  }

  // on a column being selected
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
    const { date, data, type } = this.props;
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

export default ProfileView;
