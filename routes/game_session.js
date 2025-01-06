// routes/game_session.js

module.exports = {
	getAdd: async (req, res) => {
	  let connection;
  
	  try {
		// Fetch available games to populate the dropdown
		connection = await pool.getConnection();
		const games = await connection.query('SELECT game_id, title FROM Games');
		res.render('add-game-session.ejs', {
		  title: 'Board Games | Add Game Session',
		  games,
		});
	  } catch (err) {
		console.error('Error fetching games for session add:', err);
		res.redirect('/');
	  } finally {
		if (connection) {
		  connection.release(); // Release the connection back to the pool
		  console.log('Connection released - getAdd in game_session.js');
		}
	  }
	},
  
	// Process the form submission for adding a game-playing session
	postAdd: async (req, res) => {
	  let connection;
	  const {
		gameId,
		session_date,
		startTime,
		endTime,
		totalPlayers,
		playerNames,
		playerScores,
		highestScore,
		winner,
		comments,
	  } = req.body;
  
	  try {
		connection = await pool.getConnection();
  
		// Insert a new game session into the 'GameSessions' table
		await connection.query(
		  'INSERT INTO GameSessions (game_id, session_date, start_time, end_time, total_players, player_names, player_scores, highest_score, winner, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		  [
			gameId,
			session_date,
			startTime,
			endTime,
			totalPlayers,
			playerNames,
			playerScores,
			highestScore,
			winner,
			comments,
		  ]
		);
  
		console.log('Game session added successfully');
		res.redirect('/game-history'); // Redirect to the home page after adding a game session successfully
	  } catch (err) {
		console.error('Error adding game session:', err);
		res.redirect('/add-game-session'); // Redirect to the add-game-session page in case of an error
	  } finally {
		if (connection) {
		  connection.release(); // Release the connection back to the pool
		  console.log('Connection released - postAdd in game_session.js');
		}
	  }
	},
	
	// Route to show the form for editing an existing game session
	getEdit: async (req, res) => {
	  const { session_id } = req.params;
	  let connection;
	
	  try {
		connection = await pool.getConnection();
		const sessions = await connection.query('SELECT * FROM GameSessions WHERE session_id = ?', [session_id]);
	
		if (sessions.length === 0) {
		  return res.status(404).send('Game session not found');
		}
	
		const session = sessions[0];
		 // Format the session_date to YYYY-MM-DD format for the input field
		const formattedSessionDate = new Date(session.session_date).toISOString().split('T')[0];
		const games = await connection.query('SELECT game_id, title FROM Games');
	
		res.render('edit-game-session.ejs', {
		  title: 'Board Games | Edit Game Session',
		  games,
		  session: { ...session, session_date: formattedSessionDate }, // Pass the existing session data to pre-fill the form
		});
	  } catch (err) {
		console.error('Error fetching data for session edit:', err);
		res.redirect('/');
	  } finally {
		if (connection) {
		  connection.release(); // Release the connection back to the pool
		  console.log('Connection released - getEdit in game_session.js');
		}
	  }
	},
	
  
	// Process the form submission for editing a game-playing session
	postEdit: async (req, res) => {
	  const { session_id } = req.params;
	  let connection;
	  const {
		gameId,
		session_date,
		startTime,
		endTime,
		totalPlayers,
		playerNames,
		playerScores,
		highestScore,
		winner,
		comments,
	  } = req.body;
  
	  try {
		connection = await pool.getConnection();
  
		// Update the game session in the 'GameSessions' table
		await connection.query(
		  'UPDATE GameSessions SET game_id = ?, session_date = ?, start_time = ?, end_time = ?, total_players = ?, player_names = ?, player_scores = ?, highest_score = ?, winner = ?, comments = ? WHERE session_id = ?',
		  [
			gameId,
			session_date,
			startTime,
			endTime,
			totalPlayers,
			playerNames,
			playerScores,
			highestScore,
			winner,
			comments,
			session_id,
		  ]
		);
  
		console.log('Game session updated successfully');
		res.redirect('/game-history'); // Redirect to the updated game session page
	  } catch (err) {
		console.error('Error updating game session:', err);
		res.redirect(`/edit-game-session/${session_id}`); // Redirect back to the edit page in case of an error
	  } finally {
		if (connection) {
		  connection.release(); // Release the connection back to the pool
		  console.log('Connection released - postEdit in game_session.js');
		}
	  }
	},
  
	// Delete a game session
	postDelete: async (req, res) => {
	  const { session_id } = req.params;
	  let connection;
	  try {
		connection = await pool.getConnection();
		// Delete the game session from the 'GameSessions' table
		await connection.query('DELETE FROM GameSessions WHERE session_id = ?', [session_id]);
		console.log('Game session deleted successfully');
		res.redirect('/game-history');
	  } catch (err) {
		console.error('Error deleting game session:', err);
		res.redirect('/game-history');
	  } finally {
		if (connection) {
		  connection.release(); // Release the connection back to the pool
		  console.log('Connection released - deleteGameSession in game_session.js');
		}
	  }
	},
  };
  