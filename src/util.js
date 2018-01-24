import moment from 'moment';

export const checkDeadline = props => moment(props.package.deadline) < moment(Date.now());
