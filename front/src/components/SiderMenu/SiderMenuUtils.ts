import pathToRegexp from 'path-to-regexp';
import {urlToList} from "../utils/pathTools";
import {MenuDataItemType} from "../typings";


/**
 * 递归调用, 将传入的 Menu 对象扁平化, 即将传入 Menu 变为一个个的 path 路径组成的列表
 * 传入:
[ { name: 'Pages',
    icon: 'pie-chart',
    path: '/dashboard',
    children: [
      {
        "name": "分析页",
        "path": "/dashboard/analysis"
      },
      {
        "name": "监控页",
        "path": "/dashboard/monitor"
      },
      {
        "name": "工作台",
        "path": "/dashboard/workplace"
      }
    ],
    authority: undefined },
  { name: 'CardList',
    icon: 'dashboard',
    path: '/CardList',
    authority: undefined } ]

输出:
[ '/dashboard',
  '/dashboard/analysis',
  '/dashboard/monitor',
  '/dashboard/workplace',
  '/CardList' ]
 */
export function getFlatMenuKeys(menuData: MenuDataItemType[]=[]): string[] {
  let keys: string[] = [];
  menuData.forEach(item => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
}


/**
 * getMenuMatchKeys 遍历 flatMenuKeys, 检测传入的 path 是否与 flatMenuKeys 中的某条路径匹配, 当 flatMenuKeys 中存在动态路由时同样有效
 * 返回值为 flatMenuKeys 中与 path 匹配的元素列表(返回类型 Array)
 * 例子:
传入: ['/dashboard','/dashboard/analysis','/dashboard/monitor'], '/dashboard/analysis' 返回:['/dashboard/analysis']
传入: ['/dashboard','/dashboard/analysis','/dashboard/monitor'], '/dashboard/' 返回:['/dashboard']
传入: ['/dashboard/'], '/dashboard' 返回:[]
传入: ['/dashboard','/dashboard/analysis','/dashboard/monitor'], '/dashboard/abc' 返回:[]
传入: ['/dashboard/:id','/dashboard/analysis'], '/dashboard/12' 返回:['/dashboard/:id']
传入: ['/dashboard/:id','/dashboard/analysis'], '/dashboard/analysis' 返回:['/dashboard/:id','/dashboard/analysis']
传入: ['/dashboard/analysis','/dashboard/:id'], '/dashboard/analysis' 返回:['/dashboard/analysis','/dashboard/:id']
 */
export function getMenuMatches(flatMenuKeys: string[], path: string): string[] {
  // pathToRegexp 用于匹配静态或动态路由, 传入 /path/:id 返回正则表达式
  // test方法为 JavaScript 的正则表达式对象的内建方法, 用于检测一个字符串是否匹配某个模式
  return flatMenuKeys.filter(item =>{
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false
  });
}


/**
 * 返回path的父路径, 顶层路径在前, 底层路径在后
 * 输入{pathname: '/dashboard/ddanalysis/13', flatMenuKeys: ['/dashboard','/dashboard/analysis']} 输出['/dashboard']
 * 输入{pathname: '/dashboard/analysis/13', flatMenuKeys: ['/dashboard','/dashboard/analysis']} 输出['/dashboard', '/dashboard/analysis']
 * 输入{pathname: '/dashboard/analysis/13', flatMenuKeys: ['/dashboard/analysis',/dashboard']} 输出['/dashboard', '/dashboard/analysis']
 * 输出顺序不变是因为以urlToList的输出顺序为准
 */
export function getDefaultCollapsedSubMenus(pathname: string, flatMenuKeys: string[]): string[] {
  // 获取与当前导航标签一致的传入 menusData 的路径
  return urlToList(pathname).map(item => getMenuMatches(flatMenuKeys, item)[0]).filter(item => item);
}
