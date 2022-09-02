import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTION_FETCHING_FHIR, TaskActions } from "../../states/TaskState";
import { Actions } from "../../states/CustomPanel2State";
import CustomPanel2 from "./CustomPanel2";

// Use Redux to attach these states to the component
const mapStateToProps = (state) => ({
  accessTokenInfo: state["hls-emr"].taskState.accessTokenInfo,
  clientId: state["hls-emr"].taskState.clientId,
  patientInfo: state["hls-emr"].taskState.patientInfo,
  isFhirRequestPending: state["hls-emr"].taskState.fetching,
  shouldShowPanel: state["hls-emr"].customPanel2.shouldShowPanel,
  shouldShowTelehealth: state["hls-emr"].videoButton.shouldShowTelehealth,
});

// Just matches the Dispatch which is the action to perform on the component
const mapDispatchToProps = (dispatch) => ({
  fetchingFhirData: bindActionCreators(TaskActions.fetchingFhirData, dispatch),
  fetchingFhirDataSuccess: bindActionCreators(
    TaskActions.fetchingFhirDataSuccess,
    dispatch
  ),
  fetchingFhirDataFailure: bindActionCreators(
    TaskActions.fetchingFhirDataFailure,
    dispatch
  ),
  togglePanel: bindActionCreators(Actions.togglePanel, dispatch),
});

// Sends back the CustomPanel2 Component with State
export default connect(mapStateToProps, mapDispatchToProps)(CustomPanel2);
