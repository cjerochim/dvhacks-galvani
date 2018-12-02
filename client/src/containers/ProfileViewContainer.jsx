import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestData, setViewType, selectDay } from '../redux/reducers/appReducer';

import ProfileView from '../components/ProfileView/ProfileView';

const mapStateToProps = ({ app: { date, data, type } }) => ({ date, data, type });

const mapDispatchToProps = dispatch => bindActionCreators({
  requestData,
  setViewType,
  selectDay,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
