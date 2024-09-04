# Barcodes API proxy

This repo provides de functionality to query the corresponding product from its barcode.

There is two ways to use this repo

> 🖥️ **As a standalone API server**
> 
> This method involves running the `server.js` file to start an Express server. This server will be an API with a unique endpoint being it `/query?barcode=XXXXXXX` and passing the barcode as a query parameter

> 🧩 **As a module of another project**
>
> This method ignores the *server* file and just requires the programmer to import the `queryBarcode(barcode)` function from the `proxy.js` file

----------------------------------------------------------------------------------------------------------------------------

## Examples

### Example of the option: As a standalone API server

**Server**

```sh
node server.js
```

**Client**

```js
fetch("mydomain.com:1234/query=12345678")
.then(res => res.json())
.then(console.log)
```

### Example of the option: As a module of another project

```js
import { queryBarcode } from './supermarkets-barcodes-api-proxy/modules/proxy'

// ...

queryBarcode(12345678)
.then(res => res.json())
.then(console.log)
```

----------------------------------------------------------------------------------------------------------------------------

## Returned data

The data returned to the user after querying the barcode in the database/API contains the following information (both in the server or module method)

```js
{
    error: false, // Contains if the barcode was found
    product: {},  // Contains the data stored for scanner product (may vary depending on the API being used)
    source: "",   // Will return if the data was retrieved from the local "database" or an external "API"]
    cached_for: 123456789  // Time in ms since the last update of the product with the API
}
```

The `product` fields may vary depending on the API being used to retrieve the barcodes data

At the moment the API being used is the `scanbot.io` API.

> Example 1 of a valid response:

```json
{
    "code": "8411610006290",
    "codeType": "EAN",
    "product": {
        "name": "Chufi Horchata De Chufa Original - 1 L",
        "description": "Botella 1 L en caja de 6 UDS Refrescante bebida vegetal elaborada a partir de chufa que se caracteriza por su original e irresistible sabor.",
        "region": "Outside of North America",
        "imageUrl": "https://go-upc.s3.amazonaws.com/images/79573579.png",
        "brand": "Chufi",
        "specs": [ ],
        "category": null,
        "ingredients": {
            "text": "10 Ingredients Water, Tiger Nuts, Sugar, Emulsifier (e-472c), Stabilisers (e-407), Antioxidant (e-301) And Aroma"
        },
        "upc": null,
        "ean": 8411610006290
    },
    "inferred": false
}
```

> Example 2

```json
{
    "code": "8410000827446",
    "codeType": "EAN",
    "product": {
        "name": "Oreo Original 10x Family Format 440g",
        "description": "Biscuits. Marque OREO. Vendu à l'unité. EAN 8410000827446.",
        "region": "Outside of North America",
        "imageUrl": "https://go-upc.s3.amazonaws.com/images/63513823.jpeg",
        "brand": "Oreo",
        "specs": [
            [
                "Size",
                "44 G (paquete De 10)"
            ],
            [
                "Binding",
                "Comestibles"
            ],
            [
                "Part Number",
                "50242"
            ],
            [
                "Width",
                "2.5196850368 Pulgadas"
            ],
            [
                "Number Of Items",
                "10"
            ],
            [
                "Height",
                "4.2519684996 Pulgadas"
            ],
            [
                "Length",
                "9.4881889667 Pulgadas"
            ],
            [
                "Product Group",
                "Comestibles"
            ]
        ],
        "category": "Cookies",
        "categoryPath": [
            "Food, Beverages & Tobacco",
            "Food Items",
            "Bakery",
            "Cookies"
        ],
        "ingredients": {
            "text": "16 Ingredients "Spanish": Harina De Trigo, Azúcar, Grasa De Palma, Aceite De Nabina, Cacao Magro En Polvo 4, 5 %, Almidón De Trigo, Jarabe De Glucosa Y Fructosa, Gasificantes (carbonatos De Potasio, Carbonatos De Amonio, Carbonatos De Sodio), Sal, Emulgentes (lecitina De Soja, Lecitina De Girasol), Aroma."
        },
        "upc": null,
        "ean": 8410000827446
    },
    "inferred": false
}
```