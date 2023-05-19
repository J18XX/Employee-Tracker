const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
});

const startPage = () => {
    inquirer.prompt({
        message: 'What would you like to do?',
        name: 'choice',
        type: 'list',
        Choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit",
        ],
    })
    .then(response => {
        switch(response.Choices){
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            default:
                quit();
        }
    });
};

const viewEmployees = () => {
    connection.query(
        'Select employee.id, first-name, last-name, title, salary, department-name, manager-id',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startPage();
        }
    )
};

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'first-name',
            type: 'input',
            message: "What is the employee's first name?"
        },
        {
            name: 'last-name',
            type: 'input',
            message: "What is the employee's last name?"
        },
        {
            name: 'JobId',
            type: 'input',
            message: "what is the employee's job id?"
        },
        {
            name: 'managerId',
            type: 'input',
            messgae: "what is the message Id?",
        },
    ])
    .then(answer => {
        connection.query(
            'Insert into employee (first-name, last-name. job-id, manager-id',
            [answer.firstName, answer.lastName, answer.jobId, answer.managerId],
            function (err, res) {
                if (err) throw err;
                console.log('Added!');
                startPage();
            }
        );
    });
};