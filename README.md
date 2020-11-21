![MIT LICENSE][(https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![REPO SIZE](https://img.shields.io/github/repo-size/freder48/weekend-sql-to-do-list.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/freder48/weekend-sql-to-do-list.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/freder48/weekend-sql-to-do-list?style=social)

# Weekend SQL To-Do List

## Description

Duration: 10 hrs

This program is designed to create to-do lists personalized by its users. Users can add a task to the list utilizing the input box. The task is generated on the DOM and stored in the database. Users can then "check" the task when it is complete to time stamp it and cross it out. Users also have the option to delete a list item when they are finished with it. 


To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- Express
- Postgres
- Moment


## Installation

1. Create a database named `weekend-to-do-app`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. Type a task into input box and click Add Task, task will be generated on the webpage table.
2. When the task is finished click the green check mark to cross off that item from the list and time stamp when it was completed.
3. If you accidently clicked complete before the task was finished just re-click the check mark to re-instate task.
4. To delete a task from the list click the red x button and confirm the safety catch alert.


## Built With

jQuery, Node, Express, Postgres, JavaScript, HTML/CSS, SweetAlert/Bootstrap, Moment, Postico

## License

![MIT LICENSE](https://img.shields.io/github/license/freder48/weekend-sql-to-do-list.svg?style=flat-square)

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. 

## Support
If you have suggestions or issues, please email me at [jfredericksen12@gmail.com](www.google.com)