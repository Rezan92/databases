//Exercise 3: Joins

//Run the following files one time before you run this file 
// 1-"node primaryAndforeignKeys.js" 
// 2-"node relationships.js"

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "dbhyf",
});

db.connect();

// Prints names of all Authors and their corresponding Collaborators.
queryDatabase(`
  SELECT 
  a1.author_name AS Author,
  a2.author_name AS Collaborator 
  FROM Authors a1
  INNER JOIN Authors a2
  ON a1.author_no = a2.Collaborator`
  );

// Prints all columns of Authors and their published paper_title. 
queryDatabase(`
  SELECT * 
  FROM Authors a
  LEFT JOIN Author_Research ar
  ON a.author_no = ar.author_no
  LEFT JOIN Research_Papers rp
  ON ar.paper_id = rp.paper_id`
  );

db.end();

function queryDatabase(command) {
    db.query(command, (error, results) => {
      if (error) throw error;
      console.log(results);
    });
  }