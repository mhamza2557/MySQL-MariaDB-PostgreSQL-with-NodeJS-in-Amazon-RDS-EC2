const mysql = require("mysql");
const express = require("express");
const mariadb = require("mariadb/callback");
const {Pool, Client} = require("pg");
var app = express();

app.get('/', function(request, response){ 
	fetchData(response);
});

//MySQL Connection
var mysqlConnection = mysql.createConnection({
    host : "",
    user : "",
    password : "",
    database : "",
    multipleStatements : true
});

//MySQL Connection Reponse
mysqlConnection.connect((err) => {
    if(!err) {
        console.log("Connected to RDS MySQL");
    } else {
        console.log("Not Connected to RDS MySQL");
    }
});

//MySQL Query Execute
function executeQueryMySQL(sql, cb) {
	mysqlConnection.query(sql, function(error, result, field){
		if(error) { throw error; }
		cb(result);
	});
}

//MariaDB Connection
var mariadbConnection =  mariadb.createConnection({
	host : "",
	user : "",
	password : "",
	database : "",
	port : 3306
});

//MariaDB Connection Reponse
mariadbConnection.connect((err) => {
    if(!err) {
        console.log("Connected to RDS MariaDB");
    } else {
        console.log("Not Connected to RDS MariaDB");
    }
});

//MariaDB Query Execute
function executeQueryMariaDB(sql, cb) {
	mariadbConnection.query(sql, function(error, result, field){
		if(error) { throw error; }
		cb(result);
	});
}


//PostgreSQL Connection
const client = new Client({
	user: '',
	host: '',
	database: '',
	password: '',
	port: 5432,
  })

//PostgreSQL Connection Reponse
client.connect((err) => {
    if(!err) {
        console.log("Connected to RDS PostgreSQL");
    } else {
        console.log("Not Connected to RDS PostgreSQL");
    }
});

//PostgreSQL Query Execute

function executeQueryPostgreSQL(sql, cb) {
	client.query(sql, function(error, result, field){
		if(error) { throw error; }
		cb(result);
	});
}

function fetchData(response) {
	executeQueryMySQL("SELECT * FROM products", function(result){
		console.log(result);
		response.write('<table border="1" style="margin-bottom: 20px;"><tr>');
		response.write('<td><label>' + 'MySQL Database' + '</label></td>');
		response.write('</tr>');
		
		for(var row in result){ 
			response.write('<tr>');
			for(var column in result[row]) {
				response.write('<td><label>' + result[row][column] + '</label></td>');
			}
			response.write('</tr>');
		}
		response.write('</table>');
	});

	executeQueryMariaDB("SELECT * FROM products", function(result){
		console.log(result);
		response.write('<table border="1" style="margin-bottom: 20px;"><tr>');
		response.write('<td><label>' + 'MariaDB Database' + '</label></td>');
		response.write('</tr>');
		
		for(var row in result){ 
			response.write('<tr>');
			for(var column in result[row]) {
				response.write('<td><label>' + result[row][column] + '</label></td>');
			}
			response.write('</tr>');
		}
		response.write('</table>');
	});

	executeQueryPostgreSQL("SELECT * FROM products", function(result){
		console.log(result);
		response.write('<table border="1"><tr>');
		response.write('<td><label>' + 'PostgreSQL Database' + '</label></td>');
		response.write('</tr>');
		
		for(var row in result.rows){ 
			response.write('<tr>');
			for(var column in result.rows[row]) {
				response.write('<td><label>' + result.rows[row][column] + '</label></td>');
			}
			response.write('</tr>');
		}
		response.write('</table>');
	});
}


app.listen(3000, () => {
	console.log("Listen 3000");
	console.log("Check Internet Browser");
});