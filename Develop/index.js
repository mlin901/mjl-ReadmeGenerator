// Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// Initial instruction for the user
console.log("Enter information about your project.");

// Array of questions for user input
    // const questions = [];
    // paginated list? Mult selections? E.g., https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/examples/long-list.js
const licenses = [
  { name: 'Apache 2.0 License', badge: `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)` },
  { name: 'Boost Software License 1.0', badge: `[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)` },
  { name: 'BSD 3-Clause License', badge: `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)` },
  { name: 'BSD 2-Clause License', badge: `[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)` },
  { name: 'License: CC0-1.0', badge: `[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)` },
  { name: 'License: CC BY 4.0', badge: `[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)` },
  { name: 'License: CC BY-SA 4.0', badge: `[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)` },
  { name: 'License: CC BY-NC 4.0', badge: `[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)` },
  { name: 'License: CC BY-ND 4.0', badge: `[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC%20BY--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)` },
  { name: 'License: CC BY-NC-SA 4.0', badge: `[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)` },
  { name: 'License: CC BY-NC-ND 4.0', badge: `[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)` },
  { name: 'Eclipse Public License 1.0', badge: `[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)` },
  { name: 'GNU GPL v3', badge: `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)` },
  { name: 'GNU GPL v2', badge: `[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)` },
  { name: 'GNU AGPL v3', badge: `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)` },
  { name: 'GNU LGPL v3', badge: `[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)` },
  { name: 'GNU FDL v1.3', badge: `[![License: FDL 1.3](https://img.shields.io/badge/License-FDL%20v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)` },
  { name: 'IBM Public License Version 1.0', badge: `[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)` },
  { name: 'ISC License (ISC)', badge: `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)` },
  { name: 'The MIT License', badge: `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)` },
  { name: 'Mozilla Public License 2.0', badge: `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)` },
  { name: 'Open Data Commons', badge: `[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)` },
  { name: 'Open Database License (ODbL)', badge: `[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)` },
  { name: 'Public Domain Dedication and License (PDDL)', badge: `[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)` },
  { name: 'The Perl License', badge: `[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)` },
  { name: 'The Artistic License 2.0', badge: `[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic%202.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)` },
  { name: 'SIL Open Font License 1.1', badge: `[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL%201.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)` },
  { name: 'Unlicense', badge: `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)` },
  { name: 'WTFPL', badge: `[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)` },
  { name: 'Zlib', badge: `[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)` },
];
// Creates an array of license names
var licenseTypes = licenses.map(myFunction)
function myFunction(lic) {
  return lic.name;
}

// INQUIRER prompts
inquirer
  .prompt([
    {
      type: 'input',
      message: "Project title:",
      name: 'projectname',
    },
    {
      type: 'input',
      message: 'Project description:',
      name: 'description',
    },
    {
      type: 'input',
      message: 'Installation instructions:',
      name: 'installinstruct',
    },
    {
      type: 'input',
      message: 'Usage information:',
      name: 'useinfo',
    },
    {
      type: 'input',
      message: 'Contribution guidelines:',
      name: 'contguildlines',
    },
    {
      type: 'input',
      message: 'Test instructions:',
      name: 'testInstructions',
    },
    {
      type: 'list',
      message: 'Choose a license type',
      name: 'license',
      choices: [...licenseTypes],  
    },
    {
      type: 'input',
      message: 'GitHub user name:',
      name: 'githubname',
    },
    {         // **** validate email format?
      type: 'input',
      message: 'Email:',
      name: 'email',
    },
  ])
  .then((data) => {
    // badge for license
    const newArray = licenses.filter(element => element.name == data.license);
    var badgeForLicense = newArray[0].badge;
    // filename
    const filename = 'readme.md';
    // Call to function that creates file
    writeToFile(filename, data, badgeForLicense);
  });

//FUNCTION - Writes readme file
function writeToFile(fileName, data, badge) {
  // This constructs the text content
  const fileContent =`
# ${data.projectname}\n
${badge}\n
## Description\n
${data.description}\n
## Table of Contents\n
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Installation](#installation)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Usage](#usage)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[License](#license)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Contributing](#contributing)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Tests](#tests)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Questions](#questions)<br/>
## Installation\n
${data.installinstruct}\n
## Usage\n
${data.useinfo}\n
## License\n
${data.projectname} is covered under "${data.license}". Click the license badge below for information on this license:\n
${badge}\n
## Contributing\n
${data.contguildlines}\n
## Tests\n
${data.testInstructions}\n
## Questions
Send questions to ${data.email}. \n
`;
  //This creates the file and adds the text content created above
  fs.writeFile(fileName, fileContent,  (err) =>
    err ? console.log(err) : console.log('Readme file successfully created.')
    );
}

// TODO: Create a function to initialize app
function init() {}


// FUNCTION - Call to initialize app
init();
