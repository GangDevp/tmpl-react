import { GET } from 'utils/axios';

export const initWelcomeText = () => (dispatch, getState) => {
  dispatch({
    type: 'INIT_WELCOME_TEXT',
    welcomeText: 'app-main 主页面'
  });
};

export const getDateText = () => (dispatch, getState) => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  let hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  let seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
  let dateText = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  dispatch({
    type: 'GET_DATE_TEXT',
    dateText: dateText
  });
};

export const getSupportLinks = () => async (dispatch, getState) => {
  let response = await GET('app-main/static/links.json');

  dispatch({
    type: 'GET_SUPPORT_LINKS',
    supportLinks: response.data.links
  });

};