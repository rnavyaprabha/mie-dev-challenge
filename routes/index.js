// routes/index.js

module.exports = {
	getHomePage: async (req, res) => {
		let connection;

		try {
			connection = await pool.getConnection();

			// Fetch games and their latest session
			const [games, latestSessions] = await Promise.all([
				connection.query('SELECT * FROM Games ORDER BY created_at DESC'),
				connection.query(
					`SELECT gs.*
                    FROM GameSessions gs
                    INNER JOIN (
                    SELECT game_id, MAX(CONCAT(session_date, ' ', start_time)) AS latest_datetime
                    FROM GameSessions
                    GROUP BY game_id
                    ) latest
                    ON gs.game_id = latest.game_id
                    AND CONCAT(gs.session_date, ' ', gs.start_time) = latest.latest_datetime`

				),
			]);
	
			// Map the latest session to the respective game
			const gamesWithLatestSession = games.map(game => {
				const latestSession = latestSessions.find(session => session.game_id === game.game_id);
				return { ...game, latestSession };
			});

			res.render('index', { games: gamesWithLatestSession, title: 'Board Games' });
		} catch (err) {
			console.error('Error fetching data:', err);
			res.render('index', { games: [], title: 'Board Games' });
		} finally {
			if (connection) {
				connection.release(); // Release the connection back to the pool
			}
		}
	},
	
	// Display game history page
getGameHistoryPage: async (req, res) => {
    let connection;

    try {
        connection = await pool.getConnection();

        const [games, gameSessions] = await Promise.all([
            connection.query('SELECT * FROM Games'),
            connection.query('SELECT * FROM GameSessions'),
        ]);

        // Combine gameSessions with game information
        const gameSessionsWithGameInfo = gameSessions.map(session => {
            const game = games.find(g => g.game_id === session.game_id);
            return { ...session, game };
        });
        // Reverse the array to display the most recent game session at the top
        gameSessionsWithGameInfo.reverse();
        res.render('game-history', {
            games,
            gameSessions: gameSessionsWithGameInfo,
            title: 'Game History',
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
