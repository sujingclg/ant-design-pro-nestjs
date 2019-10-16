import React from "react";
import {Drawer} from "antd";
import SiderMenu, {SiderMenuProps} from "./SiderMenu";

/**
 * React.memo() 主要用于包装函数式组件，作为 PureComponent 的替代方案.
 * 通常来说, 在组件树中 React 组件只要有变化就会走一遍渲染流程,
 * 但是通过 PureComponent 和 React.memo(), 我们可以仅仅让某些组件进行渲染.
 * PureComponent 要依靠 class 才能使用, 而 React.memo() 可以和 functional component 一起使用.
 */
const SiderMenuWrapper: React.FC<SiderMenuProps> = React.memo((props: SiderMenuProps) => {
  const {isMobile, collapsed, onCollapse} = props;
  // 针对移动端, 将侧边菜单设置为抽屉模式, 注意在抽屉模式中侧边菜单应为展开状态, collapsed 为 false
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse && onCollapse(true)}
      style={{padding: 0, height: '100vh'}}
    >
      <SiderMenu {...props} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) : (
    <SiderMenu {...props} />
  );
});

export default SiderMenuWrapper;