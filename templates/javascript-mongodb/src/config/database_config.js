/*  => Your database connection settings go below
    => export it after connection is stablished


! Note that expressjs is agnostic to whatever database you use, feel free to use whatever db you know.
! Here is a list of packages that you can use to connect to different db:

Cassandra -> npm i express-cassandra
Couchbase -> npm i couchbase
CouchDB  -> npm i nano
LevelDB -> npm i level levelup leveldown
MySQL -> npm i mysql
MongoDB -> npm i mongodb (i recommend use mongoose too)
Neo4j -> npm i apoc 
Oracle -> npmi oracledb
PostgreSQL -> npm i pg-promise
Redis -> npm i redis
SQL Server -> npm i tedious
SQLite -> npmi sqlite3
ElasticSearch -> npmi elasticsearch

*/
const mongoose = require('mongoose');

// You can use dotenv (The pacakge is installed) ->

mongoose.connect('mongodb://localhost/express-cli', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
