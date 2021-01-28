## Task Timer App written in React

This app is based off the version from the [FullStack React (rev. 33 - 2017)](https://www.newline.co/fullstack-react/) book with some fixes and tweaks I'll be adding along the way as I learn more about React. Libraries and dependencies have mostly either been updated to use the most current version as of the commit, or replaced altogether. 

## Tool Chain & Dependencies

- [Semantic UI React](https://react.semantic-ui.com/usage): Styling and layout.
- [graceful-fs](https://www.npmjs.com/package/graceful-fs): Working with the filesystem.
- [express](http://expressjs.com/): Web server/API.
- [body-parser](https://www.npmjs.com/package/body-parser): For parsing node.js responses. 
- [path](https://www.npmjs.com/package/path): (nodejs path module) Utilities for working with file and directory paths. 
- [concurrently](https://www.npmjs.com/package/concurrently) for running commands concurrently

## Working with the server
To start the server: `npm run server`. 

### Testing the server
With the server running, run the following commands from a terminal. To make parsing and viewing the server responses much nicer and easier to work with, use a tool like [jq](https://stedolan.github.io/jq/). 

**Get all timers**
```
curl -X GET localhost:3000/api/timers
```

**Save a new timer**
```
curl -X POST \
-H 'Content-Type: application/json' \
-d '{"id": "a73c1d19-f32d-4aff-b470-ce33333792406a", "title":"My new task", "project":"Learning"}' \
localhost:3000/api/timers
```

**Start the timer for a single task:**
```
curl -X POST \
-H 'Content-Type: application/json' \
-d '{"start":1456468632104, "id": "a73c1d19-f32d-4aff-b470-cea4e792406a"}' \
localhost:3000/api/timers/start
```

**Stop the timer for a single task:**
```
curl -X POST \
-H 'Content-Type: application/json' \
-d '{"stop":1611796232025, "id": "a73c1d19-f32d-4aff-b470-cea4e792406a"}' \
localhost:3000/api/timers/stop
```

**Update an existing timer**
```
curl -X PUT \
-H 'Content-Type: application/json' \
-d '{"id": "a73c1d19-f32d-4aff-b470-cea4e792406a", "title":"Clear paper jam now!"}' \
localhost:3000/api/timers
```

**Delete a timer**
```
curl -X DELETE \
-H 'Content-Type: application/json' \
-d '{"id": "a73c1d19-f32d-4aff-b470-ce33333792406a"}' \
localhost:3000/api/timers
```