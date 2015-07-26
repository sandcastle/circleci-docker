'use strict';

const r = require('rethinkdb');
require('co-mocha');

const config = {
    host: 'localhost',
    port: 28015,
    authKey: '',
    db: 'inbox'
};

before(function*(){
    
    console.log('-----------');
    
    let conn = yield r.connect(config);
    
    // drop db if exists
    console.log('checking for existing db');
    if (yield r.dbList().contains(config.db).run(conn)) {        
        console.log('dropping db');
        yield r.dbDrop(config.db).run(conn);
    }
    
    // create db
    console.log('creating db');
    yield r.dbCreate(config.db).run(conn);
    
    yield conn.close();
    
    console.log('-----------');
    
});

describe('rethink-docker', function(){
   
    let conn;
    
    beforeEach(function*(){
        conn = yield r.connect(config);
    });
    
    afterEach(function*(){
        yield conn.close();
    });
   
    it('should be able to connect', function*(){
       
        // drop tables
        yield r.db(config.db).tableDrop('user').run(conn);

        // create tables
        yield r.db(config.db).tableCreate('user').run(conn);
        
        // insert
        let user = { name: 'sandcastle' };
        yield r.db(config.db).table('user').insert(user).run(conn);
        
    });
});
