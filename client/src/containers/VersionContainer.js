import { connect } from 'react-redux';
import Version from '../components/Version/Version';

const mapStateToProps = ({ app: { version } }) => ({ version });

export default connect(mapStateToProps, null)(Version);
