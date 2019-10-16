import React from "react";

interface GaugeProps {
}

interface GaugeState {
}

class Gauge extends React.Component<GaugeProps, GaugeState> {

  readonly state: Readonly<GaugeState>;

  constructor(props: GaugeProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <></>
    );
  }
}

export default Gauge;