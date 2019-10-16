import React from "react";

interface RegisterProps {}

interface RegisterState {}

class Register extends React.Component<RegisterProps, RegisterState> {
  readonly state: Readonly<RegisterState>;

  constructor(props: RegisterProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <p>Hello world!</p>
      </>
    )
  }
}

export default Register;