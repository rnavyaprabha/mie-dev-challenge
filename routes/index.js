module.exports = {
	getHomePage: async (req, res) => {
		let connection;

		try {
			connection = await pool.getConnection();

			const [games] = await Promise.all([
				connection.query('SELECT * FROM Games'),
			]);

			res.render('index', { games,title: 'Board Games' });
		} catch (err) {
			console.error('Error fetching data:', err);
			res.render('index', { games: [],title: 'Board Games' });
		} finally {
			if (connection) {
				connection.release(); // Release the connection back to the pool
			}
		}
	},
};
