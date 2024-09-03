const DATABASE = {}

export async function checkDatabase(code){
    const q = DATABASE[code]
    return {exists: !!q, product: q}
}

export async function addToDatabase(code, product){
    DATABASE[code] = product
    return
}