- Go to https://www.mongodb.com/
- Log in to your mongodb account
- Add your connection IP address to your IP access list.
- Create a database user for your cluster.
- Create new Cluster
- Select a cloud provider
- Make connection with your account by clicking on the CONNECT button in the SANDBOX.
- Choose connection method (connect using MongoDB Compass).
- Install MongoDB Compass.
- Copy the connection string then open MongoDB Compass.
- Paste the connection string in the connection string field and add your password then click connect,
   now your mongoDB Atlas account is connected.
- In your MongoDB Compass click on create database and a collection by clicking on the CREATE DATABASE button.
- Open your terminal and log in to your mysql account.
- export the tables from your mysql by running the following lines of code
  select * into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
  select * into outfile 'country.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from country;
  select * into outfile 'countrylanguage.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from   countrylanguage;
  if you get an error then make sure you find the right path to you .csv files
- Go to MongoDB Compass and click on the collection you want to add data to it and click on Import Data and
  select the file that you created from the last step and select the right datatype for each column then click Import and the data will be imported into your collection.
