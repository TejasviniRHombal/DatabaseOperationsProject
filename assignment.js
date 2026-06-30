var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "info12345",
    database: "database_operations"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connected!");

    // Create Table
    var sql = "CREATE TABLE IF NOT EXISTS people_info(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), address VARCHAR(20))";

    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("table created");

        // Insert Records
        var sql = "INSERT INTO people_info(id,name,address) VALUES (1,'sanjay','new delhi'),(2,'maya','mysore'),(3,'sanju','bangalore'),(4,'manju','mangalore')";

        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log("records inserted");

            // Display All Records
            con.query("SELECT * FROM people_info", function(err, result) {
                if (err) throw err;
                console.log("All Records:");
                console.log(result);

                // Display Record with id=1
                con.query("SELECT * FROM people_info WHERE id=1", function(err, result) {
                    if (err) throw err;
                    console.log("Record with ID=1:");
                    console.log(result);

                    // Delete Record
                    con.query("DELETE FROM people_info WHERE id=2", function(err, result) {
                        if (err) throw err;
                        console.log("Record deleted");

                        // Add Column
                        con.query("ALTER TABLE people_info ADD COLUMN phone_number BIGINT", function(err, result) {
                            if (err) throw err;
                            console.log("New column added");

                            // Drop Column
                            con.query("ALTER TABLE people_info DROP COLUMN phone_number", function(err, result) {
                                if (err) throw err;
                                console.log("Column dropped");

                                // Update Record
                                con.query("UPDATE people_info SET name='mamtha' WHERE id=3", function(err, result) {
                                    if (err) throw err;
                                    console.log("Record updated");

                                    // Show Final Records
                                    con.query("SELECT * FROM people_info", function(err, result) {
                                        if (err) throw err;
                                        console.log("Final Records:");
                                        console.log(result);

                                        // Drop Table
                                        con.query("DROP TABLE people_info", function(err, result) {
                                            if (err) throw err;
                                            console.log("Table dropped");

                                            con.end();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});