import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './home.scss';
import * as homeAction from 'app-main/store/actions/home/home';

@connect(
  state => state,
  dispatch => bindActionCreators(homeAction, dispatch)
)
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.initWelcomeText();
      this.props.getDateText();
    this.props.getSupportLinks();
  }

  render() {
    const { welcomeText } = this.props.homeReducer;
    const { dateText } = this.props.homeReducer;
    const { supportLinks } = this.props.homeReducer;
    let linksHtml = [];

    supportLinks.map((link, index) => {
      linksHtml.push(
        <div key={index}>
          <a href={link.url}>{link.text}</a>
        </div>
      );
    });

    return (
      <div>
        <h1>{welcomeText}</h1>
        <div className={`${styles.index_logo}`}></div>
        <div className={`${styles.index_info}`}>请编辑&nbsp;&nbsp;<code>view/home/home.js</code>&nbsp;&nbsp;开始你的项目开发</div>
        <div className={`${styles.index_info}`}>现在是北京时间：{dateText}</div>
        <div className={`${styles.index_link}`}>{linksHtml}</div>
      </div>
    )
  }
}