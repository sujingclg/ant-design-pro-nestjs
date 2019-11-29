import React, {createContext} from "react";
import {Settings} from "@/defaultSettings";
import {BreadcrumbNameMapType} from "./typings";

export interface RouteContextType {
  location?: {pathname: string};
  breadcrumbNameMap?: BreadcrumbNameMapType;
  // menuData?: MenuDataItemType[];
  // isMobile?: boolean;
  collapsed?: boolean;
  CSSLayoutType?: Settings['CSSLayoutType'];
}

const RouteContext: React.Context<RouteContextType> = createContext({});

export default RouteContext;
