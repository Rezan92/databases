var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
});

connection.connect();

queryDatabase("USE new_world");

//1-What are the names of countries with population greater than 8 million?
queryDatabase("SELECT Name FROM country WHERE Population > 8000000"); // 88 countries have population greater than 8000,000.

//2-What are the names of countries that have “land” in their names?
queryDatabase("SELECT Name FROM country WHERE Name LIKE '%land%'"); // 29 countries have "land" in their names.

//3-What are the names of the cities with population in between 500,000 and 1 million?
queryDatabase("SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000");// 303 cities have population between 500,000 and 1 million

// 4-What's the name of all the countries on the continent ‘Europe’?
queryDatabase("SELECT Name FROM country WHERE Continent = 'Europe'"); //46 countries

// 5-List all the countries in the descending order of their surface areas.
queryDatabase("SELECT Name FROM country ORDER BY SurfaceArea");

// 6-What are the names of all the cities in the Netherlands?
queryDatabase("SELECT Name FROM city WHERE CountryCode = 'NLD'"); //28 cities

// 7-WhatSELECT SUM(Population) FROM country is the population of Rotterdam?
queryDatabase("SELECT Population FROM city WHERE Name = 'Rotterdam'"); // 593321

// 8-What's the top 10 countries by Surface Area?
queryDatabase("SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10");

// 9-What's the top 10 most populated cities?
queryDatabase("SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10 ");

// 10-What is the population number of the world?
queryDatabase("SELECT SUM(Population) FROM country"); // 6078749450 is the population number of the world.


function queryDatabase(command) {
  connection.query(command, function (error, results, fields) {
    if (error) throw error;
    console.log("The results is: ", results);
    console.log("Count: ", results.length);
  });
}

connection.end();
