import React from "react";

interface PromiseRenderProps {
}
interface PromiseRenderState {
}
class PromiseRender extends React.Component<PromiseRenderProps, PromiseRenderState> {
  readonly state: Readonly<PromiseRenderState>;

  constructor(props: PromiseRenderProps) {
    super(props);
    this.state = {};
  }
}

export default PromiseRender;