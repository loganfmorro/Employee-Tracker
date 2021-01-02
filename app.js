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
                break;
            case "Manage Roles":
                rolesMenu();
                break;
            case "Manage Departments":
                departmentMenu();
                break;
            case "EXIT":
                connection.end();
                break;
            default:
                mainMenu();
                break;
        }
    }).catch(err => console.log(err));
}

//here is our CRUD functions for the employees
function employeeMenu() {

    inquirer.prompt({
    name: "choice",
    type: "list",
    message: "Manage Employees\n What would you like to do?",
    choices: [
        "View all employees",
        "Add a new employee",
        "Update an existing employee",
        "Remove an employee",
        "MAIN MENU"
    ]})

    .then((response) => {
        switch (response.choice) {
            case "View all employees":
                viewEmployees();
                break;
            case "Add a new employee":
                addEmployee();
                break;
            case "Update an existing employee":
                updateEmployee();
                break;
            case "Remove an employee":
                removeEmployee();
                break;
            case "MAIN MENU":
                mainMenu();
                break;
            default:
                employeeMenu();
                break;
        }
    }).catch(err => console.log(err));
}

//here is our CRUD functions for the roles
function rolesMenu() {

    inquirer.prompt({
    name: "choice",
    type: "list",
    message: "Manage Employee Roles\n What would you like to do?",
    choices: [
        "View all roles",
        "Add a new role",
        "Remove a role",
        "MAIN MENU"
    ]})

    .then((response) => {
        switch (response.choice) {
            case "View all roles":
                viewRoles();
                break;
            case "Add a new role":
                addRole();
                break;
            case "Remove an role":
                removeRole();
                break;
            case "MAIN MENU":
                mainMenu();
                break;
            default:
                rolesMenu();
                break;
        }
    }).catch(err => console.log(err));
}

//here is our CRUD functions for the departments
function departmentMenu() {

    inquirer.prompt({
    name: "choice",
    type: "list",
    message: "Manage Employee Departments\n What would you like to do?",
    choices: [
        "View all departments",
        "Add a new department",
        "Remove a department",
        "MAIN MENU"
    ]})

    .then((response) => {
        switch (response.choice) {
            case "View all departments":
                viewDepartments();
                break;
            case "Add a new department":
                addDepartment();
                break;
            case "Remove an department":
                removeDepartment();
                break;
            case "MAIN MENU":
                mainMenu();
                break;
            default:
                departmentMenu();
                break;
        }
    }).catch(err => console.log(err));
}

