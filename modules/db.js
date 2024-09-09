// --- DEBUG ---
// Temporary store the cached products in memory, in the future, the necessary functions to fetch and external DB will be implemented
const DATABASE = {}
// -------------
// --- MongoDB Atlas ---
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()
const uri = process.env.MONGODB_URI
let client
try{client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })}
catch(e){console.error("MongoDB URI not found in the environment variables")}
const CACHE = {}
// ----------------------


// =======================[ Facade functions ]=======================>

/**
 * Makes a query to the database where the products are stored
 * 
 * @param {Number} code 
 * @returns Object: `{ exists: true|false, product: {} }`
 */
export async function checkDatabase(code, format){
    // Looks for the code in the DB
    const q = await checkMongoDB(code, format)  // Replace with a utils function in case of changing the DB provider
    return {exists: !!q, product: q}
}


/**
 * 
 * @param {Number} code Code of the barcode that we want to add to the DB
 * @param {Object} product Product that will be stored in the DB under the code provided
 */
export async function addToDatabase(code, format, product){
    addToMongoDB(code, format, product)  // Replace with a utils function in case of changing the DB provider
}


// =======================[ Utils functions ]=======================>

// --------------------------------------- Local db --------------------------------------->
// Check
function checkMemoryDB(code) {
    return DATABASE[code]
}
// Add
function addToMemoryDB(code, product) {
    DATABASE[code] = product
}

// ------------------------------------------------------------------------------------------>
// ----------------------------------------- MongoDB ----------------------------------------->

async function checkMongoDB(code, format="ean") {
    const formats = {
        ean: "ean",
        ean_13: "ean",
    }
    format = formats[format] || format

    if (CACHE[code]) return CACHE[code]
    await client.connect()
    const collection = client.db("BARCODES").collection(format)
    // Find the document with the _id of the barcode
    const result = await collection.findOne({ _id: code })

    await client.close()

    return result
}

async function addToMongoDB(code, format, product) {
    await client.connect()
    const collection = client.db("BARCODES").collection(format)
    // Insert the product in the collection
    await collection.insertOne({product, _id: code})

    await client.close()
}