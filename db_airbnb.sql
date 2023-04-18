-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_airbnb
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `checkIn_date` datetime DEFAULT NULL,
  `checkOut_date` datetime DEFAULT NULL,
  `num_guess` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `user_id` (`user_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (2,2504,'2023-04-16 00:00:00','2023-04-18 00:00:00',4,4),(3,2522,'2023-04-16 03:25:00','2023-04-18 00:00:00',4,6),(4,2522,'2023-04-20 03:25:00','2023-04-25 00:00:00',4,8),(5,2504,'2023-05-01 00:00:00','2023-05-25 00:00:00',2,6),(6,2533,'2023-04-27 00:00:00','2023-04-30 00:00:00',2,4),(7,2522,'2023-04-28 00:00:00','2023-04-30 00:00:00',2,4),(8,2522,'2023-05-10 00:00:00','2023-05-23 00:00:00',2,5);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `comment_date` datetime DEFAULT NULL,
  `comment_body` varchar(100) DEFAULT NULL,
  `num_stars` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,2522,5,'2023-04-08 00:00:00','Room is very bad',2),(3,2504,1,'2023-05-08 00:00:00','Room is ok',4),(4,2533,8,'2023-05-10 00:00:00','Room is very good',5),(6,2522,1,'2023-05-12 00:00:00','Room is sucked',1),(7,2508,3,'2023-05-22 00:00:00','Room is ok',3);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(50) DEFAULT NULL,
  `province_city` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `loc_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'153 Vo v Tan, P6 Q3','Ho Chi Minh','Vietnam',''),(3,'153 Ly Thuong Kiet, P25 Q 10','Ho Chi Minh','Vietnam',''),(4,'126 Ly Thuong Kiet, P2 TP Cao Lanh','Dong Thap','Vietnam',''),(5,'126 Tran Phu','Nha Trang','Vietnam',''),(6,'18 Giai Phong','Ha noi','Vietnam',''),(7,'18 Brookhurst','Anaheim','US',''),(8,'18 Le Couq','Paris','France',''),(9,'143 Le loi','Da nang','Vietnam',''),(10,'143 Ho Xuan Huong','Hue','Vietnam',''),(11,'25 Ho Xuan Huong','Ho Chi Minh','Vietnam',''),(12,'222 Pham v Dong','Ho Chi Minh','Vietnam','');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` int NOT NULL,
  `room_name` varchar(20) DEFAULT NULL,
  `max_guess` int DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `num_beds` int DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `washing_machine` tinyint(1) DEFAULT NULL,
  `iron` tinyint(1) DEFAULT NULL,
  `tivi` tinyint(1) DEFAULT NULL,
  `air_condition` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `kitchen` tinyint(1) DEFAULT NULL,
  `parking` tinyint(1) DEFAULT NULL,
  `swimming` tinyint(1) DEFAULT NULL,
  `iron_table` tinyint(1) DEFAULT NULL,
  `location_id` int DEFAULT NULL,
  `room_pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (2504,'delux',3,1,1,1,'garden view',100,0,1,1,1,1,0,1,1,1,1,'D:\\CyberSoft\\FinalNod2e28\\final_nest/public/img/room/1681228837447face 1.jpg'),(2508,'vip',4,2,3,2,'garden view',220,0,1,1,1,1,0,1,1,1,3,''),(2522,'luxury',6,2,3,2,'garden view',180,0,1,1,1,1,0,1,1,1,3,''),(2533,'luxury',6,2,3,2,'garden view',180,0,1,1,1,1,0,1,1,1,3,'');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birth_day` varchar(20) DEFAULT NULL,
  `gender` varchar(8) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nguyen Anthony','anthony@gmail.com','$2b$10$t5iR8E9o12QPfVO6PnZg6utbnXUOp4GYP3tyYULyOhKkgs89AALfG','0906690564','03/25/1968','male','','user'),(2,'Nguyen Evelyn','evelyn@gmail.com','$2b$10$HzBwNxqf/XkszK6Zr2dem.1A6CRDvwNo/Jue/xdsskpkHbZfcS/rO','0906690564','03/25/2005','female','','user'),(3,'Nguyen Tran Minh Chau','chau@gmail.com','$2b$10$dUlIpiyr7TgOFsAt4uy2euCimo58Epu5TfZSM35KGSNy7TQWm89EK','0906690564','03/25/2021','female','D:\\CyberSoft\\FinalNod2e28\\final_nest/public/img16810825860494 - 2.jpg','user'),(4,'Nguyen Tran Minh Quan','quan@gmail.com','$2b$10$pLHCGsCFGKfIUjOPON.yhO/BiB.G7vzHvMeWlLhQfAfdRB3ylvbhm','0906690564','03/25/2022','male','','user'),(5,'Tran Tu Quyen','quuyen@gmail.com','$2b$10$38RZUXCtZl7xe7yVbI67lO8rIF.vxfsbxJx18z6V3Oi71X8n5YNue','0906690564','03/25/1997','female','','user'),(6,'Test','test@gmail.com','$2b$10$A64hILUrEautaCq/6.66sey8jz9qCtmAyyG24NQh7W0kEgn7/P4Me','0906690564','03/25/0000','female','','admin'),(8,'Nguyen abc','abc@gmail.com','$2b$10$8VqYbU2ZonGPwidQy7GznushsoAbhjjLLi6gKGV2.GVo1ssc7SZRa','09090909','25/03/2110','male','','user'),(9,'Test3','test3@gmail.com','$2b$10$/ZxwahaIALPJGFzt34rQ.epDsFpBx59R9Lv7F4L1I9V7yQcTxSPGG','0906690564','03/25/0000','female','','user'),(10,'Nguyen abcde','abcde@gmail.com','$2b$10$vIY6VQcPF3i6KtRFGOpXFeQkPKy3oS9dOGlQ8.mq0fJGyn8dprNnK','09090909','25/03/2110','male','','user'),(11,'Tran abcde','tran@gmail.com','$2b$10$jwIcocU17fAUiXNd2W9wBebBKrKO0/zipg6zAr9JZo6CDG..ZxQ8C','09090909','25/03/2110','male','','user'),(12,'Nguyen Vanna','vanna@gmail.com','$2b$10$7Q6lZseLVP3WylTabSMv1.rgvA81wU3HwlIVcrBsRK809Dgw7NBsK','0902308310','03/25/1971','female',NULL,'admin'),(13,'Tran ab','ab@gmail.com','$2b$10$JAlFIewRndBecRc.m6lQkeaPxxpl005Zedzwr/3/7QMOj4zMz88PO','09090909','25/03/2110','female',NULL,'user'),(14,'Tran absss','absss@gmail.com','$2b$10$kacG9RoQbP95nbCT3bEgO.iV3TKhQybn.fnhXo/VPwD4kxHp/xZlS','09090909','25/03/2110','female',NULL,'user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-16 20:52:08
