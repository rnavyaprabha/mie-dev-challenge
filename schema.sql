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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data into Games table
INSERT INTO Games (title, genre, description, min_players, max_players, rating, difficulty_level)
VALUES 
('Monopoly', 'Strategy', 'Real estate trading game', 2, 6, 4.2, 'Hard'),
('Chess', 'Strategy', 'Two-player strategy game played on a checkered board', 2, 2, 4.8, 'Hard'),
('UNO', 'Card', 'Family-friendly card game focused on matching colors or numbers', 2, 10, 4.3, 'Easy'),
('Catan', 'Strategy', 'Game of trading, building, and resource management', 3, 4, 4.6, 'Medium');

# TODO: add sample data
