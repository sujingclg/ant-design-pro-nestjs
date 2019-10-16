import React from "react";


interface SecurityViewProps {
}

interface SecurityViewState {
}

// const SecurityView: React.FC<SecurityViewProps> = (props => {
//   return (
//     <>
//
//     </>
//   )
// });

class SecurityView extends React.Component<SecurityViewProps, SecurityViewState> {

  readonly state: Readonly<SecurityViewState>;

  constructor(props: SecurityViewProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        SecurityView
      </div>
    )
  }
}

export default SecurityView;
