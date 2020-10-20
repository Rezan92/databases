const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();

queryDatabase("DROP DATABASE IF EXISTS meetup");
queryDatabase("CREATE DATABASE meetup");
queryDatabase("USE meetup");
queryDatabase(
  "CREATE TABLE Invitee (invitee_no int, invitee_name varchar(50), invited_by varchar(50))"
);
queryDatabase(
  "CREATE TABLE Room (room_no int, room_name varchar(50), floor_number int)"
);
queryDatabase(
  "CREATE TABLE Meeting (meeting_no int, meeting_title varchar(50), starting_time datetime, ending_time datetime, room_no int)"
);
queryDatabase(
  `INSERT INTO Invitee VALUES 
  (1, 'Invitee1', 'name1'), 
  (2, 'Invitee2', 'name2'), 
  (3, 'Invitee3', 'name3'), 
  (4, 'Invitee4', 'name4'), 
  (5, 'Invitee5', 'name5')`
);
queryDatabase(
  `INSERT INTO Room VALUES 
  (1, 'Room1', '5'), 
  (2, 'Room2', '10'), 
  (3, 'Room3', '9'), 
  (4, 'Room4', '4'), 
  (5, 'Room5', '3')`
);
queryDatabase(
  `INSERT INTO Meeting VALUES 
  (1, 'Meeting1', '2020-10-22', '2020-10-22', 2), 
  (2, 'Meeting2', '2020-10-22', '2020-10-22', 1), 
  (3, 'Meeting3', '2020-10-22', '2020-10-22', 5), 
  (4, 'Meeting4', '2020-10-22', '2020-10-22', 4), 
  (5, 'Meeting5', '2020-10-22', '2020-10-22', 3)`
);

function queryDatabase(command) {
  connection.query(command, (error, results, fields) => {
    if (error) throw error;
    console.log("The result is: ", results.serverStatus);
  });
}

connection.end();
