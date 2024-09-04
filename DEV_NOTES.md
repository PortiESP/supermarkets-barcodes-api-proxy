# Update DB client

Edit the functions `checkDatabase(code)` and `addToDatabase(code, product)` in the file `db.js`

# Update the API to check the barcodes

Update the following lines in the `queryAPI.js` file

- Update the `API` object, comment the current fields and add the `name` and `url` of the new API
- Define a parser function for the new API, such as `parseScanbotResponse`
- Add a new parse option in the `fetchProductByCode` function for the new API