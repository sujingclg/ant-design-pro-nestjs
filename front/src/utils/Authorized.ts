import AuthorizeRenderer from '@/components/Authorized';
import {getAuthority} from './authority';

let Authorized = AuthorizeRenderer(getAuthority());

const reloadAuthorized: (() => void) = () => {
  Authorized = AuthorizeRenderer(getAuthority());
};

export {reloadAuthorized};
export default Authorized;
