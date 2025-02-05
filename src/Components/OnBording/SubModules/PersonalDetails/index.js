import React, { useState } from "react";
import "./style.css";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import { useDispatch, useSelector } from "react-redux";
import { isEmail, checkPersonalDetailsForm } from "../../utils.js";
import { actions as personalDetailsAction } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import SideBarInputControl from "../SideBarInputControl";
import api from "../../../../apiServices";
import { toast } from "react-toastify";
import MobileStepper from "../mobileStepper";

function PersonalDetails({ history }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  //const guestUser = state && state.auth && state.auth.guestUser;
  const quote_id = state && state.auth && state.auth.quote_id;
  const [isValidate, setIsValidate] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    mobileNumber: "",
    countryCode: "+91",
    companyName: "",
    designation: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    passwordErr: "",
    confirmPasswordErr: "",
    mobileNumErr: "",
    countryCodeErr: "",
    designationErr: "",
  });
  const [whatappFlag, setWhatappFlag] = useState(false);
  const [isCompanyNameValid, setIsCompanyNameValid] = useState(true);
  const [passwordState, setPasswordState] = useState({
    minlength: false,
    uppercaseandlowercase: false,
    alphabetsandigit: false,
  });
  // console.log(values, errors)
  const [countryCode, setCountryCode] = useState("+91");
  const onChangeHandler = (name) => (event) => {
    if (name === "fullName" || name === "designation") {
      const re = /^[a-z|A-Z_ ]*$/;
      if (event.target.value && !re.test(event.target.value)) {
        return "";
      }
    }
    const re = /^(?=.*\S).+$/;
    if (
      event.target.value !== "" &&
      !re.test(event.target.value) &&
      name === "companyName"
    ) {
      return "";
    }
    if (name === "countryCode") {
      // console.log("inner CounryCode")
      const re = /[\d\+]+/;
      // const re =  /^[0-9!@#$&()-`.+,/\"]*$/;
      // console.log("event.target.value",);
      if (event.target.value && !re.test(event.target.value)) {
        return "";
      }
    }

    if (name === "mobileNumber") {
      let inputKey = "mobileNumErr";
      // console.log(event.target.value);
      if (event.target.value > 0 && event.target.value < 9) {
      } else if (event.target.value == 10) {
      }
    }
    const mobileNumberReg = /^[0-9]{0,10}$/;
    // let passwordRE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    let passwordRE =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,16}$/;
    if (name === "mobileNumber") {
      if (!mobileNumberReg.test(event.target.value)) {
        return "";
      }
    }
    if (name === "password") {
      let minlength = "minlength";
      let alphabetsandigit = "alphabetsandigit";
      let uppercaseandlowercase = "uppercaseandlowercase";
      let inputKey = "passwordErr";
      if (!passwordRE.test(event.target.value)) {
        setErrors({ ...errors, [inputKey]: "Password is invalid" });
      } else {
        setErrors({ ...errors, [inputKey]: "" });
      }
      if (event.target.value.length < 8) {
        setPasswordState((prevState) => ({ ...prevState, [minlength]: false }));
      } else {
        setPasswordState((prevState) => ({ ...prevState, [minlength]: true }));
      }

      let uppercaseandlowercaseRE =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if (uppercaseandlowercaseRE.test(event.target.value)) {
        setPasswordState((prevState) => ({
          ...prevState,
          [alphabetsandigit]: true,
          [uppercaseandlowercase]: true,
        }));
      } else {
        if (/^[a-z]*$/.test(event.target.value)) {
          setPasswordState((prevState) => ({
            ...prevState,
            [alphabetsandigit]: false,
            [uppercaseandlowercase]: false,
          }));
        } else if (
          /^[a-zA-Z]*$/.test(event.target.value) &&
          /(?=.*?[A-Z])(?=.*?[a-z])./.test(event.target.value)
        ) {
          // else if (/(?=.*?[A-Z])(?=.*?[a-z])./.test(event.target.value)) {
          setPasswordState((prevState) => ({
            ...prevState,
            [alphabetsandigit]: false,
            [uppercaseandlowercase]: true,
          }));
        } else if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/.test(event.target.value)
        ) {
          setPasswordState((prevState) => ({
            ...prevState,
            [alphabetsandigit]: true,
            [uppercaseandlowercase]: true,
          }));
        } else if (/(?=.*?[A-Za-z])(?=.*?[0-9])/.test(event.target.value)) {
          // else if (/(?=.*?[A-Za-z])(?=.*?[0-9])./.test(event.target.value)) {
          setPasswordState((prevState) => ({
            ...prevState,
            [alphabetsandigit]: true,
            [uppercaseandlowercase]: false,
          }));
        }
        // else if (/^[A-Z0-9]*$/.test(event.target.value)) {
        //   setPasswordState(prevState => ({
        //     ...prevState, [alphabetsandigit]: true, [uppercaseandlowercase]: false
        //   }));
        // }
        else {
          setPasswordState((prevState) => ({
            ...prevState,
            [alphabetsandigit]: false,
            [uppercaseandlowercase]: false,
          }));
        }
      }
    }
    if (name === "confirmPassword") {
      let inputKey = "confirmPasswordErr";
      if (!passwordRE.test(event.target.value)) {
        setErrors({ ...errors, [inputKey]: "Confirm password is invalid" });
      } else {
        setErrors({ ...errors, [inputKey]: "" });
      }
    }
    setValues({ ...values, [name]: event.target.value });
  };

  const handleWhatsappChange = (event) => {
    setWhatappFlag(event.target.checked);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };
  const errorMessage =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.message;
  const email = localStorage.getItem("coemail");
  const onSubmit = () => {
    setIsValidate(true);
    if (checkPersonalDetailsForm(values)) {
      return;
    }
    if (
      errors.passwordErr !== "" ||
      errors.confirmPasswordErr !== "" ||
      errors.countryCodeErr === "true"
    ) {
      return "";
    }
    setIsValidate(false);
    if (email) {
      let countryCode;
      let strr = values.countryCode;
      // countryCode = strr.replace(/\D/g, '');
      countryCode = strr;
      dispatch(
        personalDetailsAction.insUpdateDeletAPIRequest({
          entityName: values.companyName,
          adminName: values.fullName,
          adminEmail: email,
          adminMobile: values.mobileNumber,
          adminPWD: values.password,
          isClientTypeUser: 0,
          userType: 3,
          actionFlag: 1,
          designation: values.designation,
          userID: "",
          history,
          from: "personal-details-co",
          whatsupFlag: whatappFlag ? 1 : 0,
          countrycode:
            countryCode === "" || countryCode === "+" ? "+91" : countryCode,
        })
      );
    } else {
      toast.error("Please verify your email");
      return "";
    }
  };

  const validateCompanyName = (e) => {
    let payload = {
      loginID: e.target.value,
      pwd: "",
      rememberme: 0,
      loginty: "AdminCompany",
      countrycode: values.countryCode,
    };
    api
      .post("/api/availabilityCheck", payload)
      .then(function (response) {
        // handle success
        if (response && response.data && response.data.Status === "True") {
          setIsCompanyNameValid(false);
        } else {
          setIsCompanyNameValid(true);
        }
      })
      .catch(function (error) {
        if (error) {
          setIsCompanyNameValid(false);
        }
      });
  };

  const validateCountryCode = (e) => {
    let strr = e.target.value;
    let str = strr.replace(/\D/g, "");
    console.log("str => ", strr);

    if (str === "") {
      str = "91";
    }
    // str = str.substring(1);
    // console.log("str =",str);
    let payload = {
      cntryCode: str,
    };
    console.log(payload);
    api
      .post("/api/CountryCodeCheck", payload)
      .then(function (response) {
        // handle success
        if (response && response.data && response.data.Status === "True") {
          setCountryCode(true);
          let inputKey = "countryCodeErr";
          setErrors({ ...errors, [inputKey]: "" });
        } else {
          setCountryCode(false);
          // setErrors(errors);
          let inputKey = "countryCodeErr";
          setErrors({ ...errors, [inputKey]: "true" });
        }
      })
      .catch(function (error) {
        if (error) {
          // setIsCompanyNameValid(false);
        }
      });
  };
  // console.log("errors => ",errors);
  return (
    <div className="row get-mobile-personal-detail">
      <div className="col-3 col-sm-4 col-md-4 col-xl-3 left-fixed">
        <div className="on-boarding">
          {/* <SideBar /> */}
          <SideBarInputControl currentStep={1} />
        </div>
      </div>
      <div className="col-12 padding-right">
        <img
          className="bottom-right-bg"
          src={RightImageBg}
          alt="RightImageBg"
        />
        <div className="get-main-personal-detail">
          <div className="container">
            <div className="">
              <div className="get-started-header">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="header_logo">
                      {/* <a href="#" style={{'cursor': 'auto'}}> */}
                      <img
                        src={comtech}
                        alt="COMPLIANCE SUTRA"
                        title="COMPLIANCE SUTRA"
                      />
                      <span className="camp">COMPLIANCE SUTRA</span>
                      {/* </a> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-sm-none mobile-steper ">
                <MobileStepper currentStep={1} />
              </div>
              <div className="bottom-logo-strip-parent-fix">
                <div className="wrapper_login">
                  <p className="login_title">Tell us a bit about yourself</p>
                  <div className="form_section about-your-self">
                    <div className="row">
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="FullName">Full Name </label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (isValidate && values.fullName === ""
                                ? "input-error"
                                : "") +
                              (values.fullName !== ""
                                ? " activeForm-control"
                                : "")
                            }
                            id="FullName"
                            placeholder="Enter your full name"
                            value={values.fullName}
                            onChange={onChangeHandler("fullName")}
                            onKeyPress={(e) => handleKeyDown(e)}
                          />
                          {isValidate && values.fullName === "" && (
                            <p className="input-error-message">
                              Full name is required
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="MobileNumber">Mobile Number</label>
                          <div className="d-flex">
                            <input
                              type="text"
                              className={
                                "form-control plus-pin" +
                                (values.countryCode !== "" &&
                                errors.countryCodeErr === "true"
                                  ? " invalid-plus-pin"
                                  : " ") +
                                (values.countryCode !== "" &&
                                errors.countryCodeErr === ""
                                  ? " countryCode-sucess"
                                  : " ")
                              }
                              id="countryCode"
                              name="countryCode"
                              maxLength="3"
                              // placeholder="+91"
                              // defaultValue="+91"
                              value={values.countryCode}
                              onChange={onChangeHandler("countryCode")}
                              onBlur={(e) => validateCountryCode(e)}
                            />

                            <input
                              type="text"
                              className={
                                "form-control " +
                                (values.mobileNumber !== "" &&
                                values.mobileNumber.length < 10
                                  ? " mobile-input-invalid-control"
                                  : " ") +
                                " dropdown-phone" +
                                ((isValidate && values.mobileNumber === "") ||
                                (isValidate &&
                                  values.mobileNumber !== "" &&
                                  values.mobileNumber.length < 10)
                                  ? " input-error"
                                  : "") +
                                (values.mobileNumber.length == 10
                                  ? " success-input-form-control"
                                  : "")
                              }
                              id="MobileNumber"
                              placeholder="Enter your mobile number"
                              value={values.mobileNumber}
                              onChange={onChangeHandler("mobileNumber")}
                              onKeyPress={(e) => handleKeyDown(e)}
                            />
                          </div>
                          {/* {
                        values.mobileNumber === "" && values.countryCode !== "" && 
                         errors.countryCodeErr === "true" && (
                          <p className="input-error-message">
                             Country code is invalid
                          </p>
                        )
                      } */}
                          {values.countryCode != "" &&
                            errors.countryCodeErr == "true" && (
                              <p className="input-error-message">
                                Invalid country code
                              </p>
                            )}
                          {isValidate && values.mobileNumber === "" && (
                            <p className="input-error-message">
                              Mobile number is required
                            </p>
                          )}
                          {values.mobileNumber !== "" &&
                            values.mobileNumber.length < 10 && (
                              <p className="input-error-message">
                                Mobile number is invalid
                              </p>
                            )}
                        </div>
                      </div>
                      {/* <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="MobileNumber">Mobile Number</label>
                        <input
                          type="text"
                          className={
                            "form-control " +
                            ((isValidate && values.mobileNumber === "") ||
                              (isValidate &&
                                values.mobileNumber !== "" &&
                                values.mobileNumber.length < 10)
                              ? "input-error"
                              : "")
                          }
                          id="MobileNumber"
                          placeholder="Enter your mobile number"
                          value={values.mobileNumber}
                          onChange={onChangeHandler("mobileNumber")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.mobileNumber === "" && (
                          <p className="input-error-message">
                            Mobile number is required
                          </p>
                        )}
                        {isValidate &&
                          values.mobileNumber !== "" &&
                          values.mobileNumber.length < 8 && (
                            <p className="input-error-message">
                              Mobile number is invalid
                            </p>
                          )}
                      </div>
                    </div> */}
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="CompanyName">Company Name</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (isValidate && values.companyName === ""
                                ? "input-error"
                                : "") +
                              (values.companyName !== "" &&
                                " activeForm-control") +
                              (values.companyName !== "" && !isCompanyNameValid
                                ? " input-error "
                                : "")
                            }
                            id="CompanyName"
                            placeholder="Enter your company name"
                            onBlur={(e) => validateCompanyName(e)}
                            value={values.companyName}
                            onChange={onChangeHandler("companyName")}
                            onKeyPress={(e) => handleKeyDown(e)}
                          />
                          {isValidate && values.companyName === "" && (
                            <p className="input-error-message">
                              Company name is required
                            </p>
                          )}
                          {values.companyName !== "" && !isCompanyNameValid && (
                            <p className="input-error-message">
                              Company already exists
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="Company Email">Designation</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (isValidate && values.designation === ""
                                ? "input-error"
                                : "") +
                              (values.designation !== ""
                                ? " activeForm-control"
                                : " ")
                              // +(values.designation !== "" ? " success-input-form-control" : "")
                            }
                            id="Designation"
                            placeholder="e.g. Compliance officer, Team Leader"
                            value={values.designation}
                            onChange={onChangeHandler("designation")}
                            onKeyPress={(e) => handleKeyDown(e)}
                          />
                          {isValidate && values.designation === "" && (
                            <p className="input-error-message">
                              Designation is required
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="Company Email">Password</label>
                          <input
                            type="password"
                            className={
                              "form-control " +
                              (values.password !== "" &&
                                values.confirmPassword !== "" &&
                                values.confirmPassword !== values.password &&
                                " input-error") +
                              ((isValidate && values.password === "") ||
                              (values.password !== "" &&
                                errors.passwordErr !== "")
                                ? "input-error"
                                : "") +
                              (values.password !== ""
                                ? " input-not-blank"
                                : " ") +
                              (values.password !== "" &&
                              errors.passwordErr === ""
                                ? " password-success "
                                : " ")
                            }
                            id="Password"
                            autoComplete="off"
                            placeholder="Enter 8-16 digit password"
                            value={values.password}
                            onChange={onChangeHandler("password")}
                            onKeyPress={(e) => handleKeyDown(e)}
                          />
                          {isValidate && values.password === "" && (
                            <p className="input-error-message">
                              Please enter password
                            </p>
                          )}
                          {values.password !== "" &&
                            errors &&
                            errors.passwordErr !== "" && (
                              <p className="input-error-message">
                                Password is invalid
                              </p>
                            )}

                          {/* <ul className="Instruction">
                            <li>
                              <div className={passwordState.minlength === false ? "error" : "green-dot"} ></div>At least 8-16 characters—the more characters, the better
                    </li>
                            <li>
                              <div className={passwordState.uppercaseandlowercase === false ? "error" : "green-dot"}></div>A mixture of both uppercase and lowercase
                      letters
                    </li>
                            <li>
                              <div className={passwordState.alphabetsandigit === false ? "error" : "green-dot"}></div>A mixture of letters and numbers
                    </li>
                          </ul> */}
                        </div>
                      </div>
                      <div className="col-12 d-block d-sm-none">
                        <ul className="Instruction">
                          <li>
                            <div
                              className={
                                passwordState.minlength === false
                                  ? "error"
                                  : "green-dot"
                              }
                            ></div>
                            At least 8-16 characters—the more characters, the
                            better
                          </li>
                          <li>
                            <div
                              className={
                                passwordState.uppercaseandlowercase === false
                                  ? "error"
                                  : "green-dot"
                              }
                            ></div>
                            A mixture of both uppercase and lowercase letters
                          </li>
                          <li>
                            <div
                              className={
                                passwordState.alphabetsandigit === false
                                  ? "error"
                                  : "green-dot"
                              }
                            ></div>
                            A mixture of letters and numbers
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="ConfirmPassword">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className={
                              "form-control " +
                              (values.confirmPassword !== "" &&
                                values.confirmPassword !== values.password &&
                                " input-error") +
                              ((isValidate && values.confirmPassword === "") ||
                              (values.confirmPassword !== "" &&
                                errors.confirmPasswordErr !== "")
                                ? "input-error" +
                                  (values.confirmPassword !== values.password &&
                                    " input-error ")
                                : "") +
                              "" +
                              (values.confirmPassword !== ""
                                ? " input-not-blank"
                                : " ") +
                              (values.confirmPassword !== "" &&
                              errors.confirmPasswordErr === "" &&
                              values.confirmPassword === values.password
                                ? " password-success "
                                : "")
                            }
                            id="ConfirmPassword"
                            placeholder="Repeat Password"
                            autoComplete="off"
                            value={values.confirmPassword}
                            onChange={onChangeHandler("confirmPassword")}
                            onKeyPress={(e) => handleKeyDown(e)}
                          />
                          {/* {values.confirmPassword !== "" && errors && errors.confirmPasswordErr !== "" && <p className="input-error-message">
                            Confirm password is invalid
                          </p>} */}
                          {isValidate && values.confirmPassword === "" && (
                            <p className="input-error-message">
                              Please enter confirm password
                            </p>
                          )}
                          {values.confirmPassword !== "" &&
                            values.password !== "" &&
                            values.confirmPassword !== values.password && (
                              <p className="input-error-message">
                                Password don't match
                              </p>
                            )}
                        </div>
                      </div>
                      {values.password !== "" && (
                        <div className="col-12 d-none d-sm-block">
                          <ul className="Instruction">
                            <li>
                              <div
                                className={
                                  passwordState.minlength === false
                                    ? "error"
                                    : "green-dot"
                                }
                              ></div>
                              At least 8-16 characters—the more characters,{" "}
                              <br></br> the better
                            </li>
                            <li>
                              <div
                                className={
                                  passwordState.uppercaseandlowercase === false
                                    ? "error"
                                    : "green-dot"
                                }
                              ></div>
                              A mixture of both uppercase and lowercase letters
                            </li>
                            <li>
                              <div
                                className={
                                  passwordState.alphabetsandigit === false
                                    ? "error"
                                    : "green-dot"
                                }
                              ></div>
                              A mixture of letters and numbers
                            </li>
                          </ul>
                        </div>
                      )}
                      {/* <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="FullName">Full Name</label>
                        <input
                          type="text"
                          className={
                            "form-control " +
                            (isValidate && values.fullName === ""
                              ? "input-error"
                              : "")
                          }
                          id="FullName"
                          placeholder="Enter your full name"
                          value={values.fullName}
                          onChange={onChangeHandler("fullName")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.fullName === "" && (
                          <p className="input-error-message">
                            Full name is required
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="CompanyName">Company Name</label>
                        <input
                          type="text"
                          className={
                            "form-control " +
                            (isValidate && values.companyName === ""
                              ? "input-error"
                              : "")
                          }
                          id="CompanyName"
                          placeholder="ABC Brokerage"
                          onBlur={(e) => validateCompanyName(e)}
                          value={values.companyName}
                          onChange={onChangeHandler("companyName")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.companyName === "" && (
                          <p className="input-error-message">
                            Company name is required
                          </p>
                        )}
                        {values.companyName !== "" && !isCompanyNameValid && (
                          <p className="input-error-message">
                            Company name is already availabel
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="Company Email">Password</label>
                        <input
                          type="password"
                          className={
                            "form-control " +
                            ((isValidate && values.password === "") ||
                              (isValidate &&
                                values.password !== "" &&
                                values.password.length < 8)
                              ? "input-error"
                              : "")
                          }
                          id="Password"
                          placeholder="......"
                          value={values.password}
                          onChange={onChangeHandler("password")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.password === "" && (
                          <p className="input-error-message">
                            Please enter password
                          </p>
                        )}
                        {isValidate &&
                          values.password !== "" &&
                          values.password.length < 8 && (
                            <p className="input-error-message">
                              Password should minimum 8 characters
                            </p>
                          )}
                      </div>
                    </div> */}
                      {/* <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="MobileNumber">Mobile Number</label>
                        <input
                          type="text"
                          className={
                            "form-control " +
                            ((isValidate && values.mobileNumber === "") ||
                            (isValidate &&
                              values.mobileNumber !== "" &&
                              values.mobileNumber.length < 10)
                              ? "input-error"
                              : "")
                          }
                          id="MobileNumber"
                          placeholder="9876543210"
                          value={values.mobileNumber}
                          onChange={onChangeHandler("mobileNumber")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.mobileNumber === "" && (
                          <p className="input-error-message">
                            Mobile number is required
                          </p>
                        )}
                        {isValidate &&
                          values.mobileNumber !== "" &&
                          values.mobileNumber.length < 8 && (
                            <p className="input-error-message">
                              Mobile number is invalid
                            </p>
                          )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="Company Email">Designation</label>
                        <input
                          type="text"
                          className={
                            "form-control " +
                            (isValidate && values.designation === ""
                              ? "input-error"
                              : "")
                          }
                          id="Designation"
                          placeholder="eg, co Team leader"
                          value={values.designation}
                          onChange={onChangeHandler("designation")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.designation === "" && (
                          <p className="input-error-message">
                            Designation is required
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="ConfirmPassword">Repeat password</label>
                        <input
                          type="password"
                          className={
                            "form-control " +
                            ((isValidate && values.confirmPassword === "") ||
                            (isValidate &&
                              values.confirmPassword !== "" &&
                              values.confirmPassword.length < 8)
                              ? "input-error"
                              : "")
                          }
                          id="ConfirmPassword"
                          placeholder="......"
                          value={values.confirmPassword}
                          onChange={onChangeHandler("confirmPassword")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.confirmPassword === "" && (
                          <p className="input-error-message">
                            Please enter repeat password
                          </p>
                        )}
                        {isValidate &&
                          values.confirmPassword !== "" &&
                          values.confirmPassword.length < 8 && (
                            <p className="input-error-message">
                              Repeat password should be minimum 8 characters
                            </p>
                          )}
                        {isValidate &&
                          values.confirmPassword !== "" &&
                          values.confirmPassword.length > 8 &&
                          values.password !== "" &&
                          values.confirmPassword !== values.password && (
                            <p className="input-error-message">
                              Password and repeat password should be same
                            </p>
                          )}
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-logo-strip personal-details">
                <div className="row aligncenter">
                  <div className="col-12">
                    {/* <div className="custom-control custom-checkbox btn-top-checkbox" >
                      <input type="checkbox"
                      className="custom-control-input cutom-add-whatsappflag "
                      style={{ cursor: "pointer", height: "1.5rem" }}
                      name="whatsappFlag"
                      value={whatappFlag}
                      onChange={(event) => handleWhatsappChange(event)}
                      />
                      <label className="custom-control-label btn-top-label" htmlFor="customCheck">Yes, i want to receive WhatsApp updates</label>
                    </div> */}
                    {/* <div className="custom-control custom-checkbox btn-top-checkbox" >
                      <input id="magicBtnPersonal" type="checkbox"
                        className="custom-control-input"
                        style={{ cursor: "pointer", height: "1.5rem" }}
                        name="whatsappFlag"
                        value={whatappFlag}
                        onChange={(event) => handleWhatsappChange(event)}
                      />
                      <label className="custom-control-label btn-top-label" For="magicBtnPersonal">Yes, I want to receive WhatsApp updates</label>
                    </div>                    */}
                  </div>
                  <div className="col-6">
                    <button
                      onClick={() => onSubmit()}
                      className="btn save-details common-button btn-width"
                      disabled={
                        values.fullName === "" ||
                        values.mobileNumber === "" ||
                        values.countryCode === "" ||
                        values.companyName === "" ||
                        values.designation === "" ||
                        values.password === "" ||
                        values.confirmPassword === "" ||
                        errors.passwordErr !== "" ||
                        errors.confirmPasswordErr !== "" ||
                        errors.countryCodeErr === "true" ||
                        values.mobileNumber.length < 10
                      }
                      style={{ width: 134 }}
                    >
                      SAVE DETAILS
                    </button>
                  </div>
                  <div className="col-6 text-right d-none d-sm-block">
                    {/* <a href="#" style={{'cursor': 'auto'}}> */}
                    <span className="powerBy">Powered by</span>
                    <img
                      className="header_logo footer-logo-secmark"
                      src={secmark}
                      alt="SECMARK"
                      title="SECMARK"
                    />
                    {/* </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(PersonalDetails);
