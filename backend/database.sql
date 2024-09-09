CREATE DATABASE  IF NOT EXISTS `startupweekdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `startupweekdb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: startupweekdb
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `eventId` varchar(45) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `eventId` (`eventId`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (34,'a1b2c3','Today\'s Networking Event','Come join us for a networking event with key figures in the industry.',NULL,'2024-09-08','19:15:00','20:15:00'),(35,'d4e5f6','Tech Innovation Conference','Explore the latest innovations in technology with industry leaders.',NULL,'2024-09-12','10:00:00','11:00:00'),(36,'g7h8i9','AI in Healthcare Workshop','A deep dive into the applications of AI in healthcare.',NULL,'2024-09-15','13:00:00','14:00:00'),(37,'j1k2l3','Digital Marketing Bootcamp','Master digital marketing strategies with top experts.',NULL,'2024-09-18','09:30:00','10:30:00'),(38,'m4n5o6','FinTech Innovators Meetup','Meet the most innovative minds in the fintech industry.',NULL,'2024-09-20','12:00:00','13:00:00'),(39,'p7q8r9','Startup Pitch Night','Pitch your startup to investors and industry experts.',NULL,'2024-09-25','18:00:00','19:00:00'),(40,'s1t2u3','HealthTech Expo','Discover cutting-edge technology in the healthcare sector.',NULL,'2024-09-28','11:00:00','12:00:00'),(41,'v4w5x6','Clean Energy Summit','A summit focused on renewable energy solutions.',NULL,'2024-10-05','14:00:00','15:00:00'),(42,'y7z8a1','Blockchain Disruption Conference','Learn about the future of blockchain and its impact on industries.',NULL,'2024-10-10','12:00:00','13:00:00'),(43,'b2c3d4','Mobile App Development Bootcamp','Build your first mobile app with hands-on experience.',NULL,'2024-10-15','10:00:00','11:00:00'),(44,'e5f6g7','SaaS Growth Conference','Unlock strategies to scale your SaaS business.',NULL,'2024-10-20','13:00:00','14:00:00'),(45,'h8i9j1','Cybersecurity Essentials Workshop','Learn essential cybersecurity skills to protect your business.',NULL,'2024-10-30','16:00:00','17:00:00'),(46,'k2l3m4','Today\'s Late Networking Event','Join us for a late-night networking event today.',NULL,'2024-09-08','23:45:00','00:45:00'),(47,'fliy983','Today\'s All-Day Event','Join us for an all-day networking event today.',NULL,'2024-09-09','08:00:00','22:00:00');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_checkins`
--

DROP TABLE IF EXISTS `events_checkins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events_checkins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registrantId` varchar(45) DEFAULT NULL,
  `eventId` varchar(45) DEFAULT NULL,
  `checkInTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `registrantId` (`registrantId`),
  KEY `eventId` (`eventId`),
  CONSTRAINT `events_checkins_ibfk_1` FOREIGN KEY (`registrantId`) REFERENCES `registrants` (`registrantId`),
  CONSTRAINT `events_checkins_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `events` (`eventId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_checkins`
--

LOCK TABLES `events_checkins` WRITE;
/*!40000 ALTER TABLE `events_checkins` DISABLE KEYS */;
INSERT INTO `events_checkins` VALUES (2,'RSW-DC-109','fliy983','2024-09-09 14:20:28');
/*!40000 ALTER TABLE `events_checkins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_registrations`
--

DROP TABLE IF EXISTS `events_registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events_registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registrantId` varchar(45) DEFAULT NULL,
  `eventId` varchar(45) DEFAULT NULL,
  `registrationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `registrantId` (`registrantId`),
  KEY `eventId` (`eventId`),
  CONSTRAINT `events_registrations_ibfk_1` FOREIGN KEY (`registrantId`) REFERENCES `registrants` (`registrantId`),
  CONSTRAINT `events_registrations_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `events` (`eventId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_registrations`
--

LOCK TABLES `events_registrations` WRITE;
/*!40000 ALTER TABLE `events_registrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `events_registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrants`
--

DROP TABLE IF EXISTS `registrants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registrantId` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phoneNumber` varchar(45) NOT NULL,
  `affiliation` varchar(45) NOT NULL,
  `createdAt` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `registrantId` (`registrantId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrants`
--

LOCK TABLES `registrants` WRITE;
/*!40000 ALTER TABLE `registrants` DISABLE KEYS */;
INSERT INTO `registrants` VALUES (24,'RSW-DC-109','Dante Jordan','Cady','dantecady@gmail.com','4015481179','','2024-09-08'),(25,'RSW-DC-2323','Dante Jordan','Cady','dantecady@gmail.com','4015481179','','2024-09-08'),(26,'RSW-DC-2680','Dante Jordan','Cady','dantecady@gmail.com','4015481179','','2024-09-08'),(27,'RSW-DC-1525','Dante Jordan','Cady','dantecady@gmail.com','4015481179','','2024-09-08'),(28,'RSW-DC-3907','Dante Jordan','Cady','dantecady@gmail.com','4015481179','','2024-09-08'),(29,'RSW-DC-7830','Dante Jordan','Cady','dantecady@gmail.com','4015481179','n/a','2024-09-09');
/*!40000 ALTER TABLE `registrants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-09 16:06:05
