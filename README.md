# Note Taker Application
Small application built using Node.js and Express.js that accepts user input on the front-end and stringifies it into a JSON and injects data into a JSON array found in a database file.

![GitHub license](https://img.shields.io/badge/License-MIT-brightgreen.svg)

## Description
This Note Taker application program was built off of some starter code (HTML, CSS, JavaScript, Node.js, and Express.js). This little project is aimed at providing users with a simple tool that they can use to create a list of notes. This program is useful because notes are parsed and stringified with JSON (and saved in a JSON database file). Data is stored in the actual code (and not just saved via local storage in the browser). This is useful because data will be permanently stored (no matter what browser is used to run the application), unless the user chooses to delete the data.

## Project Structure
- /db (folder that contians JSON database file)
    - db.json (database file which stores stringified data in the form of a JSON objects array)
- /public (f)
    - /assets (JavaScript file containing different shape models/variables and data that will get rendered into SVG file)
        - /css
            - styles.css (main CSS stylesheet)
        - /js
            - index.js (main JavaScript file)
    - index.html (main HTML file; home page of application)
    - notes.html (Notes page, where user can input and create new notes that display on front-end)
- /routes
    - note_routes.js (JavaScript file that contains routers/routes allowing user to create and delete notes)
- .gitignore (file that lists other files to be ignored by Github when pushing to repository, such as /node_modules folder)
- LICENSE (license used for this repository - MIT License)
- README (information file containing information about this specific project/application)
- package.json (file containing JSON dependencies and script commands that are used by inquirer npm and jest npm)
- server.js (JavaScript file that sets up server)

## Tools and Technologies Used in This Project
- Javascript coding language
- Node JS (and node modules)
  - FS Module (native/included in Node.js)
  - Express.js Module (found on Expressjs.com)
- VS Code platform used to code and build pages
- Github (website hosted and deployed on Github servers)
- Render - cloud infrastructure used to host and deploy live site (Render.com)

## How to Use
Go to live version of the application that's been deployed on Render:

Once user is on the main/home page of the application, click "Get Started" button. This will take the user to another page, which is where new notes can be created, based on user input. This page contains a form, allowing the user to input a title and text data for this new note they are creating. Once user has finsihed thier input, they can then click the "save note" button found in the top right side of the navigation/header. If they are not satisfied with the data that is in their form/input fields, they can instead choose to click the "clear form" button instead, which will delete all of the text and data in the form's input fields. They should only do this if they want to start with a new entry (and if they do not wish to save this note entry in their notes list). Once a note is saved, it will then appear in the left-hand column of the page. If there are no notes saved, this column should contain text that reads "No saved notes".

As notes appear in this column, the user can then click on each of the notes individually. Doing this will select that note and allow it to appear in the right-hand (main) column of the page, so that a user can also read all of the text that has been inputted for that note. The user can easily click each of the different notes found in the notes list and then switch which note they want to read and focus on; changing which note will appear in the main (right-hand) column of the page. Additionally, if user's choose to do so, they can click the red trash can icon that is found on each of the note list items in the list, in order to delete each one of the notes individually.

## Contributions
- Application refactored and deployed by Anthony Purificato
- Starter code found here (https://github.com/coding-boot-camp/miniature-eureka)
## Credits
- Rutgers Coding Bootcamp provided resources and support for this project
- This code was refactored as part of an assignment in Rutgers Coding Bootcamp; Original starter code found here (https://github.com/coding-boot-camp/miniature-eureka)
- OpenAI ChatGPT utilized for general coding assistance and aid upon encountering problems with JavaScript code

## License
Website is available for public use, hosted on Github servers, utilizing an MIT License - see the LICENSE file for details.

![GitHub license](https://img.shields.io/badge/License-MIT-brightgreen.svg)
  
For more information on license please click the [Link](https://opensource.org/licenses/MIT)

## Questions
Check out my [GitHub](https://github.com/apurificato) 
  
For questions, reach out to me at undefined.