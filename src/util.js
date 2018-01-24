import moment from 'moment';
import request from 'axios';

export const checkDeadline = props =>
  moment(props.package.deadline) < moment(Date.now()).add(10, 'seconds');

export const teamsExist = (props, lim = 1) => {
  const { teams } = props.package;
  if (!teams) return false;
  const keys = Object.keys(teams);
  return keys.length >= (lim) && teams[keys[0]].id && teams[keys[0]].nazwa;
};

export const objMap = (obj, pre) => {
  const out = {};
  Object.keys(obj).forEach((key) => {
    out[key] = Object.assign({}, pre(obj[key]));
  });
  return out;
};

export const objFilter = (obj, pre) => {
  const out = {};
  Object.keys(obj).filter(key => pre(obj[key]))
    .forEach((key) => {
      out[key] = Object.assign({}, obj[key]);
    });
  return out;
};

export const teamName = (props, id) => (props.package.teams[id]
  ? `${id}. ${props.package.teams[id].nazwa}`
  : id);

export const processMatches = (props, matches) => objMap(matches || props.package.matches, (el) => {
  const guests = teamName(props, el.goście);
  const hosts = teamName(props, el.gospodarze);
  return Object.assign({}, el, { goście: guests, gospodarze: hosts });
});

export const post = (path, obj, reset) => {
  request
    .post(path, JSON.stringify(obj.state))
    .then(() => {
      obj.props.package.fetchAll();
      if (reset) { obj.setState(reset); }
    })
    .catch(e => console.error('submit error:', e));
};
