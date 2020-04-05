# MySQL MariaDB PostgreSQL with NodeJS in Amazon RDS EC2
1. mkdir nodejs_db
2. cd nodejs_db
3. nano Dockerile
4. nano server.js
5. npm init
6. npm install express express-handlebars mysql mariadb pg
7. sudo docker build -t <your-application-name> .
8. sudo docker images
9. sudo docekr run -p 80:3000 <image-id of application-name>

