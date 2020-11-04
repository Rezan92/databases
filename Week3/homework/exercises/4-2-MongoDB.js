const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const url = `mongodb+srv://${username}:${password}@cluster0.iersd.mongodb.net/test`;
const dbName = "world";
const client = new MongoClient(url, { useUnifiedTopology: true });

(async function () {
  try {

    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("city");

    //1-Create a new record (document) for a new city (your home town, say)
    const insertCity = await col.insertOne({
        "city_id":"5000",
        "city_name":"Kobani",
        "CountryCode":"SY",
        'District':"Aleppo",
        "Population":600000
    });
     console.log("New city inserted",insertCity.ops);

    //2-Update that record with a new population
    const update = await col.updateOne(
      { city_name: "Kobani" },
      { $set: { Population: 555555 } }
    );

    //3-Read the document that you just updated in two ways : finding by the city name, and then by the country code
    const findByCityName = await col.find({ city_name: "Kobani" });
    await findByCityName.forEach((city) => console.log("Find by city name", city));

    const findByCountryCode = await col.find({ CountryCode: "SY" });
    await findByCountryCode.forEach((city) => console.log("Find by CountryCode:", city));

    //4-Delete the city
    await col.deleteOne({ city_name: "Kobani" });

  } catch (err) {
    console.log(err.stack);
    client.close();
  }

  client.close();
})();