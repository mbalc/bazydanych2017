const path = endpoint => `http://students.mimuw.edu.pl/~mb385130/bd/projekt2017/static/api/${endpoint}.php`;

export default ({
  GET_TEAMS: path('teams'),
  GET_PLAYERS: path('players'),
  GET_MATCHES: path('matches'),
  GET_MEMBERS: path('members'),
  ADD_TEAM: path('addTeam'),
  ADD_PLAYER: path('addPlayer'),
  ADD_MATCH: path('addMatch'),
  GET_TEAM_GAMES: path('teamGames'),
  GET_PLAYER_GAMES: path('playerGames'),
  RESET: path('reset'),
  CLOSE: path('closeEntry'),
  GET_DEADLINE: path('deadline'),
});
