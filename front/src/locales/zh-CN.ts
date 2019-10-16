import login from "./zh-CN/login";
import menu from "./zh-CN/menu";
import globalHeader from "./zh-CN/globalHeader";
import component from "./zh-CN/component";

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  ...login,
  ...menu,
  ...globalHeader,
  ...component,
}