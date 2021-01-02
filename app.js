const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employeeTracker_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('#######                                                 \n#       #    # #####  #       ####  #   # ###### ###### \n#       ##  ## #    # #      #    #  # #  #      #      \n#####   # ## # #    # #      #    #   #   #####  #####  \n#       #    # #####  #      #    #   #   #      #      \n#       #    # #      #      #    #   #   #      #      \n####### #    # #      ######  ####    #   ###### ###### \n                                                        \n######                                                  \n#     #   ##   #####   ##                               \n#     #  #  #    #    #  #                              \n#     # #    #   #   #    #                             \n#     # ######   #   ######                             \n#     # #    #   #   #    #                             \n######  #    #   #   #    #                             \n                                                        \n#######                                                 \n   #    #####    ##    ####  #    # ###### #####        \n   #    #    #  #  #  #    # #   #  #      #    #       \n   #    #    # #    # #      ####   #####  #    #       \n   #    #####  ###### #      #  #   #      #####        \n   #    #   #  #    # #    # #   #  #      #   #        \n   #    #    # #    #  ####  #    # ###### #    #       ');
    mainMenu();
});

function mainMenu(){
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "Main Menu\n What would you like to do?",
        choices: [
            "Manage Employees",
            "Manage Roles",
            "Manage Departments",
            "EXIT"
        ]})
    
    .then((response) => {
        switch (response.choice) {
            case "Manage Employees":
                employeeMenu();
        }
    }

    )
}