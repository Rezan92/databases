const mysql = require("mysql");
const util = require("util");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "bank",
};

const INSERT_INTO_account = `
  INSERT INTO account (balance)
  VALUES(4000),(5000),(6000)`;

const INSERT_INTO_account_changes = `
  INSERT INTO account_changes (account_number, amount, changed_date, remark)
  VALUES(102, 1000, '2020-01-01', "Account changed")`;

async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(INSERT_INTO_account);
    await execQuery(INSERT_INTO_account_changes);
    connection.end();
  } catch (error) {
    console.error(error.message);
    connection.end();
  }
}

seedDatabase();
