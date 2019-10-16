import login from "./en-US/login";
import menu from "./en-US/menu";
import globalHeader from "./en-US/globalHeader";
import component from "./en-US/component";

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  ...login,
  ...menu,
  ...globalHeader,
  ...component,
}