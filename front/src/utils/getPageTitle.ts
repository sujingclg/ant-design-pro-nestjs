import {formatMessage} from 'umi-plugin-react/locale';
import pathToRegexp from 'path-to-regexp';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import {urlToList} from '@/components/utils/pathTools';
import defaultSettings from '@/defaultSettings';
import {BreadcrumbNameMapType, MenuDataItemType} from '@/components/typings';

const {menu, title} = defaultSettings;

function matchParamsPath(pathname: string, breadcrumbNameMap: BreadcrumbNameMapType): MenuDataItemType | undefined {
  // const pathKey = Object.keys(breadcrumbNameMap).find(
  //   (key: string) => pathToRegexp(key).test(pathname)  // 检测 pathname 与 key 是否一致, 可匹配动态路由
  // );
  // return breadcrumbNameMap[pathKey!];

  const urlList = urlToList(pathname).reverse();
  const breadcrumbNameMapKeys = Object.keys(breadcrumbNameMap);
  let pathKey;
  for (const url of urlList) {
    pathKey = breadcrumbNameMapKeys.find(
      (key: string) => pathToRegexp(key).test(url),  // 检测 url 与 key 是否一致, 可匹配动态路由
    );
    if (pathKey) { return breadcrumbNameMap[pathKey]; }
  }
  return;
}

function getPageTitle(pathname: string, breadcrumbNameMap: BreadcrumbNameMapType): string {
  const currentRouteData = matchParamsPath(pathname, breadcrumbNameMap);
  if (!currentRouteData) {
    return title;
  }
  const pageName = menu.locale ? formatMessage({
    id: currentRouteData.locale || currentRouteData.name,
    defaultMessage: currentRouteData.name,
    }) : currentRouteData.name;

  return `${pageName} - ${title}`;
}

export default memoizeOne(getPageTitle, isEqual);
