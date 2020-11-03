const mysql = require("mysql");
const util = require("util");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "bank",
};

const START_TRANSACTION = "START TRANSACTION";
const TRANSFER_FROM = `
  UPDATE account 
  SET balance = balance - 1000
  WHERE account_number = 101`;

const TRANSFER_TO = `
  UPDATE account 
  SET balance = balance + 1000
  WHERE account_number = 102`;

const INSERT_INTO_account_changes = `
  INSERT INTO account_changes (account_number, amount, changed_date, remark)
  VALUES(101, 1000, '2020-01-01', "1000 has been deducted from the account"),
        (102, 1000, '2020-01-01', "1000 has been added to the account")`;

const COMMIT = "COMMIT";
const ROLLBACK = "ROLLBACK";

async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(START_TRANSACTION);
    await execQuery(TRANSFER_FROM);
    await execQuery(TRANSFER_TO);
    await execQuery(INSERT_INTO_account_changes);
    await execQuery(COMMIT);
    connection.end();
  } catch (error) {
    console.error(error.message);
    execQuery(ROLLBACK);
    connection.end();
  }
};

seedDatabase();
