//Exercise 2: Relationships

//Run the following file before you run this file:
//1-"node primaryAndforeignKeys.js"

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "dbhyf",
});

db.connect();

//Create Pesearch_Papers table
queryDatabase(`CREATE TABLE IF NOT EXISTS Research_Papers (
    paper_id int PRIMARY KEY,
    paper_title VARCHAR(50),
    conference VARCHAR(50),
    publish_date DATE
  )`);

  //Create the bridge table
queryDatabase(`CREATE TABLE IF NOT EXISTS Author_Research (
    author_no int,
    paper_id int,
    FOREIGN KEY(author_no) REFERENCES Authors(author_no),
    FOREIGN KEY(paper_id) REFERENCES Research_Papers(paper_id)
  )`);
 
  const gender = ["m","f"];

  // Insert 15 rows to the Authors table
  for(let i = 1 ; i <= 15 ; i++){
      queryDatabase(`INSERT INTO Authors ( author_name, university, date_of_birth, h_index, gender)
      VALUES( "Author-${i}", "university-${createRandomNum(1,4)}","1980-05-05", ${i}, "${gender[createRandomNum(0,1)]}")`)
  }

  // Insert 30 rows to the Research_Papers table
  for(let i = 1 ; i <= 30 ; i++){
    queryDatabase(`INSERT INTO Research_Papers VALUES(${i}, "paper-${i}", "conference-${i}", "2001-05-05")`);
  }

  // Insert 30 rows to the Author_Research(JOIN) table
  for(let i = 1 ; i <= 30 ; i++){
    queryDatabase(`INSERT INTO Author_Research VALUES(${createRandomNum(1,15)}, ${createRandomNum(1,30)})`);
  }

  // Update the Collaborator column to use it for exercise 3
  for(let i = 1 ; i <= 15 ; i++){
    queryDatabase(`UPDATE Authors SET Collaborator = ${16-i} WHERE author_no = ${i}`)
  }

db.end();

function queryDatabase(command) {
  db.query(command, (error, results) => {
    if (error) throw error;
    // console.log(results.serverStatus);
  });
}

function createRandomNum(min, max){
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random
}
