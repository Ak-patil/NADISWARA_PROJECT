import * as NavigationService from "./NavigationService";
import { isValidElement } from "../../BaseModule/Utils/helpers";

export const handleNavigation = (routeName, params = undefined) => {
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
