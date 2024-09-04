import { addToDatabase, checkDatabase } from "./db.js"
import { fetchProductByCode } from "./queryAPI.js"

export async function queryBarcode(code){
    // Check if the product is already in the database
    let {exists, product} = await checkDatabase(code)

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
        product,
        source: exists ? "database" : "API",
        cached_for: Date.now() - product.timestamp_added,
        error: false
    }
}