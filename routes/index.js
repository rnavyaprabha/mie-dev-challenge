// routes/index.js

module.exports = {
	getHomePage: async (req, res) => {
		let connection;
		const selectedGenre = req.query.genre || ''; // Get the selected genre from query params
		try {
			connection = await pool.getConnection();
			 // Fetch distinct genres from the Games table
			 const genresResult = await connection.query('SELECT DISTINCT genre FROM Games');
			 const genres = genresResult.map(row => row.genre);
			 // Fetch games filtered by the selected genre, or all games if no genre is selected
			 const gamesQuery = selectedGenre
			   ? 'SELECT * FROM Games WHERE genre = ? ORDER BY created_at DESC'
			   : 'SELECT * FROM Games ORDER BY created_at DESC';
			 const gamesParams = selectedGenre ? [selectedGenre] : [];
			 const games = await connection.query(gamesQuery, gamesParams);
			// Fetch the latest session details for the games
			const latestSessions = await connection.query(`
				SELECT gs.*
				FROM GameSessions gs
				INNER JOIN (
				  SELECT game_id, MAX(CONCAT(session_date, ' ', start_time)) AS latest_datetime
				  FROM GameSessions
				  GROUP BY game_id
				) latest
				ON gs.game_id = latest.game_id
				AND CONCAT(gs.session_date, ' ', gs.start_time) = latest.latest_datetime
			  `);
		
			// Map the latest session to the respective game
			const gamesWithLatestSession = games.map(game => {
				const latestSession = latestSessions.find(session => session.game_id === game.game_id);
				return { ...game, latestSession };
			  });
	
			 // Render the page with games, genres, and selectedGenre
			 res.render('index', { 
				games: gamesWithLatestSession, 
				genres, 
				selectedGenre, 
				title: 'Board Games' 
			  }); 
		} catch (err) {
			console.error('Error fetching data:', err);
			res.render('index', { games: [], genres: [], selectedGenre: '', title: 'Board Games' });

		} finally {
			if (connection) {
				connection.release(); // Release the connection back to the pool
			}
		}
	},
	
	// Display game history page
getGameHistoryPage: async (req, res) => {
    let connection;
	const searchQuery = req.query.search || ''; // Retrieve search query from request

    try {
        connection = await pool.getConnection();

        const [games, gameSessions] = await Promise.all([
            connection.query('SELECT * FROM Games'),
            connection.query('SELECT * FROM GameSessions'),
        ]);

		 // Filter game sessions by game title if a search query is provided
		 const filteredGameSessions = gameSessions.filter(session => {
            const game = games.find(g => g.game_id === session.game_id);
            return game && game.title.toLowerCase().includes(searchQuery.toLowerCase());
        });
        // Combine gameSessions with game information
        const gameSessionsWithGameInfo = filteredGameSessions.map(session => {
            const game = games.find(g => g.game_id === session.game_id);
            return { ...session, game };
        });
        // Reverse the array to display the most recent game session at the top
        gameSessionsWithGameInfo.reverse();
        res.render('game-history', {
            games,
            gameSessions: gameSessionsWithGameInfo,
            title: 'Game History',
			searchQuery, // Pass the search query to maintain it in the search bar
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.render('game-history', { games: [], gameSessions: [], title: 'Game History' });
    } finally {
        if (connection) connection.release();
    }
},
	// Handle the delete game session operation
	deleteGameSession: async (req, res) => {
		const { session_id } = req.params;

		try {
			await pool.query('DELETE FROM GameSessions WHERE session_id = ?', [session_id]);
			res.redirect('/');
		} catch (err) {
			console.error('Error deleting game session:', err);
			res.status(500).send('Internal Server Error');
		}
	},
};
