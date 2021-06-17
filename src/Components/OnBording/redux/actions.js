import { createAction } from "redux-actions";

// Action type

const COMPANY_TYPE_REQUEST = "CAPMTECH/COMPANY_TYPE_REQUEST";
const COMPANY_TYPE_REQUEST_SUCCESS = "CAPMTECH/COMPANY_TYPE_REQUEST_SUCCESS";
const COMPANY_TYPE_REQUEST_FAILED = "CAPMTECH/COMPANY_TYPE_REQUEST_FAILED";

const VERIFY_EMAIL_REQUEST = "CAPMTECH/VERIFY_EMAIL_REQUEST";
const VERIFY_EMAIL_REQUEST_SUCCESS = "CAPMTECH/VERIFY_EMAIL_REQUEST_SUCCESS";
const VERIFY_EMAIL_REQUEST_FAILED = "CAPMTECH/VERIFY_EMAIL_REQUEST_FAILED";

const INS_UPDATE_DELETE_API_REQUEST = "CAPMTECH/INS_UPDATE_DELETE_API_REQUEST";
const INS_UPDATE_DELETE_API_SUCCESS = "CAPMTECH/INS_UPDATE_DELETE_API_SUCCESS";
const INS_UPDATE_DELETE_API_FAILED = "CAPMTECH/INS_UPDATE_DELETE_API_FAILED";

const SEND_OTP_ACTION_REQUEST = "CAPMTECH/SEND_OTP_ACTION_REQUEST";
const SEND_OTP_ACTION_SUCCESS = "CAPMTECH/SEND_OTP_ACTION_SUCCESS";
const SEND_OTP_ACTION_FAILED = "CAPMTECH/SEND_OTP_ACTION_FAILED";

const VERIFY_OTP_REQUEST = "CAPMTECH/VERIFY_OTP_REQUEST";
const VERIFY_OTP_SUCCESS = "CAPMTECH/VERIFY_OTP_SUCCESS";
const VERIFY_OTP_FAILED = "CAPMTECH/VERIFY_OTP_FAILED";

const INSERTCERIFICATEDETAILS_REQUEST =
  "CAPMTECH/INSERTCERIFICATEDETAILS_REQUEST";
const INSERTCERIFICATEDETAILS_SUCCESS =
  "CAPMTECH/INSERTCERIFICATEDETAILS_SUCCESS";
const INSERTCERIFICATEDETAILS_FAILED =
  "CAPMTECH/INSERTCERIFICATEDETAILS_FAILED";



const GET_ASSIGN_TASK_DATA_REQUEST = 'CAPMTECH/GET_ASSIGN_TASK_DATA_REQUEST';
const GET_ASSIGN_TASK_DATA_REQUEST_SUCCESS = 'CAPMTECH/GET_ASSIGN_TASK_DATA_REQUEST_SUCCESS';
const GET_ASSIGN_TASK_DATA_REQUEST_FAILED = 'CAPMTECH/GET_ASSIGN_TASK_DATA_REQUEST_FAILED';

const UPDATE_MOBILE_NUMBER_OTP_REQUEST = 'CAPMTECH/UPDATE_MOBILE_NUMBER_OTP_REQUEST';
const UPDATE_MOBILE_NUMBER_OTP_REQUEST_SUCCESS = 'CAPMTECH/UPDATE_MOBILE_NUMBER_OTP_REQUEST_SUCCESS';
const UPDATE_MOBILE_NUMBER_OTP_REQUEST_FAILED = 'CAPMTECH/UPDATE_MOBILE_NUMBER_OTP_REQUEST_FAILED';



const INSERT_TASK_DATA_REQUEST = 'CAPMTECH/INSERT_TASK_DATA_REQUEST';
const INSERT_TASK_DATA_REQUEST_SUCCESS = 'CAPMTECH/INSERT_TASK_DATA_REQUEST_SUCCESS';
const INSERT_TASK_DATA_REQUEST_FAILED = 'CAPMTECH/INSERT_TASK_DATA_REQUEST_FAILED';


const SEND_MAIL_TASK_REQUEST = 'CAPMTECH/SEND_MAIL_TASK_REQUEST';
const SEND_MAIL_TASK_REQUEST_SUCCESS = 'CAPMTECH/SEND_MAIL_TASK_REQUEST_SUCESS';
const SEND_MAIL_TASK_REQUEST_FAILED = 'CAPMTECH/SEND_MAIL_TASK_REQUEST_FAILED';


const GOVERNANCEDATA_REQUEST = 'CAPMTECH/GOVERNANCEDATA_REQUEST';
const GOVERNANCEDATA_REQUEST_FAILED = 'CAPMTECH/GOVERNANCEDATA_REQUEST_FAILED';
const GOVERNANCEDATA_REQUEST_SUCCESS = 'CAPMTECH/GOVERNANCEDATA_REQUEST_SUCCESS';
// Action method

const STORE_ENTITYID = 'CAPMTECH/STORE_ENTITYID';

const createTaskMailRequest = createAction(SEND_MAIL_TASK_REQUEST);
const createTaskMailRequestSuccess = createAction(SEND_MAIL_TASK_REQUEST_SUCCESS);
const createTaskMailRequestFailed = createAction(SEND_MAIL_TASK_REQUEST_FAILED);

const insertTaskListRequest = createAction(INSERT_TASK_DATA_REQUEST);
const insertTaskListRequestSuccess = createAction(INSERT_TASK_DATA_REQUEST_SUCCESS);
const insertTaskListRequestFailed = createAction(INSERT_TASK_DATA_REQUEST_FAILED);

const storeEnityIDwithCompaName = createAction(STORE_ENTITYID);

const insertCerificateDetailsRequest = createAction(INSERTCERIFICATEDETAILS_REQUEST);
const insertCerificateDetailsRequestSuccess = createAction(INSERTCERIFICATEDETAILS_SUCCESS);
const insertCerificateDetailsRequestFailed = createAction(INSERTCERIFICATEDETAILS_FAILED);

const companyTypeRequest = createAction(COMPANY_TYPE_REQUEST);
const companyTypeRequestSuccess = createAction(COMPANY_TYPE_REQUEST_SUCCESS);
const companyTypeRequestFailed = createAction(COMPANY_TYPE_REQUEST_FAILED);

const sendOTPRequest = createAction(SEND_OTP_ACTION_REQUEST);
const sendOTPRequestSuccess = createAction(SEND_OTP_ACTION_SUCCESS);
const sendOTPRequestFailed = createAction(SEND_OTP_ACTION_FAILED);

const updatePhoneNumberOTPRequest = createAction(UPDATE_MOBILE_NUMBER_OTP_REQUEST);
const updatePhoneNumberOTPRequestSuccess = createAction(UPDATE_MOBILE_NUMBER_OTP_REQUEST_SUCCESS);
const updatePhoneNumberOTPRequestFailed = createAction(UPDATE_MOBILE_NUMBER_OTP_REQUEST_FAILED)

// Action method
const verifyEmailRequest = createAction(VERIFY_EMAIL_REQUEST);
const verifyEmailRequestSuccess = createAction(VERIFY_EMAIL_REQUEST_SUCCESS);
const verifyEmailRequestFailed = createAction(VERIFY_EMAIL_REQUEST_FAILED);

const insUpdateDeletAPIRequest = createAction(INS_UPDATE_DELETE_API_REQUEST);
const insUpdateDeletAPIRequestSuccess = createAction(INS_UPDATE_DELETE_API_SUCCESS);
const insUpdateDeletAPIRequestFailed = createAction(INS_UPDATE_DELETE_API_FAILED);

const verifyOTPRequest = createAction(VERIFY_OTP_REQUEST);
const verifyOTPRequestSuccess = createAction(VERIFY_OTP_SUCCESS);
const verifyOTPRequestFailed = createAction(VERIFY_OTP_FAILED);


const getAssignTaskDataReuest = createAction(GET_ASSIGN_TASK_DATA_REQUEST);
const getAssignTaskDataReuestSuccess = createAction(GET_ASSIGN_TASK_DATA_REQUEST_SUCCESS);
const getAssignTaskDataReuestFailed = createAction(GET_ASSIGN_TASK_DATA_REQUEST_FAILED);


const governanceAPIRequest = createAction(GOVERNANCEDATA_REQUEST);
const governanceAPIRequestSuccess = createAction(GOVERNANCEDATA_REQUEST_SUCCESS);
const governanceAPIRequestFailed = createAction(GOVERNANCEDATA_REQUEST_FAILED);


export const actions = {
  storeEnityIDwithCompaName,
  governanceAPIRequest,
  governanceAPIRequestSuccess,
  governanceAPIRequestFailed,

  updatePhoneNumberOTPRequest,
  updatePhoneNumberOTPRequestFailed,
  updatePhoneNumberOTPRequestSuccess,

  getAssignTaskDataReuest,
  getAssignTaskDataReuestSuccess,
  getAssignTaskDataReuestFailed,

  insertCerificateDetailsRequest,
  insertCerificateDetailsRequestFailed,
  insertCerificateDetailsRequestSuccess,

  createTaskMailRequest,
  createTaskMailRequestSuccess,
  createTaskMailRequestFailed,

  verifyEmailRequest,
  verifyEmailRequestSuccess,
  verifyEmailRequestFailed,

  insUpdateDeletAPIRequest,
  insUpdateDeletAPIRequestSuccess,
  insUpdateDeletAPIRequestFailed,

  companyTypeRequest,
  companyTypeRequestSuccess,
  companyTypeRequestFailed,

  sendOTPRequest,
  sendOTPRequestFailed,
  sendOTPRequestSuccess,

  verifyOTPRequest,
  verifyOTPRequestFailed,
  verifyOTPRequestSuccess,

  insertTaskListRequest,
  insertTaskListRequestSuccess,
  insertTaskListRequestFailed,
};

export const types = {
  STORE_ENTITYID,

  GOVERNANCEDATA_REQUEST,
  GOVERNANCEDATA_REQUEST_FAILED,
  GOVERNANCEDATA_REQUEST_SUCCESS,

  UPDATE_MOBILE_NUMBER_OTP_REQUEST,
  UPDATE_MOBILE_NUMBER_OTP_REQUEST_FAILED,
  UPDATE_MOBILE_NUMBER_OTP_REQUEST_SUCCESS,

  GET_ASSIGN_TASK_DATA_REQUEST,
  GET_ASSIGN_TASK_DATA_REQUEST_FAILED,
  GET_ASSIGN_TASK_DATA_REQUEST_SUCCESS,

  INSERT_TASK_DATA_REQUEST,
  INSERT_TASK_DATA_REQUEST_SUCCESS,
  INSERT_TASK_DATA_REQUEST_FAILED,

  INSERTCERIFICATEDETAILS_FAILED,
  INSERTCERIFICATEDETAILS_REQUEST,
  INSERTCERIFICATEDETAILS_SUCCESS,

  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_FAILED,

  SEND_OTP_ACTION_REQUEST,
  SEND_OTP_ACTION_SUCCESS,
  SEND_OTP_ACTION_FAILED,

  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_REQUEST_SUCCESS,
  VERIFY_EMAIL_REQUEST_FAILED,

  INS_UPDATE_DELETE_API_REQUEST,
  INS_UPDATE_DELETE_API_SUCCESS,
  INS_UPDATE_DELETE_API_FAILED,

  COMPANY_TYPE_REQUEST,
  COMPANY_TYPE_REQUEST_SUCCESS,
  COMPANY_TYPE_REQUEST_FAILED,

  SEND_MAIL_TASK_REQUEST,
  SEND_MAIL_TASK_REQUEST_FAILED,
  SEND_MAIL_TASK_REQUEST_SUCCESS,
};
