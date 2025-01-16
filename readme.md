Game Vault: Board Game Night Planner
=====

Game Vault is a board game night planner designed to simplify organizing game nights. This app helps users track available games and maintain a history of all the times they’ve been played. Whether it’s adding new games, tracking session histories, or managing game details, Game Vault makes planning and managing game nights effortless and enjoyable.

🎥 Demo Video: https://youtu.be/vvRDgDktUlk?si=SOzGaebfrL5WaDtr

Main Features:
=====

Game Management
<<<<<<< HEAD
* View Games :Displays list of available games along with important information assicated with game
* Add Games: Add new games with relevant details.
* Edit Games: Update existing game information effortlessly.
* Latest Session Display: See the most recent session for each game on the Home Page.

Game Session Management
* Game History: View a list of game sessions.
* Add Game Sessions: Record sessions for any game.
* Multiple game session: Ability to add multiple game session records associated with a game.

Additional Features:
=====
* Delete Games: Remove games, with all associated session data automatically managed.
* Filter Games: Filter games by genre
* Gif: Add or edit GIFs for games.
* Edit Game Sessions: Update details of any game session.
* Delete Game Sessions: Remove specific sessions if no longer needed.
* Search: Find all sessions of a specific game
=======
* View Games: Displays a list of available games along with key information associated with each game.
* Add Games: Allows adding new games along with relevant details.
* Edit Games: Enables effortless updating of existing game information.
* Delete Games: Removes games and automatically manages all associated session data.
* Filter Games: Filter games by genre for easier navigation.
* Add/Edit GIFs: Add or edit GIFs to enhance the game's visual representation.
* Latest Session Display: Shows the most recent session for each game directly on the Home Page

Game Session Management
* Game History: View a list of all the game sessions.
* Add Game Sessions: Record new sessions for any game.
* Multiple Game Sessions: Allows adding multiple game session records associated with a particular game.
* Edit Game Sessions: Update details of any existing game session.
* Delete Game Sessions: Remove specific sessions that are no longer needed.
* Search: Easily search and find all sessions of a specific game.
>>>>>>> f7fd9a1d07c652a24b475b2bc11b8ee51ee2f2d0
* Automated database and application management using Docker and GitHub Actions.
  
Technologies Used:
=====

* Backend: Node.js
* Web Server: Express
* Templating Engine: EJS
* Database: MariaDB
* Automation: Dockerfile and GitHub Actions

<<<<<<< HEAD
Steps to run the Application with Docker
=====

=======
Run the Application with Docker:
=====
>>>>>>> f7fd9a1d07c652a24b475b2bc11b8ee51ee2f2d0
* Clone the repository: git clone https://github.com/rnavyaprabha/mie-dev-challenge.git
* Ensure Docker is installed on your system. If not, install Docker Desktop at https://www.docker.com/get-started/
* Navigate to the project directory in the terminal.
* Start the application: docker-compose up --build
* Access the app in your browser at http://localhost:3000

Stopping and Removing Services

* To stop the application:docker-compose down
* To remove all data and start fresh: docker-compose down --volumes

<<<<<<< HEAD
Steps to run the Application Manually
=======
Run the Application Manually
>>>>>>> f7fd9a1d07c652a24b475b2bc11b8ee51ee2f2d0
=====

* Clone this repository to your local machine.
* Install the required dependencies using npm: npm install
* Configure the database connection settings in config.js to match your database setup.
* Create the necessary database tables by running the SQL script found in database.sql.
<<<<<<< HEAD
* Start the application:`npm start`
=======

Start the application:

`npm start`
>>>>>>> f7fd9a1d07c652a24b475b2bc11b8ee51ee2f2d0
* Access the application in your web browser at http://localhost:3000.

Few Screenshots of Website:
=====

Home Page
=====
![Homepage](https://github.com/user-attachments/assets/d4dbc0a8-ba61-41ab-bb11-a0e4fce9ce4a)

![Homepage1](https://github.com/user-attachments/assets/b5269355-76a6-4c72-b98e-bfe19981c1a8)

Add Game
=====
![Addgame](https://github.com/user-attachments/assets/e08bf5a7-6782-42d8-bb8f-bf6a79365682)

Add Game Session
=====
![Addgamesession](https://github.com/user-attachments/assets/cd2f86f6-d88f-4a3d-a54a-50bd5e09aba5)

Game History
=====
![Gamehistory](https://github.com/user-attachments/assets/8c5d15c1-ff9b-449d-9917-1adabb003827)

Edit Game
=====
![Editgame](https://github.com/user-attachments/assets/7ac3a9ac-a53c-437f-bb7c-2e8278ec037d)

Edit Game session
=====
![Editgamesession](https://github.com/user-attachments/assets/00a67ecc-c51a-42eb-855b-0ea4d8ae6381)

Automation
=====
The application is fully automated using Docker and GitHub Actions, ensuring seamless building and testing. This setup makes it easy to manage both the app and database services.
This workflow file is part of the automation setup for Game Vault. 
The workflow is triggered in two scenarios:
* On Push: Automatically triggered when changes are pushed to the master branch.
* Manual Trigger: Can be manually executed using workflow_dispatch

Conclusion
=====
Game Vault combines functionality and simplicity, offering a user-friendly platform to organize game nights efficiently. With robust features, and automation, it’s designed to make planning a fun and hassle-free experience.
