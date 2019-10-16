import React from "react";


interface BaseViewProps {}

interface BaseViewState {}

class BaseView extends React.Component<BaseViewProps, BaseViewState> {

  readonly state: Readonly<BaseViewState>;

  constructor(props: BaseViewProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        BaseView
      </div>
    )
  }
}

export default BaseView;