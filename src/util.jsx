import React from 'react';
import { Button } from 'reactstrap';
import moment from 'moment';
import request from 'axios';
import Subsite from './subsite';

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

export const teamLabel = (props, id) => {
  const elem = props.package.teams[id];
  if (elem && elem.nazwa) { return elem.nazwa; }
  return (<small>Drużyna bez nazwy</small>);
};


export const setter = (props, path) => (id) => {
  const obj = { activeSite: Subsite[path] };
  switch (path) {
    case 'MATCHES': {
      obj.selMatch = id;
      break;
    }
    case 'MATCH_VIEW': {
      obj.selMatch = id;
      props.package.fetchSquads(id);
      break;
    }
    case 'PLAYERS': {
      obj.selPlayer = id;
      break;
    }
    case 'PLAYER_VIEW': {
      const team = props.package.players[id].druzyna;
      obj.selPlayer = id;
      obj.selTeam = team;
      props.package.fetchMembers(team);
      props.package.fetchPlayerGames(id);
      break;
    }
    case 'TEAMS': {
      obj.selTeam = id;
      break;
    }
    case 'TEAM_VIEW': {
      obj.selTeam = id;
      props.package.fetchMembers(id);
      props.package.fetchTeamGames(id);
      break;
    }
    default: {
      break;
    }
  }
  props.package.changeStatus(obj);
};


export const teamName = (props, id) => (<div>{id}. {teamLabel(props, id)}</div>);

export const fullName = (player) => {
  const name = player.imie ? player.imie : null;
  const surname = player.nazwisko ? player.nazwisko : null;

  if (name && surname) return `${name} ${surname}`;
  else if (name || surname) return name || surname;
  return <small>Bezimienny zawodnik</small>;
};

export const makeTeamButton = (props, id) => (
  <Button className="btn btn-link my-btn-link" onClick={() => setter(props, 'TEAM_VIEW')(id)}>
    {teamName(props, id)}
  </Button>);


export const processMatches = (props, matches) => objMap(matches || props.package.matches, (el) => {
  if (!el.goście || !el.gospodarze) return el;
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

export const password = 'asdf';
