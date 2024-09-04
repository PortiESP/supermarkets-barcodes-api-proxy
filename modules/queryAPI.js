const API = {
    // Scanbot API
    // name: "scanbot",
    // URL:"https://scanbot.io/wp-json/upc/v1/lookup/"

    // Scanbot API (proxy)
    name: "scanbot",
    URL:"scanbot/wp-json/upc/v1/lookup/"
}

// ===============================[ Fetchers ]===============================

export async function fetchProductByCode(code){
    const url = API.URL + code  // URL to fetch the product data
    const response = await fetch(url)  // Fetch the product data from the API

    // Parse the response based on the API
    const parsedResponse = API.name === "scanbot" ? await parseScanbotResponse(response) 
                            : await response.text()     

    // Return the parsed response
    return {error: !parsedResponse, product: parsedResponse}    
}

// ===============================[ Parsers ]===============================

async function parseScanbotResponse(response){
    const json = await response.json()
    const prod = json.product

    if (!prod) return null

    return {
        name: prod.name,
        brand: prod.brand,
        description: prod.description,
        image: prod.imageUrl,
        categories: prod.categoryPath,
        codeType: json.codeType,
        timestamp_added: Date.now()
    }
}
