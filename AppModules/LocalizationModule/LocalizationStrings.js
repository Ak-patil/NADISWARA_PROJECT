import LocalizedStrings from "react-localization";

import en from "./en";
import hi from "./hi";
import kn from "./kn";

export const LOCALIZATION_STRINGS = new LocalizedStrings({
  SERVER_ERROR:
    "App is temporarily unable to connect to the Server. Please try again later.",
  TIMEOUT_ERROR:
    "Looks like the server is taking to long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while",
  WENT_WRONG: "Oops! Something went wrong, Please try again later",

  // hi,
  // kn,
});
