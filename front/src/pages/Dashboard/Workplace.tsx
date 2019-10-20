import React from 'react';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import styles from './Workplace.less';

interface WorkplaceProps {}

interface WorkplaceState {}

// const Workplace: React.FC<WorkplaceProps> = (props => {
//   return (
//     <div></div>
//   )
// });

class Workplace extends React.Component<WorkplaceProps, WorkplaceState> {
  
  readonly state: Readonly<WorkplaceState>;

  constructor(props: WorkplaceProps) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <PageHeaderWrapper
        content={'asdfa'}
        extraContent={'etasdf'}
      >1234</PageHeaderWrapper>
    )
  }
}

export default Workplace;
