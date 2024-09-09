import { addToDatabase, checkDatabase } from "./db.js"
import { fetchProductByCode } from "./queryAPI.js"


/**
 * 
 * @param {Number} code The barcode number that will be consulted
 * @param {String} format The format of the barcode (e.g. "ean", "upc", etc.)
 * @returns An object containing the following information
 * - `error` : Whether if the search found a corresponding product for the barcode or not
 * - `product` : The object containing the product data
 * - `source` : Contains whether if the product data was retrieved from the "API" of the "database"
 * - `cached_for` : Time in ms since the last update of the product
 */
export async function queryBarcode(code, format){
    // Check if the product is already in the database
    let {exists, product} = await checkDatabase(code, format)

    console.log(`\n[i] Product ${code} ${exists ? "found" : "not found"} in database`)

    // If not exists, fetch the product from the API
    if (!exists) {
        console.log(`[i] Fetching product ${code} from API`)
        const apiResponse = await fetchProductByCode(code)

        // If the API returns an error, return the error
        if (apiResponse.error) {
            console.log(`[!] Error fetching product ${code} from API`)
            return {error: apiResponse.error}
        }

        // If the API returns a product, assign it to the product variable
        product = apiResponse.product
        await addToDatabase(code, product)
        console.log(`[+] Product ${code} added to database`)
    }

    return {
        error: false,
        product,
        source: exists ? "database" : "API",
        cached_for: Date.now() - product.timestamp_added,
    }
}