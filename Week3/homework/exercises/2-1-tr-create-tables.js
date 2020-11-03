const mysql = require("mysql");
const util = require("util");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
};

const DROP_bank = "DROP DATABASE bank";
const CREATE_BANK_DATABASE = "CREATE DATABASE IF NOT EXISTS bank";
const USE_bank = "USE bank";
const CREATE_TABLE_account = `CREATE TABLE IF NOT EXISTS account(
  account_number INT PRIMARY KEY AUTO_INCREMENT,
  balance DECIMAL(15,2)
)AUTO_INCREMENT=100`;

const CREATE_TABLE_account_changes = `CREATE TABLE IF NOT EXISTS account_changes (
  change_number INT PRIMARY KEY AUTO_INCREMENT,
  account_number INT,
  amount DECIMAL(15,2),
  changed_date DATETIME,
  remark VARCHAR(50),
  FOREIGN KEY(account_number) REFERENCES account(account_number)
)`;

async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(DROP_bank);
    await execQuery(CREATE_BANK_DATABASE);
    await execQuery(USE_bank);
    await execQuery(CREATE_TABLE_account);
    await execQuery(CREATE_TABLE_account_changes);
    connection.end();
  } catch (error) {
    console.error(error.message);
    connection.end();
  }
};

seedDatabase();