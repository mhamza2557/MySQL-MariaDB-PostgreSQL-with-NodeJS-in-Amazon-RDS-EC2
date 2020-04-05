# MySQL MariaDB PostgreSQL with NodeJS in Amazon RDS EC2
mkdir nodejs_db
cd nodejs_db
nano Dockerile
nano server.js
npm init
npm install express express-handlebars mysql mariadb pg
sudo docker build -t <your-application-name> .
sudo docker images
sudo docekr run -p 80:3000 <image-id of shazaib>

