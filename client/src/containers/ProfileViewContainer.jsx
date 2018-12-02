import { connect } from 'react-redux';
import ProfileView from '../components/ProfileView/ProfileView';

const mapStateToProps = ({ app: { date, data, type } }) => ({ date, data, type });

export default connect(mapStateToProps, null)(ProfileView);
