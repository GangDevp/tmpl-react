import React, {Component} from 'react';
import RootRouter from 'app-main/route/index';
// import performance from './../.kbase-service/lib/performance/index.react';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // performance.startMointer();
  }

  render() {
    return (<RootRouter/>);
  }
};
