const { MongoClient } = require('mongodb');

const uri ="mongodb+srv://admin:admin@revit-db.uqmmk.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Revit-DB"
const client = new MongoClient(uri)

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function createListing(client, newListing, collection) {
    const result = await client.db("Users").collection(collection).insertOne(newListing);
    console.log(`Got result id: ${result.insertedId}`);
}

async function findOneListing(client, listingName, collection) {
    const result = await client.db("Users").collection(collection).findOne({ username: listingName });
    if (result) {
        console.log(`Found listing with name ${listingName}`);
        console.log(result);
    } else {
        console.log(`No listing found with name ${listingName}`);
    }
}

async function main() {
    try {
        await client.connect();
        const newListing = {
            username: "User2",
            password: "password321"
        }
        await createListing(client, newListing, "Logins");
        const listingName = "User1";
        await findOneListing(client, listingName, "Logins");
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
