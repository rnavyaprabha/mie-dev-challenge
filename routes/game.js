// routes/game.js
const multer = require('multer');
const path = require('path');

// Configure storage for GIF uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/gifs'); // Store GIFs in the 'public/gifs' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
    }
});


// Initialize multer upload middleware
const upload = multer({ storage: storage });

module.exports = {
	getAdd: (req, res) => {
		res.render('add-game.ejs', {
			title: 'Board Games | Add game'
		});
	},

	// Render the edit game form
	getEdit: (req, res) => {
		const gameId = req.params.id;
		let connection;

		// Use the connection pool to query the database for the selected game
		pool.getConnection()
			.then(conn => {
				connection = conn;
				return connection.query('SELECT * FROM Games WHERE game_id = ?', [gameId]);
			})
			.then(game => {
				if (game.length === 0) {
					res.redirect('/'); // Redirect to home if the game is not found
				} else {
					res.render('edit-game', { game: game[0], title: 'Board Games | Edit Game' }); // Pass the fetched game and title to the EJS template
				}
			})
			.catch(err => {
				console.error('Error fetching game for edit:', err);
				res.redirect('/');
			})
			.finally(() => {
				if (connection) {
					connection.release(); // Release the connection back to the pool
					console.log('connection released - getEdit in game.js');
				}
			})
			;
	},

	// Add a new game with GIF upload
postAdd: (req, res) => {
    upload.single('gif')(req, res, (err) => {
        if (err) {
            console.error('Error uploading GIF:', err);
            return res.redirect('/add-game'); // Redirect back if error occurs
        }

        const { title, genre, description, minPlayers, maxPlayers, rating, difficulty_level } = req.body;
        let connection;
        let gifUrl = null;

        if (req.file) {
            gifUrl = `/gifs/${req.file.filename}`; // Store the relative path to the GIF
        }

        // Use database connection to insert game details
        pool.getConnection()
            .then(conn => {
                connection = conn;
                return connection.query(
                    'INSERT INTO Games (title, genre, description, min_players, max_players, rating, difficulty_level, gif_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [title, genre, description, minPlayers, maxPlayers, rating, difficulty_level, gifUrl]
                );
            })
            .then(() => {
                res.redirect('/'); // Redirect to homepage after adding game
            })
            .catch(err => {
                console.error('Error adding game:', err);
                res.redirect('/add-game'); // Redirect back if error occurs
            })
            .finally(() => {
                if (connection) {
                    connection.release();
                }
            });
    });
},

postEdit: (req, res) => {
    upload.single('gif')(req, res, (err) => {
        if (err) {
            console.error('Error uploading GIF:', err);
            return res.redirect(`/edit-game/${req.params.id}`);
        }

        const gameId = req.params.id;
        const { title, genre, description, minPlayers, maxPlayers, rating, difficulty_level } = req.body;
        let connection;
        let gifUrl = req.file ? `/gifs/${req.file.filename}` : null;

        pool.getConnection()
            .then(conn => {
                connection = conn;

                // Fetch the current game details to check existing GIF
                return connection.query('SELECT gif_url FROM Games WHERE game_id = ?', [gameId]);
            })
            .then(results => {
                if (results.length === 0) {
                    throw new Error('Game not found.');
                }

                const currentGifUrl = results[0].gif_url;

                // If no new GIF is uploaded, retain the old GIF URL
                gifUrl = gifUrl || currentGifUrl;

                const query = `
                    UPDATE Games 
                    SET title=?, genre=?, description=?, min_players=?, max_players=?, rating=?, difficulty_level=?, gif_url=? 
                    WHERE game_id=?
                `;

                const queryParams = [title, genre, description, minPlayers, maxPlayers, rating, difficulty_level, gifUrl, gameId];

                return connection.query(query, queryParams);
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.error('Error editing game:', err);
                res.redirect(`/edit-game/${gameId}`);
            })
            .finally(() => {
                if (connection) connection.release();
            });
    });
},

	// Handle the delete game operation
	postDelete: (req, res) => {
		const gameId = req.params.id;
		let connection;

		// Use the connection pool to delete corresponding game sessions first
		pool.getConnection()
			.then(conn => {
				connection = conn;
				return connection.query('DELETE FROM GameSessions WHERE game_id = ?', [gameId]);
			})
			.then(() => {
				// Now that game sessions are deleted, delete the game
				return connection.query('DELETE FROM Games WHERE game_id = ?', [gameId]);
			})
			.then(() => {
				res.redirect('/'); // Redirect to home after deleting
			})
			.catch(err => {
				console.error('Error deleting game:', err);
				res.redirect('/');
			})
			.finally(() => {
				if (connection) {
					connection.release(); // Release the connection back to the pool
					console.log('connection released - postDelete in game.js');

				}
			})
			;
	}
};
