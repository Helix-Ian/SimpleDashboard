# SimpleDashboard

I'm bad at read-me's and markdown so here it is in plain text

Assuming that you have npm and node installed 
(here is the link if you dont: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

MAKE SURE THAT YOU GRAB default.json file from slack and add it inside of Server/config. It contains user/pw so it must be ignored (pls do not push to github)

In terminal: navigate to the Server folder and run 

`npm install`

npm install reads the package.json build file which tells your computer what dependencies to install to run the machine.

Open a new terminal window and navigate to the dashboard-app folder and run 

`npm install`

You will need two open terminal windows (one to run the project and one to run the server) and probably one more for working with git so you don't have to close them to git

Assuming that there weren't install issues...

# To run the server
FROM THE SERVER ROOT DIRECTORY (/Server)

`npm run start-dev`

this script will run nodemon which will reload the server whenever you save any changes to server files.

# To run the react project
FROM THE DASHBOARD-APP ROOT DIRECTORY (/dashboard-app)

`npm start`

It should autoload a default browser window.
This window will show errors when you break the page and will reload the project when you save any changes. 




