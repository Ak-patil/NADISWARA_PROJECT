import { isValidElement } from "../../BaseModule/Utils/helpers";
import * as NavigationService from "./NavigationService";

export const handleNavigation = (routeName, params) => {
  if (isValidElement(routeName)) {
    if (isValidElement(params)) {
      NavigationService.navigate(routeName, params);
    } else {
      NavigationService.navigate(routeName);
    }
  }
};

export const handleGoBack = () => {
  NavigationService.goBack();
};
