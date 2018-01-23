const path = endpoint => `http://students.mimuw.edu.pl/~mb385130/bd/projekt2017/static/api/${endpoint}.php`;

export default ({
  GET_TEAMS: path('teams'),
  GET_PLAYERS: path('players'),
  ADD_TEAM: path('addTeam'),
  ADD_PLAYER: path('addPlayer'),
  RESET: path('reset'),
});
