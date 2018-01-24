import moment from 'moment';

export const checkDeadline = props =>
  moment(props.package.deadline) < moment(Date.now()).add(10, 'seconds');

export const teamsExist = (props) => {
  const { teams } = props.package;
  if (!teams) return false;
  const keys = Object.keys(teams);
  return keys.length > 0 && teams[keys[0]].id && teams[keys[0]].nazwa;
};
