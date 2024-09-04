// --- DEBUG ---
// Temporary store the cached products in memory, in the future, the necessary functions to fetch and external DB will be implemented
const DATABASE = {}
// -------------


// =======================[ Facade functions ]=======================>

/**
 * Makes a query to the database where the products are stored
 * 
 * @param {Number} code 
 * @returns Object: `{ exists: true|false, product: {} }`
 */
export async function checkDatabase(code){
    // Looks for the code in the DB
    const q = checkMemoryDB(code)  // Replace with a utils function in case of changing the DB provider
    return {exists: !!q, product: q}
}


/**
 * 
 * @param {Number} code Code of the barcode that we want to add to the DB
 * @param {Object} product Product that will be stored in the DB under the code provided
 */
export async function addToDatabase(code, product){
    addToMemoryDB(code, product)  // Replace with a utils function in case of changing the DB provider
}


// =======================[ Utils functions ]=======================>

// --- Local db ---
// Check
function checkMemoryDB(code) {
    return DATABASE[code]
}
// Add
function addToMemoryDB(code, product) {
    DATABASE[code] = product
}