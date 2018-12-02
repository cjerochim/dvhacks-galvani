import { connect } from 'react-redux';
import Loader from '../components/Loader/Loader';

const mapStateToProps = ({ app: { isRequesting } }) => ({ isRequesting });

export default connect(mapStateToProps, null)(Loader);
