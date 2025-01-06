-- Create the database
CREATE DATABASE IF NOT EXISTS miechallenge;

-- Use the database
USE miechallenge;

-- Games Table
CREATE TABLE IF NOT EXISTS Games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    genre VARCHAR(100),
    description TEXT,
    min_players INT,
    max_players INT,
    rating DECIMAL(3,2),
    difficulty_level ENUM('Easy', 'Medium', 'Hard'),
    gif_url VARCHAR(255), -- Stores the relative path to the GIF
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GameSessions Table
CREATE TABLE IF NOT EXISTS GameSessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT,
    session_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_players INT NOT NULL,
    player_names TEXT,
    player_scores TEXT,
    highest_score INT,
    winner VARCHAR(255),
    comments TEXT,
    FOREIGN KEY (game_id) REFERENCES Games(game_id) ON DELETE CASCADE -- all corresponding rows in the current table that reference the deleted game_id will also be automatically deleted.
);

-- Insert sample data into Games table
INSERT INTO Games (title, genre, description, min_players, max_players, rating, difficulty_level, gif_url)
VALUES 
('Monopoly', 'Strategy', 'Real estate trading game', 2, 6, 4.2, 'Hard', '/gifs/monopoly.gif'),
('Chess', 'Strategy', 'Two-player strategy game played on a checkered board', 2, 2, 4.8, 'Hard', '/gifs/chess.gif'),
('UNO', 'Card', 'Family-friendly card game focused on matching colors or numbers', 2, 10, 4.3, 'Easy', '/gifs/uno.gif'),
('Catan', 'Strategy', 'Game of trading, building, and resource management', 3, 4, 4.6, 'Medium', '/gifs/catan.gif');

-- Insert sample data into GameSessions table
INSERT INTO GameSessions (game_id, session_date, start_time, end_time, total_players, player_names, player_scores, highest_score, winner, comments)
VALUES 
(1, '2023-01-15', '14:00:00', '15:30:00', 4, 'Alice, Bob, Carol, Dave', '80, 90, 70, 60', 90, 'Bob', 'An exciting Monopoly match!'),
(2, '2023-02-03', '17:00:00', '19:30:00', 4, 'Alice, Bob, Carol, Eve', '1200, 1500, 900, 800', 1500, 'Bob', 'Intense Monopoly session with unexpected twists.'),
(3, '2023-02-20', '19:00:00', '21:00:00', 2, 'Alice, Carol', '150, 200', 200, 'Carol', 'Tactical Chess moves all the way!'),
(4, '2023-03-01', '13:00:00', '14:30:00', 6, 'Alice, Bob, Carol, Dave, Eve, Frank', '50, 75, 65, 80, 90, 60', 90, 'Eve', 'UNO chaos with some wild cards played.');
