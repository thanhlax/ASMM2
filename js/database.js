var db = window.openDatabase("thanh_mobile", "1.0", "Thanh Mobile", 200000);

function fetch_transactions_success(name) {
    log(`INFO`, `Insert "${name}" successfully.`);
}

function log(type, message) {
    var current_time = new Date();
    console.log(`${current_time} [${type}] ${message}`);
}

function table_transaction_success(table) {
    log(`INFO`, `Create table "${table}" successfully.`);
}

function transaction_error(tx, error) {
    log(`ERROR`, `SQL Error ${error.code}: ${error.message}.`);
}

function initialize_database() {
    db.transaction(function(tx) {
        var query = `CREATE TABLE IF NOT EXISTS city (
         id INTEGER PRIMARY KEY,
         name TEXT UNIQUE NOT NULL
        )`;

        tx.executeSql(query, [], table_transaction_success(`city`), transaction_error);

        query = `CREATE TABLE IF NOT EXISTS district (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          city_id INTEGER NOT NULL,
          FOREIGN KEY (city_id) REFERENCES city(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`district`), transaction_error);

        query = `CREATE TABLE IF NOT EXISTS ward (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          district_id INTEGER NOT NULL,
          FOREIGN KEY (district_id) REFERENCES district(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`ward`), transaction_error);

        query = `CREATE TABLE IF NOT EXISTS account (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         username TEXT UNIQUE NOT NULL,
         password TEXT NOT NULL,
         first_name TEXT NULL,
         last_name TEXT NULL,
         birthday REAL NULL,
         phone TEXT NULL,
         street TEXT NULL,
         ward_id INTEGER NULL,
         district_id INTEGER NULL,
         city_id INTEGER NULL,
         status INTEGER NOT NULL,
         FOREIGN KEY (city_id) REFERENCES city(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`account`), transaction_error);

        query = `CREATE TABLE IF NOT EXISTS category (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          description TEXT NULL,
          parent_id INTEGER NULL,
          FOREIGN KEY (parent_id) REFERENCES category(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`category`), transaction_error);

        query = `CREATE TABLE IF NOT EXISTS product (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT NULL,
          price REAL NOT NULL,
          category_id INTEGER NULL,
          FOREIGN KEY (category_id) REFERENCES category(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`product`), transaction_error);

        query = `CREATE TABLE IF NOT EXISTS cart (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_id INTEGER NOT NULL,
          product_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          FOREIGN KEY (account_id) REFERENCES account(id),
          FOREIGN KEY (product_id) REFERENCES product(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`cart`), transaction_error);
    });
}


function fetch_database() {
    db.transaction(function(tx) {
        var query = `INSERT INTO category(name, description) VALUES(?, ?)`;

        tx.executeSql(query, ['Iphone', 'Iphone'], fetch_transactions_success("Iphone"), transaction_error);
        tx.executeSql(query, ['Sam Sung', 'Sam Sung'], fetch_transactions_success("Sam Sung"), transaction_error);
        tx.executeSql(query, ['Vivo', 'Vivo'], fetch_transactions_success("Vivo"), transaction_error);


        query = `INSERT INTO account(username, password, status) VALUES(?, ?, 1)`;

        tx.executeSql(query, ['Thanhlax1235@gmail.com', '123456'], fetch_transactions_success("Thanhlax1235@gmail.com"), transaction_error);
    });
}