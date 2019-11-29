import React from "react";
import {Layout} from "antd";
import Link from "umi/link";
import classNames from "classnames";
import BaseMenu, {BaseMenuProps} from "./BaseMenu";
import {getFlatMenuKeys, getDefaultCollapsedSubMenus} from "./SiderMenuUtils";
import styles from "./index.less";

const {Sider} = Layout;

export interface SiderMenuProps extends Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ["onCollapse"]>> {
// export interface SiderMenuProps extends BaseMenuProps {
  isOpenKeysMoreThanOne?: boolean;
  siderWidth?: number;  // 默认256
  logo?: string;
  title?: string;
  isLocalSiderMenu?: boolean;
}

interface SiderMenuState {
  openKeys: string[];
  // 存储一个 pathname 的副本, 用于与 react-router 传入的 pathname 进行比对,
  // 若两者不相等, 则更新 openKeys 和 pathname 属性, 从而造成组件被重新渲染
  pathname?: string;
}

class SiderMenu extends React.PureComponent<SiderMenuProps, SiderMenuState> {

  readonly state: Readonly<SiderMenuState>;

  constructor(props: SiderMenuProps) {
    super(props);
    const {location} = props;
    this.state = {
      openKeys: location ? getDefaultCollapsedSubMenus(location.pathname, getFlatMenuKeys(props.menuData)) : [],
    };
  }

  /**
   * 此函数会在每次调用 render 前被调用, 并且在初始挂载及后续更新时都会被调用. 用于取代 UNSAFE_componentWillReceiveProps.
   *
   * 此函数存在的意义为:
   * 默认情况下 props 的属性中只有被 render 用于渲染的属性改变时才会触发重新渲染,
   * 但有些时候 props 中的某些属性并不是直接用于渲染到页面的, 而是做了些转换去改变组件的 state 属性的, 比如本组件的 pathname
   * 从而这些 props 属性改变后并未触发 re-rendering.
   * 因此 getDerivedStateFromProps 用于将这些 props 属性作用到 state 上, 从而强制触发 re-rendering.
   *
   * 此函数的使用场景为:
   * 组件中的某些 state 属性状态改变既受组件内部的方法驱动, 又受传入的 props 驱动. 如本组件中的 openKeys.
   *
   * 函数返回一个新的组件 state 对象供渲染使用, 或者返回 null 不更新组件的 state, 从而不触发 re-rendering.
   * 此生命周期函数是静态方法, 因此要保持它是纯函数.
   * 要注意把传入的 prop 值和之前传入的 prop 进行比较, 尽量多返回 null 以保证 React 的渲染效率.
   * @param nextProps: 在重新渲染时传入当前组件的新的 props 参数
   * @param prevState: 在重新渲染前当前组件维持的旧的 state 状态
   */
  static getDerivedStateFromProps(nextProps: SiderMenuProps, prevState: SiderMenuState): SiderMenuState | null {
    const {pathname: statePathname} = prevState;
    const {location = {pathname: "/"}, menuData, isOpenKeysMoreThanOne} = nextProps;
    if (!isOpenKeysMoreThanOne && location.pathname != statePathname) {
      return {
        pathname: location.pathname,
        openKeys: getDefaultCollapsedSubMenus(location.pathname, getFlatMenuKeys(menuData)),
      };
    }
    return null;
  }

  /**
   * 传入组件的 menuData 中存在 key 字段或 path 字段的情况下, 检查传入的 key 是否是一级菜单
   * 如是返回 true, 否则返回 false
   * Menu.Item 的 key 属性值示例 /dashboard/analysis
   * 由于没有递归, 此函数只检查是否是 menuData 中最顶层的 path
   * @param key
   */
  isMainMenu: ((key: string) => boolean) = key => {
    // Array.some() 方法用于检测数组中的元素是否满足指定条件(函数提供).
    // 如果有一个元素满足条件, 则表达式返回 true, 剩余的元素不会再执行检测. 如果没有满足条件的元素, 则返回 false.
    // 区别Array.every() 全部满足时返回true
    const {menuData = []} = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key == key || item.path == key;
      }
      return false;
    });
  }

  /**
   * Menu 中的 SubMenu 展开/关闭的回调
   * 传入的openKeys中包含了全部的已经展开的 SubMenu 的路径字符串列表
   * 传入参数openKeys为当前多级路径、将被打开的路径的集合
   * 此方法用于将导航菜单变为手风琴模式
   * @param openKeys
   */
  handleOpenChange: (openKeys: string[]) => void = openKeys => {
    if (this.props.isOpenKeysMoreThanOne) {
      this.setState({
        openKeys: [...openKeys],  // 正常模式
      });
    } else {
      const lastOpenKey = openKeys[openKeys.length - 1];
      // 检查打开的导航中一级菜单的数目是否多于一个, 如果当前路径、即将打开的路径是一级菜单间切换，则 moreThanOne 必为 true
      // moreThanOne 用于决定如何设置 openKeys 的值, 是切换一级菜单还是保持
      const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
      // 为了实现手风琴风格, 传入参数 openKeys 必须为当前多级路径、将被打开的路径的集合,
      // 因此需保证 state.openKeys 为这两者之一或空. 例如当前'/dashboard/analysis', 即将打开'/list',此时 openKeys 为
      // ['/dashboard', '/dashboard/analysis', '/list’], 则 openKeys 应设置为即将打开的页面的路由，即'/list'
      // 如果点击当前打开的菜单, 则此时即为关闭菜单, openKeys 为 []
      this.setState({
        openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],  // 手风琴模式
      });
    }
  }

  render(): React.ReactNode {
    const {
      theme,
      siderWidth = 256,
      logo,
      title,
      collapsed,
      onCollapse,
      isLocalSiderMenu,
      ...restProps
    } = this.props;

    const props = {...this.props, openKeys: this.state.openKeys};
    return (
      <Sider
        theme={theme}
        width={siderWidth}
        breakpoint="lg"  // 开启响应式侧边栏
        onCollapse={collapse => {
          if (onCollapse) {
            onCollapse(collapse);
          }
        }}
        collapsed={collapsed}
        className={classNames(styles.sider, isLocalSiderMenu ? null : styles.global)}
      >
        {logo || title ? (
          <div className={styles.logo}>
            <Link to="/">
              {logo ? (
                <img src={logo} alt="logo"/>
              ) : null}
              {title ? (
                <h1>{title}</h1>
              ) : null}
            </Link>
          </div>
        ) : null}
        <BaseMenu
          {...props}
          onOpenChange={this.handleOpenChange}
        />
      </Sider>
    );
  }
}

export default SiderMenu;
