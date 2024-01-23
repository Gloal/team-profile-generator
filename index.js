const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const writeFileAsync = util.promisify(fs.writeFile);


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teams = [];
const inputChoices = [
  "Add an engineer",
  "Add an intern",
  "Finish building the team",
];

promptUser();

function promptUser() {}
  inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the Name of your Manager",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the Employee Id of your manager",
        validate: answer => {
            const pass = answer.match(/^[1-9]\d*$/);
            if(pass){
                return true;
            }
            return "Enter a numerical id"
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter the email of your Manager",
        validate: answer => {
            const pass = answer.match(
                /\S+@\S+\.\S+/
              );
              if (pass){
                return true;
              }
              return "Enter valid email" }
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter the Office Number of your manager",
      },
      {
        type: "list",
        name: "choices",
        message: "Choose the next step",
        choices: inputChoices,
      },
    ])
    .then((data) => {
      const { name, id, email, officeNumber, choices } = data;

      const newManager = new Manager(name, id, email, officeNumber);
      teams.push(newManager);

      getChoices(choices);
    });

function promptEngineerInfo() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the Name of the Engineer",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the Employee Id of the Engineer",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the email of the Engineer",
    },
    {
      type: "input",
      name: "github",
      message: "Enter the github of the Engineer",
    },
    {
      type: "list",
      name: "choices",
      message: "Choose the next step",
      choices: inputChoices,
    },
  ]).then((data) => {
    const newEngineer = new Engineer(
      data.name,
      data.id,
      data.email,
      data.github
    );
    teams.push(newEngineer);
    getChoices(data.choices);
  });
}

function promptInternInfo() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the Name of the intern",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the Employee Id of the intern",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the email of the intern",
    },
    {
      type: "input",
      name: "school",
      message: "Enter the school of the intern",
    },
    {
      type: "list",
      name: "choices",
      message: "Choose the next step",
      choices: inputChoices,
    },
  ]).then((data) => {
        const newIntern = new Intern(
          data.name,
          data.id,
          data.email,
          data.school
        );
        teams.push(newIntern);
        getChoices(data.choices);
      });
  }


function getChoices(choices){
    if (choices === inputChoices[0]) {
        promptEngineerInfo();
      } else if (choices === inputChoices[1]) {
        promptInternInfo()
      } else {
        fs.writeFileSync(outputPath, render(teams));
      }
}