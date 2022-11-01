CREATE DATABASE centaury;
USE centaury;

CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
correo VARCHAR(50) NOT NULL,
pass VARCHAR(20) NOT NULL,
nombre VARCHAR(50) NOT NULL
);

SELECT * FROM users;

CREATE TABLE intereses(
id INT AUTO_INCREMENT PRIMARY KEY,
interes INT,
usuario VARCHAR(50)
);

SELECT i.id ,i.interes, w.foto ,w.nombre, c.tipo, COUNT(w.nombre) AS cantidad FROM intereses AS i
INNER JOIN wiki AS w ON i.interes=w.id INNER JOIN categoria AS c ON w.tipo=c.id WHERE usuario = "valladaresjorge100@gmail.com" GROUP BY w.nombre;

SELECT w.id, w.foto ,w.nombre, c.tipo, c.tipo FROM wiki AS w INNER JOIN categoria AS c ON w.tipo=c.id ;

SELECT * FROM intereses;

DELETE FROM intereses WHERE interes = 13 AND usuario = "prueba@gmail.com";

DELETE FROM intereses;

SELECT i.interes, i.usuario, w.foto ,w.nombre, c.tipo FROM intereses AS i
INNER JOIN wiki AS w ON i.interes=w.id
INNER JOIN categoria AS c ON w.tipo=c.id;

SELECT * FROM intereses WHERE usuario = "prueba@gmail.com";

SELECT * FROM intereses WHERE usuario = "xd@gmail.com";

INSERT INTO intereses (usuario, interes) VALUES ("xd2@gmail.com", 14);
INSERT INTO intereses (usuario, interes) VALUES ("xd2@gmail.com", 15);
INSERT INTO intereses (usuario, interes) VALUES ("xd2@gmail.com", 16);

SELECT id, nombre, tipo FROM wiki;


CREATE TABLE wiki(
id INT AUTO_INCREMENT PRIMARY KEY,
foto VARCHAR(5000) NOT NULL,
nombre VARCHAR(100) NOT NULL,
tipo INT,
size VARCHAR(75) NOT NULL,
temperatura VARCHAR(50),
descripcion TEXT(777)
);

SELECT w.id, w.foto ,w.nombre, c.tipo FROM wiki AS w INNER JOIN categoria AS c ON w.tipo=c.id WHERE c.tipo = "Agujero negro";

SELECT w.id, w.foto, w.nombre, c.tipo, w.size, w.temperatura, w.descripcion FROM wiki AS w
INNER JOIN categoria AS c ON w.tipo=c.id;

SELECT * FROM wiki;

SELECT w.id, w.foto, w.nombre, c.tipo, w.size, w.temperatura, w.descripcion FROM wiki AS w
INNER JOIN categoria AS c ON w.tipo=c.id WHERE w.id = 14 AND w.nombre = "Luna";

DELETE FROM wiki WHERE nombre = "saturno";

INSERT INTO wiki (foto, nombre, tipo, size, temperatura, descripcion) VALUES
("poto", "Tierra", 1, "6,371 km", "–18ºC", "El planeta tierra el hogar de los seres humanos");

INSERT INTO wiki (foto, nombre, tipo, size, temperatura, descripcion) VALUES
("poto", "El Sol", 2, "696,340 kmm", "5,778 K", "Estrella con luz propia alrededor de la cual gira la Tierra");

INSERT INTO wiki (foto, nombre, tipo, size, temperatura, descripcion) VALUES
("poto", "Marte", 1, "3,389.5 km", "-129°C", "El planeta mas cercano a la tierra");

INSERT INTO categoria (tipo) VALUES ("Planetas");
INSERT INTO categoria (tipo) VALUES ("Estrellas");
INSERT INTO categoria (tipo) VALUES ("Satelite");
INSERT INTO categoria (tipo) VALUES ("Agujero negro");

SELECT * FROM wiki;

SELECT * FROM categoria;

CREATE TABLE categoria(
id INT AUTO_INCREMENT PRIMARY KEY,
tipo VARCHAR(45)
);

SELECT tipo FROM categoria;

CREATE TABLE noticias(
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(75) NOT NULL,
descripcion VARCHAR(777) NOT NULL,
foto1 VARCHAR(1000),
foto2 VARCHAR(1000),
foto3 VARCHAR(1000),
foto4 VARCHAR(1000),
tipo INT
);

DELETE FROM noticias;

SELECT * FROM noticias;

SELECT n.id , n.titulo, n.descripcion, n.foto1, n.foto2, n.foto3, n.foto4, c.tipo FROM noticias AS n INNER JOIN categoria AS c ON n.tipo=c.id WHERE n.id = 4 AND n.titulo = "El pollo ya es carbon";

INSERT INTO noticias (titulo, descripcion, foto1, foto2, foto3, foto4, tipo) VALUES ("XD", "xdxdxdxdxdxd", "xd?", "xd?", "xd?", "xd?", 1);

SELECT n.id , n.titulo, n.descripcion, n.foto1, n.foto2, n.foto3, n.foto4, c.tipo FROM noticias AS n INNER JOIN categoria AS c ON n.tipo=c.id;

ALTER TABLE itereses ADD CONSTRAINT fk_usuario FOREIGN KEY (usuario) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE itereses ADD CONSTRAINT fk_intereses FOREIGN KEY (interes) REFERENCES wiki (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE wiki ADD CONSTRAINT fk_tipo FOREIGN KEY (tipo) REFERENCES categoria (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE noticias ADD CONSTRAINT fk_tipo2 FOREIGN KEY (tipo) REFERENCES categoria (id) ON DELETE CASCADE ON UPDATE CASCADE;





