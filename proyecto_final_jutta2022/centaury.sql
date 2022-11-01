CREATE DATABASE centaruri;
use Centaruri;
show tables; 
CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
Correo VARCHAR(100) NOT NULL,
Pass VARCHAR(20) NOT NULL,
Nombre VARCHAR(100) NOT NULL
);

select * from users;