-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: centauri
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Planeta'),(2,'Estrella'),(3,'Satelite'),(4,'Agujero negro');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intereses`
--

DROP TABLE IF EXISTS `intereses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intereses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `interes` int DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intereses`
--

LOCK TABLES `intereses` WRITE;
/*!40000 ALTER TABLE `intereses` DISABLE KEYS */;
INSERT INTO `intereses` VALUES (247,15,'valladaresjorge100@gmail.com'),(248,15,'valladaresjorge100@gmail.com'),(249,15,'valladaresjorge100@gmail.com'),(250,18,'valladaresjorge100@gmail.com'),(251,18,'valladaresjorge100@gmail.com'),(255,12,'prueba@gmail.com'),(256,12,'valladaresjorge100@gmail.com');
/*!40000 ALTER TABLE `intereses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticias`
--

DROP TABLE IF EXISTS `noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noticias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(75) NOT NULL,
  `descripcion` varchar(777) NOT NULL,
  `foto1` varchar(1000) DEFAULT NULL,
  `foto2` varchar(1000) DEFAULT NULL,
  `foto3` varchar(1000) DEFAULT NULL,
  `foto4` varchar(1000) DEFAULT NULL,
  `tipo` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tipo2` (`tipo`),
  CONSTRAINT `fk_tipo2` FOREIGN KEY (`tipo`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticias`
--

LOCK TABLES `noticias` WRITE;
/*!40000 ALTER TABLE `noticias` DISABLE KEYS */;
INSERT INTO `noticias` VALUES (4,'El pollo ya es carbon','Despues de tanto tiempo de espera el pollo esta hecho polvo nmms','20222259341.jpg','20222259342.png','20222259343.jpg','20222259344.jpg',1);
/*!40000 ALTER TABLE `noticias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(50) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'valladaresjorge100@gmail.com','12345678','Jorge'),(2,'valladaresjorge100@gmail.com','12345','Jorge'),(3,'prueba@gmail.com','juan','Max');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wiki`
--
DROP TABLE IF EXISTS `wiki`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wiki` (
  `id` int NOT NULL AUTO_INCREMENT,
  `foto` varchar(5000) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo` int DEFAULT NULL,
  `size` varchar(75) NOT NULL,
  `temperatura` varchar(50) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`),
  KEY `fk_tipo` (`tipo`),
  CONSTRAINT `fk_tipo` FOREIGN KEY (`tipo`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wiki`
--

LOCK TABLES `wiki` WRITE;
/*!40000 ALTER TABLE `wiki` DISABLE KEYS */;
INSERT INTO `wiki` VALUES (12,'2022091028Jupiter.png','Jupiter',1,'3,389.5 km','-129℃','dsg dsg'),(13,'2022092402tierra.png','La tierra',1,'6,371 km','–18ºC','sfdsgefdgdsfgfd'),(14,'2022125042luna.png','Luna',3,'1,737.4 km','184°C','La Luna es el único satélite natural de la Tierra'),(15,'2022071442Centauri.png','Proxima Centauri',2,'107,280 km','3,042 K','Próxima Centauri o Alfa Centauri C​ ​ es una estrella enana roja de 11.ª magnitud aparente situada a aproximadamente 4,22 años luz ​ de la Tierra, en la constelación de Centaurus y posiblemente perteneciente al sistema de Alfa Centauri'),(16,'2022072037ton618.jpeg','TON 618',4,'-30.7','No se XD','TON 618​ es un cuásar hiperluminoso localizado en el polo norte galáctico en la constelación Canes Venatici. Es probable que contenga el agujero negro supermasivo más grande descubierto hasta ahora, quizás con una masa 66 mil millones de veces la masa del sol'),(17,'2022073456kepler 1649c.jpg','kepler 1649c',1,'6,753.3 km','−39 °C','Kepler-1649c es un exoplaneta que orbita la estrella enana roja Kepler-1649, a unos 300 años luz de la Tierra.​​ En 2020, Jeff Coughlin, director de la Oficina de Ciencias K2 de SETI, lo describió como «el planeta más similar a la Tierra» encontrado hasta ahora por el telescopio espacial Kepler'),(18,'2022191207Venus-PNG-Photo.png','Venus',1,'6,051.8 km','45°C','Venus es el segundo planeta del sistema solar en orden de proximidad al Sol y el tercero en cuanto a tamaño en orden ascendente después de Mercurio y Marte');
/*!40000 ALTER TABLE `wiki` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-28 23:25:54
