'use strict';

const r = require('rethinkdb');
require('co-mocha');

const config = {
    host: 'localhost',
    port: 32769,
    authKey: '',
    db: 'inbox'
};

describe('rethink-docker', function(){
   
    let conn;
    
    beforeEach(function*(){
        conn = yield r.connect(config);
    });
    
    afterEach(function*(){
        yield conn.close();
    });
   
    it('should be able to connect', function*(){
       
        const name = config.db;
        
        // create database
        if (!(yield r.dbList().contains(name).run(conn))){
            yield r.dbCreate(name).run(conn);
        }
       
        // drop tables
        yield r.db(name).tableDrop('user').run(conn);

        // create tables
        yield r.db(name).tableCreate('user').run(conn);
        
        // insert
        let user = { name: 'sandcastle' };
        yield r.db(name).table('user').insert(user).run(conn);
        
    });
});
