# First step before running
    
    Open docker-desktop in the background
        
        (Windows Users)
        -Navigate to settings
            - Navigate to resources, then WSL integration
            - Ensure the Enable checkbox is selected and your terminal is selected as well.


    In the VS Code terminal:
        - CD into the api folder and run 'npm install'
        - CD into the ui folder and run 'npm install'

    After running npm install for each endpoint, in the terminal CD back to mydockertemplate and do the following:

        1. ` docker-compose up --build `

Before we start creating our front and backend lets check to make sure our database hase been build properly.

Make your terminal as big as possible

    You may not have an error code at all: 
        Your terminal should look similar to below
    
api  | 
api  | > api@1.0.0 start
api  | > knex migrate:rollback && knex migrate:latest && knex seed:run && nodemon ./src/app.js
api  | 
api  | Using environment: development
api  | Already at the base migration
ui   | 
ui   | > ui@0.1.0 start
ui   | > react-scripts start
ui   | 
api  | Using environment: development
api  | Batch 1 run: 1 migrations
api  | Using environment: development
api  | Ran 1 seed files
api  | [nodemon] 3.1.4
api  | [nodemon] to restart at any time, enter `rs`
api  | [nodemon] watching path(s): *.*
api  | [nodemon] watching extensions: js,mjs,cjs,json
api  | [nodemon] starting `node ./src/app.js`
api  | Express server listening on port 8080
ui   | (node:25) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
ui   | (Use `node --trace-deprecation ...` to show where the warning was created)
ui   | (node:25) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
ui   | Starting the development server...
ui   | 
ui   | Compiled successfully!
ui   | 
ui   | You can now view ui in the browser.
ui   | 
ui   |   Local:            http://localhost:3000
ui   |   On Your Network:  http://172.18.0.4:3000
ui   | 
ui   | Note that the development build is not optimized.
ui   | To create a production build, use npm run build.
ui   | 
ui   | webpack compiled successfully



Move onto (The application should be up and running) below

Else see below:


Look for an error line and/or api exit line,

    api exited with code 1 or any other codes.

above the error code it should display similar to below:
    (IF YOU HAVE ANY TO BEGIN WITH)

    

api  | 
api  | > api@1.0.0 start
api  | > knex migrate:rollback && knex migrate:latest && knex seed:run && nodemon ./src/app.js
api  | 
api  | Using environment: development
db   | 2024-08-05 19:16:48.543 UTC [40] FATAL:  database "<Your Database name>" does not exist                           (Look at this error in particular)
api  | database "<Your Database name>" does not exist
api  | error: database "<Your Database name>" does not exist
api  |     at Parser.parseErrorMessage (/src/app/node_modules/pg-protocol/dist/parser.js:283:98)
api  |     at Parser.handlePacket (/src/app/node_modules/pg-protocol/dist/parser.js:122:29)
api  |     at Parser.parse (/src/app/node_modules/pg-protocol/dist/parser.js:35:38)
api  |     at Socket.<anonymous> (/src/app/node_modules/pg-protocol/dist/index.js:11:42)
api  |     at Socket.emit (node:events:520:28)
api  |     at addChunk (node:internal/streams/readable:559:12)
api  |     at readableAddChunkPushByteMode (node:internal/streams/readable:510:3)
api  |     at Readable.push (node:internal/streams/readable:390:5)
api  |     at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
ui   | 
ui   | > ui@0.1.0 start
ui   | > react-scripts start
ui   | 
api exited with code 1

If you have an error in your terminal see Common Errors below for fixes.

# Common Errors

Do not go to a step base off of the error code. Read the error and the potential errors below and adjust accordingly.

1. If you run into the issue of already having a container with this name follow directions below
            The container name "/db" is already in use by container "---------------------------------------". You have to remove (or rename) that container to be able to reuse that name.

            - Navigate to docker-compose.yaml and change the container name on Line 4

            OR

            - In the terminal 
                - Press Lctrl+C
                + ` docker container rm <Container Name> ` (Container Name should be the container that is being hosted on the same port)
                (This should resolve your container issues)
            If this fixes any and all errors proceed to (The application should be up and running) below

 2. Database that you've created not actually being created? follow below instructions
    
    api  | 
    api  | > api@1.0.0 start
    api  | > knex migrate:rollback && knex migrate:latest && knex seed:run && nodemon ./src/app.js
    api  | 
    api  | Using environment: development
    db   | 2024-08-05 19:16:48.543 UTC [40] FATAL:  database "<Your Database name>" does not exist
    api  | database "<Your Database name>" does not exist
    api  | error: database "<Your Database name>" does not exist
    api  |     at Parser.parseErrorMessage (/src/app/node_modules/pg-protocol/dist/parser.js:283:98)
    api  |     at Parser.handlePacket (/src/app/node_modules/pg-protocol/dist/parser.js:122:29)
    api  |     at Parser.parse (/src/app/node_modules/pg-protocol/dist/parser.js:35:38)
    api  |     at Socket.<anonymous> (/src/app/node_modules/pg-protocol/dist/index.js:11:42)
    api  |     at Socket.emit (node:events:520:28)
    api  |     at addChunk (node:internal/streams/readable:559:12)
    api  |     at readableAddChunkPushByteMode (node:internal/streams/readable:510:3)
    api  |     at Readable.push (node:internal/streams/readable:390:5)
    api  |     at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
    ui   | 
    ui   | > ui@0.1.0 start
    ui   | > react-scripts start
    ui   | 
    api exited with code 1
    
    There are two main ways to go about this fix actions

        1. Delete all previous volumes so it creates your database upon starting your application
            (Be warned this will delete any previous databases that you have build in your user-data directory, if you dont have anything personal that you have build and want to keep then avoid doing this step)
            
            - In your current terminal
                + Press L-ctrl + C
                + ` docker-compose down -v `
                + ` docker-compose up --build `
            Everything should be up and running as intended
            If this fixes any and all erros proceed to (The application should be up and running) below

        2. Manually create your database:
        - Now that you have created a db container lets look inside it.
            - Open a new terminal
                + ` docker ps `
                (you should see a couple containers listed, one of them should have the name db with a container id similar to <6d3nna456...> this will change with every container you spin up)
                + ` docker exec -it <First 2-4 digits in the container ID> bash `
                + ` psql -U postgres `
                + ` \l `
                (This should produce a chart of all the database under your current container)
                + ` CREATE DATABASE <Database name that you have come up with in the previous steps matching this name is important> ; `
            You have now created your database.
                - In your main terminal
                    + Press L-ctrl + C 
                    + ` docker-compose down `
                    + ` docker-compose up --build `
            Everything should be up and running as intended.
            If this fixes any and all erros proceed to (The application should be up and running) below

                    

# The application should be up and running

Api is hosted at http://localhost:8080/

Information before running the application.

    Each ManagerInventory is based off of their username.
        -For the items that are pre-created there are 3 precreated Inventory Manager accounts

            - un: BillyB pw: 12345
            - un: JimmyJ pw: 12345
            - un: HarryH pw: 12345

Navigate to google chrome and in a new tab go to http://localhost:3000/

# Login

    - Login using one of the preset usernames and passwords

# Register

    - Click the Create Account button
    -Fill out the fields and click register
    -Login using the username and password you created

# Guest

    -Click the guest button to view the entire inventory

# Navigating while a guest

    - In the Home Page click on an item to view the full details

# Navigating while logged in

    - In the Inventory Manager Inventory page you can do multiple things
        
        1. Click on an item to view the full details

        2. Toggle the edit button and click on an item in order to edit said item
            - Edit the fields you wish to change or click the cancel button to go back to your inventory
                (I read the specific user story to late and dont want to change it.)

        3. Click on the add item to navigate to add an item
            - Fill out the fields and click Add Item button to create the item or click cancel to go back
        
        3. Click on an items delete button to delete an item from the inventory and the full inventory

        4. Click the Home button to navigate to the full inventory
            - From here you can click on an individual item to view the full details

        5. Click the Logout button on the inventory or home page to return to the login page to change users.


# Questions and or comments

    -Contact me through my slack dms.
        (If you dont have it then you dont need it)