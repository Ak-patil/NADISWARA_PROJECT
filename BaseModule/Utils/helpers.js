// import Clipboard from '@cd ../clipboard';
import dayjs from "dayjs";
import _, { isNaN } from "lodash/lang";
import { Dimensions, Keyboard, Platform, Share } from "react-native";
const FormData = require("form-data");

export const DATE_FORMAT_DD_MM_YYYY = "DD/MM/YYYY";
export const DATE_FORMAT = "YYYY-MM-DD";
export const DISPLAY_DATE_TIME_FORMAT = "DD MMM YYYY hh:mm a";
export const DISPLAY_TIME = "hh:mm";
export const DATE = "DD-MM-YYYY";
export const DATE_TIME_FORMAT_DD_MM_YYYY_HH_MM_SS = "DD-MM-YYYY HH:mm:ss";
export const DATE_TIME_FORMAT_YYYY_MM_DD_HH_MM_SS = "YYYY-MM-DD HH:mm:ss";
export const DISPLAY_DATE_FORMAT_DD_MM = "DD/MM";
export const DISPLAY_DATE_MONTH_TIME_FORMAT = "DD MMM hh:mm a";
export const DISPLAY_COMPLETE_MONTH_DATE_FORMAT = "MMMM DD, YYYY";
export const GET_YEAR = "YYYY";
export const DISPLAY_DATE_FORMAT = "DD MMM YYYY";
export const DISPLAY_COMPLETE_DATE_FORMAT = "DD MMMM YYYY";

export const DISPLAY_TIME_FORMAT = "hh:mm a";
export const DISPLAY_HOUR_FORMAT = "hh a";
export const DISPLAY_DATE_HOUR_FORMAT = "DD MMM, HH:mm";
export const DISPLAY_DATE_MONTH_FORMAT = "DD MMM";
export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;
export const RANDOM_STRING_ALPHA_NUMERIC = {
  ALPHANUMERIC:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
  NUMERIC: "1234567890",
};
export const isWeb = () => {
  return Platform.OS === "web";
};
export const isMobile = () => {
  return Dimensions.get("window").width <= 500 ? true : false;
};
export const getContainerWidth = (web = "40%") => {
  return deviceHeight > deviceWidth ? "90%" : web;
};

export const getContainerMargin = () => {
  return deviceHeight > deviceWidth ? deviceHeight * 0.12 : 0;
};

export const isNonEmptyString = (data) => {
  return (
    data !== null && data !== undefined && data.toString().trim().length > 0
  );
};

export const checkAndAppend = (value, placeholder) => {
  return `${placeholder}  ${isValidString(value) ? " - " + value : ""}`;
};

export const toTitleCase = (text) => {
  if (isValidElement(text)) {
    text = text.toString();
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
  }
};

export const isAlphaNumeric = (text) => {
  var alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(text);
};

export const isValidIndianAddress = (address) => {
  // Remove leading/trailing white spaces
  address = address.trim();

  // Regex pattern to match valid Indian addresses
  const pattern = /^[a-zA-Z0-9\s,'-]*$/;

  // Check if the address matches the pattern
  if (pattern.test(address)) {
    // Valid Indian address
    return true;
  }

  // Invalid Indian address
  return false;
};

// Function to validate email
export const validateEmail = (email) => {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate mobile number
export const validateMobileNumber = (mobileNumber) => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobileNumber);
};

export const isValidElement = (data) => {
  return data !== null && data !== undefined;
};

export const isValidString = (data) => {
  return data !== null && data !== undefined && data !== "" && data !== "null";
};

export const isValidNumber = (data) => {
  return data !== null && data !== undefined && data !== "" && !isNaN(data);
};

export const isValidNonZeroNumber = (data) => {
  return (
    data !== null &&
    data !== undefined &&
    data !== "" &&
    !isNaN(data) &&
    Number(data) > 0.0
  );
};
export const isValidNotEmptyString = (data) => {
  return data !== null && data !== undefined && data !== "" && data !== "null";
};

export const isNonEmptyObject = (objectName) => {
  return _.isEmpty(objectName);
};

export const boolValue = (value) => {
  return (
    isValidElement(value) &&
    (value === 1 ||
      value === "1" ||
      value.toString().toLowerCase() === "true" ||
      value.toString().toLowerCase() === "yes")
  );
};

/**
 * return safe Int Value
 * @param value
 * @returns {number}
 */
export const safeIntValue = (value) => {
  if (isValidNumber(value)) {
    try {
      return parseInt(value);
    } catch (e) {
      return 0;
    }
  } else {
    return 0;
  }
};

/**
 * return safe Int Value
 * @param value
 * @returns {number}
 */
export const safeFloatValue = (value) => {
  if (isValidNumber(value)) {
    try {
      return parseFloat(value);
    } catch (e) {
      return 0.0;
    }
  } else {
    return 0.0;
  }
};
/**
 *
 * Method to add default touch area for views.
 * @param size - touch area size to be increased all side equally
 * @returns {{top: number, left: number, bottom: number, right: number}}
 */
export const defaultTouchArea = (size = 16) => {
  return { left: size, top: size, right: size, bottom: size };
};

/**
 *
 * @param length
 * @returns {string}
 * Genrate and return random string of Given length from available alpha numeric characters
 */
export const randomStringWithLength = (length) => {
  var randomStrArr = [];
  var ALPHANUMERIC = RANDOM_STRING_ALPHA_NUMERIC.ALPHANUMERIC;
  for (var i = 0; i < length; i++) {
    randomStrArr[i] = ALPHANUMERIC.substr(
      Math.floor(Math.random() * ALPHANUMERIC.length),
      1
    );
  }
  return randomStrArr.join("").toUpperCase();
};
/**
 *
 * @param length
 * @returns {string}
 * Genrate and return random string of Given length from available alpha numeric characters
 */
export const randomNumberWithLength = (length) => {
  var randomStrArr = [];
  var ALPHANUMERIC = RANDOM_STRING_ALPHA_NUMERIC.NUMERIC;
  for (var i = 0; i < length; i++) {
    randomStrArr[i] = ALPHANUMERIC.substr(
      Math.floor(Math.random() * ALPHANUMERIC.length),
      1
    );
  }
  return randomStrArr.join("").toUpperCase();
};
export const getDateStr = (date, format) => {
  return dayjs(date).format(format);
};

export const firstCharacterUpperCased = (text) => {
  if (isValidString(text)) {
    text = text.toString();
    return text.charAt(0).toUpperCase() + text.slice(1);
  } else {
    return "";
  }
};

export const firstWordUpperCased = (text) => {
  let output = "";
  let words = isValidElement(text) ? text.trim().split(" ") : text;
  words.forEach((value) => {
    output = output + firstCharacterUpperCased(value) + " ";
  });
  return output;
};

export const checkRegexPatternTest = (pattern, data) => {
  let testPattern = new RegExp(pattern);
  return testPattern.test(data);
};

export const isLessThan10MB = (bytes) => {
  let mb = bytes / 1000 / 1000;
  return mb < 10;
};

export const isDesiredFormat = (type) => {
  let desiredFormats = ["image/jpeg", "image/jpg", "image/png"];
  return desiredFormats.indexOf(type) > -1;
};
export const EMAIL_PATTERN =
  "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,4}" + "$";

export const isValidURL = (str) => {
  if (isValidString(str)) {
    let regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return regexp.test(str);
  } else {
    return false;
  }
};

export const isDomainUrlValid = (str) => {
  if (isValidString(str)) {
    const pattern = new RegExp(
      /^((https):\/\/)?(w{3}[.]{1})?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-/]{2,}){1,3}(#?\/?[a-zA-Z0-9#/&%_?=.^*@-]+)*\/?(\?[a-zA-Z0-9#/&%_?=.^*@-]+=[a-zA-Z0-9#/&%_?=.^*@-]+&?)?$/
    );
    return pattern.test(str);
  } else {
    return false;
  }
};

export const testTwoDecimals = (value) => {
  const testTwoDecimels = new RegExp(
    /(?=\.*\d)^\$?(([1-9]\d{0,4}(,\d{3})*)|0)?(\.\d{0,2})?$/
  );

  if (value.charAt(0) === ".") {
    value = `0${value}`;
  }
  if ((testTwoDecimels.test(value) || !value) && value <= 20000) {
    return value;
  }
};

export const cleanText = (value) => {
  return String(value).replace(/[&\/\\#,+()$~%.'":*?<>!@{}]/g, "");
};

export const parseAmount = (value, fractionDigits = 2) => {
  if (!isNaN(value)) {
    return parseFloat(value).toFixed(fractionDigits);
  }
  return value;
};

export const isValidFormat = (regex, enteredString) => {
  try {
    if (regex.test(enteredString)) {
      return true;
    }
  } catch (e) {
    return false;
  }

  return false;
};

export const priceValidationFormatter = (text, oldText) => {
  let reg = /^\d{1,7}(\.\d{0,2})?$/;
  if (text === ".") {
    return "0.";
  }
  if (text === "0" && oldText != "0.") {
    return "0.";
  } else if (reg.test(text) || text.length === 0) {
    return text.replace(/(\..*)\./g, "$1");
  } else {
    return oldText;
  }
  // return text.replace(/^\d{0,4}(\.\d{0,2})?$/g, '').replace(/(\..*)\./g, '$1');
  // return text.replace(/[^\d{1,5}|\d{0,5}\.\d{1,2}]/g, '').replace(/(\..*)\./g, '$1');
};

export const isEmpty = (string) => {
  return !string || string.length === 0;
};

export const isAndroid = () => {
  return Platform.OS === "android";
};

export const isIos = () => {
  return Platform.OS === "ios";
};

export const dismissKeyboard = () => {
  !isWeb() && Keyboard.dismiss();
};

export const isTabletDevice = () => {
  return deviceWidth >= deviceHeight;
};

export const onShare = async (data) => {
  try {
    const result = await Share.share({
      message: data,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export const prettyCardNumber = (value) => {
  let cardNumber;
  value = value.replace(/\D/g, "");
  if (/^3[47]\d{0,13}$/.test(value)) {
    cardNumber = value
      .replace(/(\d{4})/, "$1 ")
      .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
  }

  if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
    // diner's club, 14 digits
    cardNumber = value
      .replace(/(\d{4})/, "$1 ")
      .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
  }

  if (/^\d{0,16}$/.test(value)) {
    // regular cc number, 16 digits
    cardNumber = value
      .replace(/(\d{4})/, "$1 ")
      .replace(/(\d{4}) (\d{4})/, "$1 $2 ")
      .replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
  }
  return isValidNotEmptyString(cardNumber) ? cardNumber.trim() : value;
};

export const isValidCity = (city) => {
  const cityRegex = /^[ a-zA-Z1-9, ]+(?:[\s'\s-][ a-zA-Z ]+)*$/;
  return cityRegex.test(city);
};

export const getCardTypeInfo = (cardNumber) => {
  if (isValidElement(cardNumber) && cardNumber.length > 0) {
    const cardsDetails = creditCardType(cardNumber);
    if (cardsDetails.length > 0) {
      return { type: cardsDetails[0].type };
    }
  }
  return { type: "" };
};

export const isAmericanExpress = (cardType) => {
  return cardType === "american-express";
};

export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

// export const copyText = async (copyText) => {
//     Clipboard.setString(copyText);
// };

export const getCurrentDay = (format = DATE_FORMAT) => {
  return dayjs().format(format);
};

export const getCurrentDayMoment = () => {
  return dayjs().startOf("day");
};
export const getLast7DayMoment = () => {
  return dayjs().subtract(7, "days").startOf("day");
};

export const findDifferenceInDays = (startDate, endDate) => {
  return dayjs(endDate).diff(dayjs(startDate), "days");
};

export const getLast30DayMoment = () => {
  return dayjs().subtract(29, "days").startOf("day");
};

export const getLastDayMoment = () => {
  return dayjs().subtract(0, "days").startOf("day");
};
export const getCurrentEndDayMoment = () => {
  return dayjs().endOf("day");
};

export const getCurrentStartDayMoment = () => {
  return dayjs().startOf("day");
};

export const getFullDate = (time = new Date()) => {
  return `${time.getDate()} ${time.toLocaleString("default", {
    month: "long",
  })} ${time.getFullYear()}`;
};

export const getLastDateOfMonth = (time = new Date()) => {
  if (!isValidElement(time) && !isValidDate()) {
    time = new Date();
  }
  return new Date(time.getFullYear(), time.getMonth() + 1, 0);
};
export const currentDateMonthYear = (val) => {
  val = val.toLowerCase();
  if (val === "dd") {
    return Number(getCurrentDay(DATE_FORMAT).split("-")[2]);
  } else if (val === "mm") {
    return Number(getCurrentDay(DATE_FORMAT).split("-")[1]);
  } else if (val === "yyyy") {
    return Number(getCurrentDay(DATE_FORMAT).split("-")[0]);
  }
};

export const getFormatedDateTime = (
  time,
  format = DISPLAY_DATE_TIME_FORMAT
) => {
  if (isValidElement(time)) {
    return dayjs(time).format(format);
  } else {
    return null;
  }
};

export const isValidLength = (text, minLength) => {
  if (isValidElement(text) && text.length < minLength) {
    return false;
  } else {
    return true;
  }
};

export const isUpperCase = (text) => {
  let upperRegExp = /[A-Z]/;
  if (isValidElement(text) && upperRegExp.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const isLowerCase = (text) => {
  let lowerRegEx = /[a-z]/;
  if (isValidElement(text) && lowerRegEx.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const isSpecialCharacter = (text) => {
  let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (isValidElement(text) && specialChars.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const isNumber = (text) => {
  let number = /[0-9]/;
  if (isValidElement(text) && number.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const checkPhoneNumber = (iso, phone) => {
  return !(!isValidElement(iso) || !isValidElement(phone) || phone.length < 5);
};

export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const isValidUPI = (upi) => {
  let regex = /^[a-zA-Z0-9]*[._-]?[a-zA-Z0-9]*(?:@[a-zA-Z0-9]*)?$/;
  return regex.test(upi);
};
export const isCompleteUPI = (upi) => {
  // This regex enforces the full UPI format, including the '@' symbol and provider part.
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/;
  return regex.test(upi);
};

export const appendObjectToForm = (object) => {
  const form = new FormData();
  for (const [key, value] of Object.entries(object)) {
    form.append(key, value);
  }
  return form;
};

export const calculateAge = (dob) => {
  const birthDate = new Date(dob); // Convert the dob string into a Date object
  const today = new Date(); // Get today's date

  let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the difference in years
  const monthDifference = today.getMonth() - birthDate.getMonth(); // Check the month difference

  // Adjust the age if the current month/day is before the birth month/day
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
