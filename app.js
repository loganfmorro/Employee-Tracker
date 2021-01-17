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

// Here we can manage the department functions

function viewDepartments () {
    //this will show the department data table
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'What is the title of the department you would like to add?'
    })
    .then(function(response) {
        connection.query('INSERT INTO department (name) VALUES (?);', [response.department], (err) => {
            if (err) throw err;
            console.log("New department added (" + response.department + ")");
            departmentMenu();
        })
    }).catch(err => console.log(err));
}

function removeDepartment() {
    // this will let the user select a specific id from a list of departments to delete
    connection.query('SELECT * FROM department;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
                name: 'department',
                type: 'list',
                choices: function() {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].id + ' ' + results[i].name);
                    }
                    return choiceArray;
                },
                message: 'Which department would you like to remove?'
            }
        )
        .then(function(response) {
            //this will remove the id of the department the user has selected
            let department;
            for (let i = 0; i < results.length; i++) {
                if ((results[i].id + ' ' + results.name) === response.department) {
                    department = results[i];
                }
            }

            connection.query(
                'DELETE FROM department WHERE ?;', {id: department.id}, (err) => {
                    if (err) throw err;
                    console.log('Department removed');
                    departmentMenu();
                })
        }).catch(err => console.log(err));
    });
}

//Here is where we can manage our roles functions

function viewRoles() {
    connection.query("SELECT role.id AS ID, title AS Title, salary AS Salary, name AS Department FROM role INNER JOIN department ON role.department_id = department.id;", function(err, results) {
        if (err) throw err;
        console.table('Roles', results)
        rolesMenu();
    })
}

function addRole() {
    //Prompt the user for the role info, then add the role to the database
    connection.query('SELECt * FROM department;', function(err, results) {
        if (err) throw err;

        inquirer.prompt ([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title for the role you are adding?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for the role you are adding?'
            },
            {
                name: 'department',
                type: 'list',
                choices: function() {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].name);
                    }
                    return choiceArray;
                },
                message: 'What department would you like to create this role in?'
            }
        ])
        .then(function(response) {
            let department_id;
            for (let i = 0; i < results.length; i++) {
                if (results[i],name === response.department) {
                    department_id = results[i].id;
                }
            }

            connection.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?);', [response.title, response.salary, department_id], (err) => {
                if(err) throw err;
                console.log ("New role added (" + response.title + ")");
                rolesMenu();
            })
        }).catch(err => console.log(err));    
    });
}

function removeRole() {
    //Here we show the user the list of roles, and prompt them to choose which role to delete from the database based on the id
    connection.query('SELECT * FROM role;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].id + ' ' + results[i].title);
                    }
                    return choiceArray;
                },
                message: 'Which role would you like to remove?'
            }
        )
            .then(function (response) {
                let role;
                for (let i = 0; i < results.length; i++) {
                    if ((results[i].id + ' ' + results[i].title) === response.role) {
                        role = results[i];
                    }
                }

                connection.query(
                    'DELETE FROM role WHERE ?;', { id: role.id }, (err) => {
                        if (err) throw err;
                        console.log('Role deleted');
                        rolesMenu();
                    })
            }).catch(err => console.log(err));
    });
}

    //Here is where the user can manage the employee functions

function viewEmployees() {
    connection.query("SELECT employee.id AS ID, first_name AS First, last_name AS Last, manager_id AS Manager_ID, title AS Title, salary AS Salary, name AS Department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id;", function (err, results) {
        if (err) throw err;
        console.table('employees', results)
        employeeMenu();
    })
}

function addEmployee() {
    connection.query('SELECT * FROM role;', function (err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the employee\'s first name?'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the employee\'s last name?'
            },
            {
                name: 'role',
                type: 'list',
                choice: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
                    return choiceArray;
                },
                message: 'What is this employee\'s role?'
            }
        ])
            .then(function (response) {
                let role_id;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].title === response.role) {
                        role_id = results[i].id;
                    }
                }

                connection.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?);', [response.first_name, response.last_name, role_id], (err) => {
                    if (err) throw err;
                    console.log('New employee added (' + response.first_name + ' ' + response.last_name + ')');
                    employeeMenu();
                })
            }).catch(err => console.log(err));
    });
}

function updateEmployee() {
    connection.query('SELECT * FROM employee;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
                name: 'employee',
                type: 'list',
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name);
                    }
                    return choiceArray;
                },
                message: 'Which employee would you like to update?'
            }
        )
            .then(function (response) {
                let employee;
                for (let i = 0; i < results.length; i++) {
                    if ((results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name) === response.employee) {
                        employee = results[i];
                    }
                }

                inquirer.prompt(
                    {
                        name: 'action',
                        type: 'list',
                        choices: ['Role', 'Manager'],
                        message: 'What would you like to update?'
                    }
                )
                    .then(function (response) {
                        switch (response.action) {
                            case 'Role':
                                updateEmployeeRole(employee);
                                break;
                            case 'Manager':
                                updateEmployeeManager(employee);
                                break;
                        }
                    }).catch(err => console.log(err));
            }).catch(err => console.log(err));
    });
}

function updateEmployeeRole(employee) {
    connection.query('SELECT * FROM role;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
                    return choiceArray;
                },
                message: 'What is this employee\'s new role?'
            }
        )
            .then(function (response) {
                let new_id;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].title === response.role) {
                        new_id = results[i].id;
                    }
                }

                connection.query(
                    'UPDATE employee SET ? WHERE ?;',
                    [
                        {
                            role_id: new_id
                        },
                        {
                            id: employee.id
                        }
                    ], (err) => {
                        if (err) throw err;
                        console.log('Employee updated');
                        employeeMenu();
                    })
            }).catch(err => console.log(err));
    });
}

function updateEmployeeManager(employee) {
    connection.query('SELECT * FROM employee;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
                name: 'manager',
                type: 'list',
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        if (results[i].id != employee.id) choiceArray.push(results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name);
                    }
                    return choiceArray;
                },
                message: 'Who is this employee\'s new manager?'
            }
        )
            .then(function (response) {
                let new_manager_id;
                for (let i = 0; i < results.length; i++) {
                    if ((results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name) === response.manager) {
                        new_manager_id = results[i].id;
                    }
                }

                connection.query(
                    'UPDATE employee SET ? WHERE ?;',
                    [
                        {
                            manager_id: new_manager_id
                        },
                        {
                            id: employee.id
                        }
                    ], (err) => {
                        if (err) throw err;
                        console.log('Employee updated');
                        employeeMenu();
                    })
            }).catch(err => console.log(err));
    });
}

function removeEmployee() {
    // Show list of employees, prompt id to delete, then delete employee from DB
    connection.query('SELECT * FROM employee;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
              name: 'employee',
              type: 'list',
              choices: function() {
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name);
                }
                return choiceArray;
              },
              message: 'Which employee would you like to delete?'
            }
        )
        .then(function(response) {
            // Pull out the id of the employee they're updating
            let employee;
            for (let i = 0; i < results.length; i++) {
              if ((results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name) === response.employee) {
                employee = results[i];
              }
            }

            connection.query(
                'DELETE FROM employee WHERE ?;', {id: employee.id}, (err) => {
                if (err) throw err;
                console.log('Employee deleted');
                employeesMenu();
            })    
        }).catch(err => console.log(err));
    });
}
    