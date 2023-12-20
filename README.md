# SQL-Employee-Tracker
This is an SQL project written in Javascript to manage the organizational layout for a fictional company

## Description
This project was a very thorough exploration of SQL interactions. It was originally written to use sql2, but I decided to go with sequelize once I learned of sequelized's existence. I really appreciated how it let me design table structures in a modular, object oriented-like way using models. It really simplified the process of queries and database interactions, as well as really provided me with a way layout my database in a logical way. I also liked how it let me create database associations, though they were tricky at first.

Even though sequelize made the process easier, I think it was my third challenge for this project. The first issue was making the program loop while using inquirer. This project provided the opportunity to practice the use of "async" functions and the "await" keyword, which prevented me from going down a function spiral. They provided me a way to ask questions in series too, unlike previous projects where I could only have one question section per program execution.

The second issue was actually setting up the database and seeding it. I created a config file to store the login credentials, then used dotenv and a .env file to be more secure with my login credentials. After that, I used json files to store the seed data and I then created a separate javascript (seed.js) to actually bulk create the data entries in the database.

## Installation
This project requires the following packages to function:
1) "dotenv" which can be found at [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
2) "sequelize" which can be found at [https://sequelize.org/docs/v6/](https://sequelize.org/docs/v6/)
3) "inquirer" which can be found at [Inquirer.js](https://www.npmjs.com/package/inquirer/v/8.2.4) .


## Usage
Once installed, the user needs to navigate to the folder with the '''index.js''' file in their code editor or terminal. Once there, the user needs to run '''node index.js''' in the terminal to begin the prompt section. The user just needs to make their selections, then follow the information requests for information. All information entered will be the string form of an alphanumeric character. The user does need to enter either ONLY digits or ONLY letters, depending on the prompt. 

A GIF of the project can be seen ![SVG Log Maker Demo Gif](./assets/SQL%20Manager%20Demo.gif) 
<br>
A video walkthrough of the proper commands and their output can be found <a href="./assets/SQL Manager Demo.mp4"> here</a>.

## License
This product is protected by a [MIT License](http://choosealicense.com/licenses/mit).

## Contributing
I, Alex Messina, authored this code completely. 

## Tests
No tests were prepared for this project. Error codes will be displayed by SQL if they occur and erratic behavior can be observed since the output is printed to console.

## Questions
My GitHub username is [ExecutorKarthan](https://github.com/ExecutorKarthan) and this project can be found at [https://github.com/ExecutorKarthan/SQL-Employee-Manager](https://github.com/ExecutorKarthan/SQL-Employee-Manager)

If you have questions or concerns about this project, please email me at me@alexmessina.dev
