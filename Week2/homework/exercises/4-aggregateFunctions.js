//Exercise 4: Aggregate Functions
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

//Retrieve all research papers and the number of authors that wrote that paper.
queryDatabase(`
  SELECT COUNT(au.author_name) AS number_Of_Authors, re.paper_title AS Research_papers
  FROM Authors au 
  INNER JOIN Author_Research ar
  ON au.author_no = ar.author_no
  INNER JOIN Research_Papers re
  ON ar.paper_id = re.paper_id
  GROUP BY re.paper_title
  ORDER BY COUNT(au.author_name) DESC
`);

//Sum of the research papers published by all female authors.
queryDatabase(`
  SELECT count(*) AS    Papers_published_by_all_female
  FROM Authors au 
  INNER JOIN Author_Research ar
  ON au.author_no = ar.author_no
  INNER JOIN Research_Papers re
  ON ar.paper_id = re.paper_id
  WHERE au.gender = 'f'
`);

//Average of the h-index of all authors per university.
queryDatabase(`
  SELECT university, AVG(h_index) FROM Authors
  group by university
  ORDER BY AVG(h_index) DESC
`);

//Sum of the research papers of the authors per university.
queryDatabase(`
  SELECT au.university AS University, COUNT(re.paper_title) AS total_research_papers FROM Authors au 
  INNER JOIN Author_Research ar
  ON au.author_no = ar.author_no
  INNER JOIN Research_Papers re 
  ON re.paper_id = ar.paper_id
  group by university
  ORDER BY total_research_papers DESC
`);

//Minimum and maximum of the h-index of all authors per university.
queryDatabase(`
SELECT university, min(h_index) Minimum_of_the_h_index, max(h_index) maximum_of_the_h_index
FROM Authors
group by university
`)

db.end();

function queryDatabase(command) {
  db.query(command, (error, results) => {
    if (error) throw error;
    console.log(results);
  });
}
