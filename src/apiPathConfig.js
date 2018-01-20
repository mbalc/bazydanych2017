const path = endpoint => `http://students.mimuw.edu.pl/~mb385130/bd/projekt2017/api/${endpoint}.php`;

export default ({
  GET_TEAMS: path('teams'),
  GET_PLAYERS: path('players'),
});
