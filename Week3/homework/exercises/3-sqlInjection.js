function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }

 /*
 1-Give an example of a value that can be passed as name and code that would take advantage of 
 SQL-injection and (fetch all the records in the database)

 name = "Amsterdam"
 code = `"NL" or 1=1; SHOW TABLES`
 the query after ; will be executed.
 */

// 2-Rewrite the function so that it is no longer vulnerable to SQL injection
// To fix that we can map values in the array to placeholders (the question marks) in the same order as they are passed.
function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ? WHERE Name = ? and code = ?`,[Country, name, code],
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }