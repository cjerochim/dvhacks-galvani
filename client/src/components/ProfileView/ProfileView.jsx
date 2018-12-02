import React, { Component } from 'react';
import { map, prop, dropLast } from 'ramda';

import Chart from '../Chart/Chart';
import View from '../View/View';
import ActionListContainer from '../../containers/ActionListContainer';

import './ProfileView.scss';

class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: true,
    };

    this.onSelect = this.onSelect.bind(this);
    this.onMonth = this.onMonth.bind(this);
    this.onWeek = this.onWeek.bind(this);
  }

  // Batch data to generate historical data of user
  componentDidMount() {
    const { requestData } = this.props;
    requestData();
  }


  componentDidUpdate(prevProps) {
    const { type } = this.props;
    // Due to the weird animation from high-charts when transition between states
    // Toggling isActive for charts to fade and reveal on transitions
    if (prevProps.type !== type) {
      // Hide Chart
      this.setState({ isActive: false });

      setTimeout(() => {
        // Reveal chart
        this.setState({ isActive: true });
      }, 200);
    }
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

    const { isActive } = this.state;
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
            isActive={isActive}
          />
          <ActionListContainer />
        </div>
      </View>
    );
  }
}

export default ProfileView;
