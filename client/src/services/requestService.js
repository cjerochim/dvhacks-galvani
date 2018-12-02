import request from 'axios';

// Select Axios over fetch due to the ease for unit testing
// And simplicity when you need to right code fast

// TODO: move into a env file
const PREDICTIONS_PATH = 'https://ueyjp57nvj.execute-api.us-west-1.amazonaws.com/dev/predictions';
const PREDICTION_PATH = 'https://ueyjp57nvj.execute-api.us-west-1.amazonaws.com/dev/predict';

const requestBatchPredictions = obj => request.post(PREDICTIONS_PATH, obj);

const requestPrediction = obj => request.post(PREDICTION_PATH, obj);

export default {
  requestBatchPredictions,
  requestPrediction,
};
