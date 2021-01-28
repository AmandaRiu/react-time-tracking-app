const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const fs = require( 'graceful-fs' );
const path = require( 'path' );

const app = express();

const DATA_FILE = path.join( __dirname, 'data.json' );

app.set( 'port', ( process.env.PORT || 3001 ) );
app.use( '/', express.static( path.join( __dirname, 'public' ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

/**
 * Application-level middleware. Set the headers on all requests before 
 * passing along to be processed.  
 */
app.use( ( req, res, next ) => {
    res.setHeader( 'Cache-Control', 'no-cache, no-store, must-revalidate' );
    res.setHeader( 'Pragma', 'no-cache' );
    res.setHeader( 'Expires', '0' );
    next();
} );

/**
 * GET: /api/timers
 * 
 * Return all task timers stored in the file-level
 * datastore. 
 * 
 * @returns The timers as an array of json objects.
 */
app.get( '/api/timers', ( req, res ) => {
    fs.readFile( DATA_FILE, ( err, data ) => {
        res.setHeader( 'Cache-Control', 'no-cache' );
        res.json( JSON.parse( data ) );
    } );
} );

/**
 * POST: /api/timers
 * 
 * Write a new timer to the file-level datastore. 
 * 
 * @returns the updated list of timers as a json array.
 */
app.post( '/api/timers', ( req, res ) => {
    fs.readFile( DATA_FILE, ( err, data ) => {
        const timers = JSON.parse( data );
        const newTimer = {
            title: req.body.title,
            project: req.body.project,
            id: req.body.id,
            elapsed: 0,
            runningSince: null,
        };
        timers.push( newTimer );
        fs.writeFile( DATA_FILE, JSON.stringify( timers, null, 4 ), () => {
            res.setHeader( 'Cache-Control', 'no-cache' );
            res.json( timers );
        } );
    } );
} );

/**
 * POST: /api/timers/start
 * 
 * Start a timer for a specific task and write the new state to
 * the file-level datastore. 
 * 
 * @returns an empty json object.
 */
app.post( '/api/timers/start', ( req, res ) => {
    fs.readFile( DATA_FILE, ( err, data ) => {
        const timers = JSON.parse( data );
        timers.forEach( ( timer ) => {
            if ( timer.id === req.body.id ) {
                timer.runningSince = req.body.start;
            }
        } );
        fs.writeFile( DATA_FILE, JSON.stringify( timers, null, 4 ), () => {
            res.json( {} );
        } );
    } );
} );

/**
 * POST: /api/timers/stop
 * 
 * Stop the timer for a specific task and write the new state to the
 * file-level datastore. 
 * 
 * @returns an empty json object. 
 */
app.post( '/api/timers/stop', ( req, res ) => {
    fs.readFile( DATA_FILE, ( err, data ) => {
        const timers = JSON.parse( data );
        timers.forEach( ( timer ) => {
            if ( timer.id === req.body.id ) {
                const delta = req.body.stop - timer.runningSince;
                timer.elapsed += delta;
                timer.runningSince = null;
            }
        } );
        fs.writeFile( DATA_FILE, JSON.stringify( timers, null, 4 ), () => {
            res.json( {} );
        } );
    } );
} );

/**
 * PUT: /api/timers
 * 
 * Update an existing timer.
 * 
 * @return the updated task timer json object.
 */
app.put( '/api/timers', ( req, res ) => {
    fs.readFile( DATA_FILE, ( err, data ) => {
        const timers = JSON.parse( data );
        timers.forEach( ( timer ) => {
            if ( timer.id === req.body.id ) {
                timer.title = req.body.title;
                timer.project = req.body.project;
            }
        } );
        fs.writeFile( DATA_FILE, JSON.stringify( timers, null, 4 ), () => {
            res.json( {} );
        } );
    } );
} );

/**
 * DELETE: /api/timers
 * 
 * Delete an existing timer.
 * 
 * @return an empty json object.
 */
app.delete( '/api/timers', ( req, res ) => {
    console.log( JSON.stringify( req.body ) );
    fs.readFile( DATA_FILE, ( err, data ) => {
        let timers = JSON.parse( data );
        timers = timers.reduce( ( memo, timer ) => {
            if ( timer.id === req.body.id ) {
                return memo;
            } else {
                return memo.concat( timer );
            }
        }, [] );
        fs.writeFile( DATA_FILE, JSON.stringify( timers, null, 4 ), () => {
            res.json( {} );
        } );
    } );
} );

/**
 * Simulates a slow network connection?
 */
app.get( '/molasses', ( _, res ) => {
    setTimeout( () => {
        res.end();
    }, 5000 );
} );

/**
 * Starts a UNIX socket and listens for connections. 
 */
app.listen( app.get( 'port' ), () => {
    console.log( `Find the server at: http://localhost:${app.get( 'port' )}/` );
} );