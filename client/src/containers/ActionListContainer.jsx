import { connect } from 'react-redux';
import ActionList from '../components/ActionList/ActionList';

const mapStateToProps = ({ app: { actions } }) => ({ actions });

export default connect(mapStateToProps, null)(ActionList);
