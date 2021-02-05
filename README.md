# Employee Data Tracker
Command line application that uses node, inquirer, and mySQL to manage a company's employee data

## Table of Contents
- [Installation Steps](#installation)
- [Usage Instructions](#usage-instructions)
- [Screen Recording](#screen-recording)
- [Licenses](#licenses)
- [Contribution Guidelines](#contribution-guidelines)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


---
## Installation 
Node.js and npm must be installed, as well as the Inquirer and mySQL packages.

## Usage Instructions
To run properly, this application requires a mySQL database called 'employeeTracker_DB' with the following tables/structures:
* **department**:
  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:
  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:
  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

You can use the provided schema.sql to build the database, and seed.sql to add dummy data to see how the application works.

To start this command line application, navigate to the employee-tracker directory in the terminal, run an npm install, and run the command 'node app.js'.

## Screen Recording
![Demo Screen Recording](https://drive.google.com/file/d/1ssn2V5-VepmT468vk8jxQQ_rcDrpA3hS/view?usp=sharing)

## Licenses
### MIT License

Copyright (c) 2020 Dan O'Neil

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Read more at <https://opensource.org/licenses/MIT>.
