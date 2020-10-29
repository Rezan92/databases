//Exercise 1: Keys
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

db.connect();

queryDatabase("DROP DATABASE IF EXISTS dbhyf");
queryDatabase("CREATE DATABASE dbhyf");
queryDatabase("USE dbhyf");
queryDatabase(`CREATE TABLE Authors(
    author_no int AUTO_INCREMENT PRIMARY KEY, 
    author_name VARCHAR(50), 
    university VARCHAR(50), 
    date_of_birth DATE, 
    h_index INT, 
    gender ENUM("m", "f")
)`);

queryDatabase("ALTER TABLE Authors ADD Collaborator int");
queryDatabase("ALTER TABLE Authors ADD FOREIGN KEY(Collaborator) REFERENCES Authors(author_no)");

db.end();

function queryDatabase(command) {
  db.query(command, (error, results) => {
    if (error) throw error;
    console.log(command.slice(0, 20), results.serverStatus);
  });
}
