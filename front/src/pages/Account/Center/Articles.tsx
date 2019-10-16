import React from 'react';

interface ArticlesProps {
}

interface ArticlesState {
}

class Articles extends React.Component<ArticlesProps, ArticlesState> {

  readonly state: Readonly<ArticlesState>;

  constructor(props: ArticlesProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <p>Articles</p>
      </>
    );
  }
}

export default Articles;
