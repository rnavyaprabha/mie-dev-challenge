module.exports = {
	getAdd: (req, res) => {
		res.render('add-game.ejs', {
			title: 'Board Games | Add game'
		});
	},
	getEdit: (req, res) => {
		res.render('edit-game.ejs', {
			title: 'Board Games | Edit game'
		});
	},
	postAdd: (req, res) => {
		// Extract game information from the form submission
		const { title, genre, description, minPlayers, maxPlayers, rating, difficulty_level } = req.body;
		
     
		let connection;

		// Use the connection pool to insert a new game into the database
		pool.getConnection()
			.then(conn => {
				connection = conn;
				return connection.query(
                    'INSERT INTO Games (title, genre, description, min_players, max_players, rating, difficulty_level) VALUES (?, ?, ?, ?, ?, ?,?)',
                    [title, genre, description, minPlayers, maxPlayers, rating, difficulty_level]
    
				);
			})
			.then(() => {
				console.log('Game added successfully');
				res.redirect('/'); // Redirect to the home page after adding a game
			})
			.catch(err => {
				console.error('Error adding game:', err);
				res.redirect('/add-game'); // Redirect to the add-game page in case of an error
			})
			.finally(() => {
				if (connection) {
					connection.release(); // Release the connection back to the pool
					console.log('connection released - postAdd in game.js');

				}
			})
			;
	},
	postEdit: (req, res) => {
		let id = req.params.id;

		// TODO db.query to update game

		res.redirect('/');
	}
};
