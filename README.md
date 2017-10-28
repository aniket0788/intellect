Install node packages by following command
npm install

Start server
COMMAND: node server.js


User data and todo data are stored in json format in models folder.
Once server start it inserts the user and todo data in cloude mongodb database
Server is connecting to cloude mongodb data for all the api calls.


API call details
1. Get yserdetauks (for given userid) and related active todos
API - http://localhost:3000/user/details/?userid=2
    OR
    - http://localhost:3000/user/details/?userid=1

2. Get  a specific todo Item baised on its id 
API - http://localhost:3000/todo/details/?todoId=2
    OR 
    - http://localhost:3000/todo/details/?todoId=3
