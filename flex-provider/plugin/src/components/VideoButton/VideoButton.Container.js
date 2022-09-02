import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../states/VideoButtonState';
import VideoButton from './VideoButton';

const mapStateToProps = (state) => ({
  shouldShowTelehealth: state['hls-emr'].videoButton.shouldShowTelehealth
});

const mapDispatchToProps = (dispatch) => ({
  toggleTelehealth: bindActionCreators(Actions.toggleTelehealth, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoButton);