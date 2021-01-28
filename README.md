## Task Timer App written in React

This app is based off the version from the [FullStack React (rev. 33 - 2017)](https://www.newline.co/fullstack-react/) book with some fixes and tweaks I'll be adding along the way as I learn more about React. Libraries and dependencies have mostly either been updated to use the most current version as of the commit, or replaced altogether. 

### Install & Run
One of the biggest departures from the book version is how this version is setup to run both a server and the client concurrently using different npm packages. 

1. Install the server: `npm i`
2. Change into the client directory: `cd client`
3. Install the client: `npm i`
4. Go back to the root of the project: `cd..`
5. Start the app: `npm start`

## Tool Chain & Dependencies

- [Semantic UI React](https://react.semantic-ui.com/usage): Styling and layout.
- [graceful-fs](https://www.npmjs.com/package/graceful-fs): Working with the filesystem.
- [express](http://expressjs.com/): Web server/API.
- [body-parser](https://www.npmjs.com/package/body-parser): For parsing node.js responses. 
- [path](https://www.npmjs.com/package/path): (nodejs path module) Utilities for working with file and directory paths. 
- [concurrently](https://www.npmjs.com/package/concurrently) for running commands concurrently. Used to run both the server and client at the same time. 

## Working with the server

### Testing the API
With the server running, run the following commands from a terminal. To make parsing and viewing the server responses much nicer and easier to work with, use a tool like [jq](https://stedolan.github.io/jq/). 

Check the `data.json` file after each command to verify the changes have been made.

**Get all timers**
```
curl -X GET localhost:3001/api/timers
```

**Save a new timer**
```
curl -X POST \
-H 'Content-Type: application/json' \
-d '{"id": "a73c1d19-f32d-4aff-b470-ce33333792406a", "title":"My new task", "project":"Learning"}' \
localhost:3001/api/timers
```

**Start the timer for a single task:**
```
curl -X POST \
-H 'Content-Type: application/json' \
-d '{"start":1456468632104, "id": "a73c1d19-f32d-4aff-b470-cea4e792406a"}' \
localhost:3001/api/timers/start
```

**Stop the timer for a single task:**
```
curl -X POST \
-H 'Content-Type: application/json' \
-d '{"stop":1611796232025, "id": "a73c1d19-f32d-4aff-b470-cea4e792406a"}' \
localhost:3001/api/timers/stop
```

**Update an existing timer**
```
curl -X PUT \
-H 'Content-Type: application/json' \
-d '{"id": "a73c1d19-f32d-4aff-b470-cea4e792406a", "title":"Clear paper jam now!"}' \
localhost:3001/api/timers
```

**Delete a timer**
```
curl -X DELETE \
-H 'Content-Type: application/json' \
-d '{"id": "a73c1d19-f32d-4aff-b470-ce33333792406a"}' \
localhost:3001/api/timers
```