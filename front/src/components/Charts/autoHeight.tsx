import React from "react";


function computeHeight(elt: HTMLDivElement): number {
  // window.getComputedStyle(elt).height 返回带像素的浮点数, parseInt 将其转换为整型, 忽略单位
  const totalHeight = parseInt(window.getComputedStyle(elt).height!, 10);
  const padding =
    parseInt(window.getComputedStyle(elt).paddingTop!, 10) +
    parseInt(getComputedStyle(elt).paddingBottom!, 10);
  return totalHeight - padding;
}

function getAutoHeight(elt: HTMLDivElement | null): number {
  if (!elt) {
    return 0;
  }
  let node = elt;
  let height = computeHeight(node);
  while (!height) {  // 如果父元素的高为0, 则向祖先遍历, 直到获取到最近的祖先元素的不为0的高度
    node = node.parentElement as HTMLDivElement;
    if (node) {
      height = computeHeight(node);
    } else {
      break;
    }
  }
  return height;
}

/**
 * 此装饰器类似于高阶组件
 * BizCharts 组件自动匹配父元素高度的装饰器
 */
const autoHeight = function (): Function {
  return function (WrappedComponent: React.ElementType) {

    type autoHeightProps = {
      height?: number;
    }

    type autoHeightState = {
      computedHeight: number;
    }

    return class extends React.Component<any, autoHeightState> {

      private readonly _containerRef: React.RefObject<HTMLDivElement>;

      readonly state: Readonly<autoHeightState>;

      constructor(props: autoHeightProps) {
        super(props);
        this._containerRef = React.createRef();
        this.state = {
          computedHeight: 0,
        };
      }

      componentDidMount() {
        const {height} = this.props;
        if (!height) {
          const h = getAutoHeight(this._containerRef.current);
          this.setState({computedHeight: h});
        }
      }

      render() {
        const {height} = this.props;
        const {computedHeight} = this.state;
        const h = height || computedHeight;
        return (
          <div ref={this._containerRef}>{h > 0 && <WrappedComponent {...this.props} height={h}/>}</div>
        );
      }
    }
  };
};

export default autoHeight;