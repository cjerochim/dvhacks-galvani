import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './Chart.scss';

// TODO - Add propTypes
const Chart = ({
  date,
  type,
  categories,
  data,
  onSelect,
  onWeek,
  onMonth,
}) => {


  // TODO: Move into separate file
  const options = {
    chart: {
      type: 'column',
    },
    colors: ['#c6c6c6'],
    tooltip: {
      enabled: false,
    },
    xAxis: {
      categories,
    },
    title: {
      text: '',
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        states: {
          hover: {
            color: '#B49BFF',
          },
          select: {
            color: '#6C45E0',
          },
        },
      },
      series: {
        cursor: 'pointer',
        allowPointSelect: true,
        point: {
          events: {
            click({ point: { category } }) {
              onSelect(category);
            },
          },
        },
      },
    },
    series: [{
      showInLegend: false,
      data,
    }],
  };

  // Manage button visual state
  const btnWeek = classnames('chart__btn', { 'is--active': type === 'week' });
  const btnMonth = classnames('chart__btn', { 'is--active': type === 'month' });

  return (
    <section className="chart">
      <header className="chart__header">
        <h2 className="chart__title chart__title--primary">Timeline</h2>
        <nav className="chart__nav">
          <ul className="chart__nav-list">
            <li><button className={btnWeek} onClick={onWeek}>Week</button></li>
            <li><button className={btnMonth} onClick={onMonth}>Month</button></li>
          </ul>
        </nav>
      </header>
      <div className="chart__body">
        <div className="chart__container">
          <h3 className="chart__title chart__title--secondary">
            {type === 'month' ? moment(date).format('MMMM YYYY') : moment(date).format('dddd Do YYYY') }
          </h3>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </section>
  );
};

export default Chart;
