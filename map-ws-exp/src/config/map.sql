-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.31 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for map_ws_dev
CREATE DATABASE IF NOT EXISTS `map_ws_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `map_ws_dev`;

-- Dumping structure for table map_ws_dev.adm_area
CREATE TABLE IF NOT EXISTS `adm_area` (
  `id` int NOT NULL AUTO_INCREMENT,
  `acreage` double DEFAULT NULL,
  `description` text,
  `status` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table map_ws_dev.adm_area: ~5 rows (approximately)
INSERT INTO `adm_area` (`id`, `acreage`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 142248, 'Khu vuc 1', 'on', '2022-12-17 14:32:11', '2022-12-17 14:32:11'),
	(2, 122865, 'Khu vuc 2', 'on', '2022-12-17 14:35:27', '2022-12-17 14:35:27'),
	(3, 675461, 'Khu vuc 3', 'on', '2022-12-17 14:36:12', '2022-12-17 14:36:12'),
	(4, 507331, 'Khu vuc 4', 'on', '2022-12-17 14:36:15', '2022-12-17 14:36:15'),
	(5, 108806, 'Khu vuc 5', 'on', '2022-12-17 14:36:18', '2022-12-17 14:36:18');

-- Dumping structure for table map_ws_dev.adm_bin
CREATE TABLE IF NOT EXISTS `adm_bin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `address` text,
  `height` double DEFAULT NULL,
  `length` double DEFAULT NULL,
  `width` double DEFAULT NULL,
  `maxWeight` double DEFAULT NULL,
  `color` text,
  `material` text,
  `brand` text,
  `image` text,
  `description` text,
  `status` text,
  `areaId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `areaId` (`areaId`),
  CONSTRAINT `adm_bin_ibfk_1` FOREIGN KEY (`areaId`) REFERENCES `adm_area` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table map_ws_dev.adm_bin: ~48 rows (approximately)
INSERT INTO `adm_bin` (`id`, `latitude`, `longitude`, `address`, `height`, `length`, `width`, `maxWeight`, `color`, `material`, `brand`, `image`, `description`, `status`, `areaId`, `createdAt`, `updatedAt`) VALUES
	(1, 21.023301, 105.842583, '2 Ng. Tức Mặc, Cửa Nam, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449239.jpg', '', 'empty', 1, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(2, 21.024804, 105.842959, '45-27 Phan Bội Châu, Cửa Nam, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449271.jpg', '', 'empty', 1, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(3, 21.026677, 105.84357, '14-16 Phan Bội Châu, Cửa Nam, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449293.jpg', '', 'empty', 1, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(4, 21.025756, 105.842122, '91-89 P. Lý Thường Kiệt, Cửa Nam, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449314.jpg', '', 'empty', 1, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(5, 21.025075, 105.844525, '60-62 P. Lý Thường Kiệt, Cửa Nam, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449331.jpg', '', 'empty', 1, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(6, 21.024093, 105.844858, '65-63 P. Quán Sứ, Cửa Nam, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449357.jpg', '', 'empty', 1, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(7, 21.024668, 105.845812, '67/4A Ly Thuong Kiet, Hoan Kiem, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449386.jpg', '', 'empty', 1, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(8, 21.025588, 105.846681, '1-18 P. Hoả Lò, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449415.jpg', '', 'empty', 1, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(9, 21.026269, 105.84579, '49 P. Hai Bà Trưng, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449442.jpg', '', 'empty', 1, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(10, 21.024643, 105.85163, '40 P. Hai Bà Trưng, Tràng Tiền, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449480.jpg', '', 'empty', 2, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(11, 21.025028, 105.850443, '37-35 P. Hai Bà Trưng, Tràng Tiền, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449506.jpg', '', 'empty', 2, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(12, 21.025482, 105.852828, '3-9 P. Hàng Khay, Tràng Tiền, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449527.jpg', '', 'empty', 2, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(13, 21.026263, 105.850843, '13T Tràng Thi, Hàng Trống, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449555.jpg', '', 'empty', 2, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(14, 21.026869, 105.848146, '33 Tràng Thi, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449574.jpg', '', 'empty', 2, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(15, 21.025727, 105.849757, '1 P. Quang Trung, Tràng Tiền, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449595.jpg', '', 'empty', 2, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(16, 21.024364, 105.849382, '2-4 P. Quang Trung, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449619.jpg', '', 'empty', 2, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(17, 21.023396, 105.850094, '45 P. Lý Thường Kiệt, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449646.jpg', '', 'empty', 2, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(18, 21.025734, 105.847656, '43A P. Hai Bà Trưng, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449673.jpg', '', 'empty', 2, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(19, 21.02037, 105.84441, '14 P. Trần Bình Trọng, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449697.jpg', '', 'empty', 3, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(20, 21.021431, 105.843378, 'P. Yết Kiêu, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449729.jpg', '', 'empty', 3, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(21, 21.020426, 105.846653, '67 P. Trần Quốc Toản, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449759.jpg', '', 'empty', 3, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(22, 21.01926, 105.8485, '46-35 P. Trương Hán Siêu, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449788.jpg', '', 'empty', 3, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(23, 21.021228, 105.848291, '24 P. Quang Trung, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449813.jpg', '', 'empty', 3, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(24, 21.021347, 105.845912, 'Ng. Đoàn Nhữ Hài, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449840.jpg', '', 'empty', 3, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(25, 21.022206, 105.848164, '66-68 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449870.jpg', '', 'empty', 3, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(26, 21.022837, 105.845675, '1 P. Trần Bình Trọng, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449901.jpg', '', 'empty', 3, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(27, 21.02345, 105.848054, '77d P. Thợ Nhuộm, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội 100000, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449931.jpg', '', 'empty', 3, '2022-12-17 16:44:09', '2022-12-17 16:44:09'),
	(28, 21.02023, 105.849785, 'Vietbank office building, P. Bà Triệu, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295449987.jpg', '', 'empty', 4, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(29, 21.018737, 105.85164, '28-48 P. Huế, Hàng Bài, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450019.jpg', '', 'empty', 4, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(30, 21.020049, 105.851969, '46-55 P. Hàng Bài, Hàng Bài, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450040.jpg', '', 'empty', 4, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(31, 21.021567, 105.852366, '47-41 P. Hàng Bài, Hàng Bài, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450064.jpg', '', 'empty', 4, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(32, 21.020133, 105.851005, '61-35 P.Hàm Long, Hàng Bài, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450133.jpg', '', 'empty', 4, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(33, 21.021217, 105.851218, '55 Trần Hưng Đạo, Hàng Bài, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450150.jpg', '', 'empty', 4, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(34, 21.01983, 105.853452, '56-158 P. Ngô Quyền, Hàng Bài, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450180.jpg', '', 'empty', 4, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(35, 21.02152, 105.853989, '46 P. Ngô Quyền, Hàng Bài, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450211.jpg', '', 'empty', 4, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(36, 21.02258, 105.853328, '35-27 P. Lý Thường Kiệt, Hàng Bài, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450235.jpg', '', 'empty', 4, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(37, 21.024084, 105.85359, '16-28 P. Hai Bà Trưng, Hàng Bài, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450376.jpg', '', 'empty', 4, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(38, 21.021823, 105.850319, '44-58 P. Bà Triệu, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450422.jpg', '', 'empty', 4, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(39, 21.019224, 105.855363, '57-53 P. Phan Chu Trinh, Phan Chu Trinh, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450472.jpg', '', 'empty', 5, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(40, 21.018665, 105.854301, '4-10 P.Hàm Long, Phan Chu Trinh, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450500.jpg', '', 'empty', 5, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(41, 21.019306, 105.856811, '13-11 P. Phan Huy Chú, Phan Chu Trinh, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450517.jpg', '', 'empty', 5, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(42, 21.020856, 105.857385, '5-3 P. Phan Huy Chú, Phan Chu Trinh, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450535.jpg', '', 'empty', 5, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(43, 21.022301, 105.857697, '11 P. Lê Thánh Tông, Phan Chu Trinh, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450559.jpg', '', 'empty', 5, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(44, 21.02173, 105.855712, '14-20 P. Lý Thường Kiệt, Phan Chu Trinh, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450582.jpg', '', 'empty', 5, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(45, 21.023466, 105.856686, '6-8 P. Phan Chu Trinh, Tràng Tiền, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450598.jpg', '', 'empty', 5, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(46, 21.02441, 105.854976, '18-32 P. Ngô Quyền, Tràng Tiền, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450614.jpg', '', 'empty', 5, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(47, 21.022674, 105.855787, '1 P. Phạm Sư Mạnh, Phan Chu Trinh, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450630.jpg', '', 'empty', 5, '2022-12-17 16:44:10', '2022-12-17 16:44:10'),
	(48, 21.025727, 105.855275, '15 P. Ngô Quyền, Tràng Tiền, Hoàn Kiếm, Hà Nội, Vietnam', 122, 135, 78, 100, 'blue', 'HDPE, Composite', 'Paloca', 'bin_1671295450646.jpg', '', 'empty', 5, '2022-12-17 16:44:10', '2022-12-17 16:44:10');

-- Dumping structure for table map_ws_dev.adm_task
CREATE TABLE IF NOT EXISTS `adm_task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `driverId` int DEFAULT NULL,
  `vehicleId` int DEFAULT NULL,
  `areaId` int DEFAULT NULL,
  `description` text,
  `status` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `driverId` (`driverId`),
  KEY `vehicleId` (`vehicleId`),
  KEY `areaId` (`areaId`),
  CONSTRAINT `adm_task_ibfk_1` FOREIGN KEY (`driverId`) REFERENCES `adm_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `adm_task_ibfk_2` FOREIGN KEY (`vehicleId`) REFERENCES `adm_vehicle` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `adm_task_ibfk_3` FOREIGN KEY (`areaId`) REFERENCES `adm_area` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table map_ws_dev.adm_task: ~10 rows (approximately)
INSERT INTO `adm_task` (`id`, `driverId`, `vehicleId`, `areaId`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 1, NULL, 'finished', '2022-12-17 15:21:05', '2022-12-17 15:21:05'),
	(2, 4, 2, 2, NULL, 'finished', '2022-12-17 15:21:29', '2022-12-17 15:21:29'),
	(3, 5, 3, 3, NULL, 'finished', '2022-12-17 15:21:38', '2022-12-17 15:21:38'),
	(4, 6, 4, 4, NULL, 'finished', '2022-12-17 15:21:44', '2022-12-17 15:21:44'),
	(5, 7, 5, 5, NULL, 'finished', '2022-12-17 15:21:48', '2022-12-17 15:21:48'),
	(6, 1, 4, 2, NULL, 'on', '2022-12-17 15:23:23', '2022-12-17 15:23:23'),
	(7, 4, 1, 3, NULL, 'on', '2022-12-17 15:23:27', '2022-12-17 15:23:27'),
	(8, 5, 2, 5, NULL, 'on', '2022-12-17 15:23:42', '2022-12-17 15:23:42'),
	(9, 6, 3, 1, NULL, 'on', '2022-12-17 15:23:46', '2022-12-17 15:23:46'),
	(10, 7, 5, 4, NULL, 'on', '2022-12-17 15:23:51', '2022-12-17 15:23:51');

-- Dumping structure for table map_ws_dev.adm_user
CREATE TABLE IF NOT EXISTS `adm_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` text,
  `password` text,
  `email` text,
  `firstName` text,
  `lastName` text,
  `gender` text,
  `dob` text,
  `image` text,
  `role` text,
  `description` text,
  `status` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table map_ws_dev.adm_user: ~7 rows (approximately)
INSERT INTO `adm_user` (`id`, `phone`, `password`, `email`, `firstName`, `lastName`, `gender`, `dob`, `image`, `role`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, '0986420512', '$2b$10$vGJ/OfKbNy.AHzKL/4KKWuaQajmlR9yENcyQevoeqgZ9L9KTa.r12', 'tungbv@gmail.com', 'Bui Van', 'Tung', 'male', '05/12/2001', 'user_1671284960657.png', 'driver', 'Bui Van Tung', 'on', '2022-12-17 13:49:20', '2022-12-17 13:49:20'),
	(2, '0123456789', '$2b$10$5xFgtYqWXvEH6Ge4LPqQu.fQInRS7X/EWC.kYyV7g7LvrmJWx74YW', 'hungdn@gmail.com', 'Dang Ngoc', 'Hung', 'male', '01/01/1980', 'user_1671285089102.jpg', 'manager', 'Dang Ngoc Hung', 'on', '2022-12-17 13:51:29', '2022-12-17 13:51:29'),
	(3, '0123456780', '$2b$10$IHaTj61UTANTbp7gX8rlkuwc7bzVwby777LvcTOPNmq9hUFUoa8uK', 'namvh@gmail.com', 'Vu Hoai', 'Nam', 'male', '02/03/1980', 'user_1671285138165.png', 'admin', 'Vu Hoai Nam', 'on', '2022-12-17 13:52:18', '2022-12-17 13:52:18'),
	(4, '0123456781', '$2b$10$C0Atk4Q.cG9yUSMoFouRi.Xg05D3hpwDY11EoVti0/kRYcMjmND1K', 'dungdq@gmail.com', 'Dang Quang', 'Dung', 'male', '15/02/2001', 'user_1671285304631.png', 'driver', 'Dang Quang Dung', 'on', '2022-12-17 13:55:04', '2022-12-17 13:55:04'),
	(5, '0123456782', '$2b$10$EalGAlvc13LBsJSUV3/f4uGhSCeX8LwZ2DCPz59cmyE3xrPH./3NG', 'anhvm@gmail.com', 'Vu Minh', 'Anh', 'male', '04/02/2001', 'user_1671285335485.png', 'driver', 'Vu Minh Anh', 'on', '2022-12-17 13:55:35', '2022-12-17 13:55:35'),
	(6, '0123456783', '$2b$10$fWPMlsIfdq.hWUDUI/dKTu/R7tRTV.JbKRaw5r7.sYvVMtEBrdzx2', 'huynq@gmail.com', 'Nguyen Quang', 'Huy', 'male', '05/06/2001', 'user_1671285443603.png', 'driver', 'Nguyen Quang Huy', 'on', '2022-12-17 13:57:23', '2022-12-17 13:57:23'),
	(7, '0123456784', '$2b$10$8BfbH8/EymCt5Bvuzprg6ewlwfNRu1yJl/XTZG.5iBlvqZWaP1XYy', 'tiennv@gmail.com', 'Nguyen Van', 'Tien', 'male', '15/08/1995', 'user_1671285535190.png', 'driver', 'Nguyen Van Tien', 'on', '2022-12-17 13:58:55', '2022-12-17 13:58:55');

-- Dumping structure for table map_ws_dev.adm_vehicle
CREATE TABLE IF NOT EXISTS `adm_vehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `engineHours` text,
  `engineId` text,
  `engineType` text,
  `model` text,
  `height` double DEFAULT NULL,
  `length` double DEFAULT NULL,
  `width` double DEFAULT NULL,
  `odometer` double DEFAULT NULL,
  `plate` text,
  `tonnage` double DEFAULT NULL,
  `image` text,
  `description` text,
  `status` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table map_ws_dev.adm_vehicle: ~5 rows (approximately)
INSERT INTO `adm_vehicle` (`id`, `engineHours`, `engineId`, `engineType`, `model`, `height`, `length`, `width`, `odometer`, `plate`, `tonnage`, `image`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, '1082730', 'edaHFt4ZTu', 'Petrol', 'The Mammoth from New Way', 2800, 7270, 2555, 324393, '30E-96169', 12550, 'vehicle_1671289194156.jpg', '', 'breakdown', '2022-12-17 14:59:54', '2022-12-17 20:44:30'),
	(2, '1010730', '6DaATgVNCA', 'Diesel', 'McNeilus Heavy-Duty Rear Loader', 2930, 5895, 2295, 123816, '30F-22222', 11712, 'vehicle_1671289331670.jpg', '', 'off', '2022-12-17 15:02:11', '2022-12-17 15:02:11'),
	(3, '1190730', 'rWGUVnfA3E', 'Petrol', 'McNeilus Split Body', 3240, 7525, 2490, 867401, '30A-12893', 12532, 'vehicle_1671289422858.jpg', '', 'off', '2022-12-17 15:03:42', '2022-12-17 15:03:42'),
	(4, '722730', 'jTYW2BU8JB', 'Petrol', 'Heil Powertrak Commercial Plus High Capacity Rear Loader', 3240, 9010, 2490, 984334, '64A-04075', 10471, 'vehicle_1671289494433.jpg', '', 'off', '2022-12-17 15:04:54', '2022-12-17 15:04:54'),
	(5, '1622730', 'EPLytG2E9G', 'Diesel', 'Amrep HX450 Automated Side Loader', 3005, 5700, 2495, 475665, '30E-92292', 14800, 'vehicle_1671289547420.jpg', '', 'off', '2022-12-17 15:05:47', '2022-12-17 15:05:47');

-- Dumping structure for table map_ws_dev.log_bin_state
CREATE TABLE IF NOT EXISTS `log_bin_state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `description` text,
  `status` text,
  `binId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `binId` (`binId`),
  CONSTRAINT `log_bin_state_ibfk_1` FOREIGN KEY (`binId`) REFERENCES `adm_bin` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table map_ws_dev.log_bin_state: ~0 rows (approximately)

-- Dumping structure for table map_ws_dev.log_vehicle_work
CREATE TABLE IF NOT EXISTS `log_vehicle_work` (
  `id` int NOT NULL AUTO_INCREMENT,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `altitude` double DEFAULT NULL,
  `speed` double DEFAULT NULL,
  `angle` double DEFAULT NULL,
  `odometer` double DEFAULT NULL,
  `engineHours` double DEFAULT NULL,
  `fuel` double DEFAULT NULL,
  `description` text,
  `status` text,
  `vehicleId` int DEFAULT NULL,
  `driverId` int DEFAULT NULL,
  `binStateId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicleId` (`vehicleId`),
  KEY `driverId` (`driverId`),
  KEY `binStateId` (`binStateId`),
  CONSTRAINT `log_vehicle_work_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `adm_vehicle` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `log_vehicle_work_ibfk_2` FOREIGN KEY (`driverId`) REFERENCES `adm_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `log_vehicle_work_ibfk_3` FOREIGN KEY (`binStateId`) REFERENCES `log_bin_state` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table map_ws_dev.log_vehicle_work: ~0 rows (approximately)

-- Dumping structure for table map_ws_dev.sup_vehicle_position
CREATE TABLE IF NOT EXISTS `sup_vehicle_position` (
  `id` int NOT NULL AUTO_INCREMENT,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `vehicleId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicleId` (`vehicleId`),
  CONSTRAINT `sup_vehicle_position_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `adm_vehicle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table map_ws_dev.sup_vehicle_position: ~5 rows (approximately)
INSERT INTO `sup_vehicle_position` (`id`, `latitude`, `longitude`, `vehicleId`, `createdAt`, `updatedAt`) VALUES
	(1, 21.021474, 105.850632, 1, '2022-12-17 14:59:54', '2022-12-17 14:59:54'),
	(2, 21.022259, 105.856313, 2, '2022-12-17 15:02:11', '2022-12-17 15:02:11'),
	(3, 21.026153, 105.850895, 3, '2022-12-17 15:03:42', '2022-12-17 15:03:42'),
	(4, 21.022617, 105.84677, 4, '2022-12-17 15:04:54', '2022-12-17 15:04:54'),
	(5, 21.026608, 105.844903, 5, '2022-12-17 15:05:47', '2022-12-17 15:05:47');

-- Dumping structure for table map_ws_dev.sup_vehicle_state
CREATE TABLE IF NOT EXISTS `sup_vehicle_state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `altitude` double DEFAULT NULL,
  `speed` double DEFAULT NULL,
  `angle` double DEFAULT NULL,
  `state` text,
  `description` text,
  `status` text,
  `vehicleId` int DEFAULT NULL,
  `driverId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicleId` (`vehicleId`),
  KEY `driverId` (`driverId`),
  CONSTRAINT `sup_vehicle_state_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `adm_vehicle` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sup_vehicle_state_ibfk_2` FOREIGN KEY (`driverId`) REFERENCES `adm_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table map_ws_dev.sup_vehicle_state: ~0 rows (approximately)

-- Dumping structure for table map_ws_dev.sup_vehicle_trouble
CREATE TABLE IF NOT EXISTS `sup_vehicle_trouble` (
  `id` int NOT NULL AUTO_INCREMENT,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `altitude` double DEFAULT NULL,
  `speed` double DEFAULT NULL,
  `angle` double DEFAULT NULL,
  `fuel` double DEFAULT NULL,
  `trouble` text,
  `description` text,
  `status` text,
  `vehicleId` int DEFAULT NULL,
  `driverId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicleId` (`vehicleId`),
  KEY `driverId` (`driverId`),
  CONSTRAINT `sup_vehicle_trouble_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `adm_vehicle` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sup_vehicle_trouble_ibfk_2` FOREIGN KEY (`driverId`) REFERENCES `adm_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table map_ws_dev.sup_vehicle_trouble: ~51 rows (approximately)
INSERT INTO `sup_vehicle_trouble` (`id`, `latitude`, `longitude`, `altitude`, `speed`, `angle`, `fuel`, `trouble`, `description`, `status`, `vehicleId`, `driverId`, `createdAt`, `updatedAt`) VALUES
	(1, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 19:58:38', '2022-12-17 19:58:38'),
	(2, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:05:02', '2022-12-17 20:05:02'),
	(3, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:05:24', '2022-12-17 20:05:24'),
	(4, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:05:26', '2022-12-17 20:05:26'),
	(5, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:05:26', '2022-12-17 20:05:26'),
	(6, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:05:39', '2022-12-17 20:05:39'),
	(7, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:08:48', '2022-12-17 20:08:48'),
	(8, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:09:28', '2022-12-17 20:09:28'),
	(9, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:13:24', '2022-12-17 20:13:24'),
	(10, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:14:03', '2022-12-17 20:14:03'),
	(11, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:15:05', '2022-12-17 20:15:05'),
	(12, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:16:14', '2022-12-17 20:16:14'),
	(13, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:19:31', '2022-12-17 20:19:31'),
	(14, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:19:37', '2022-12-17 20:19:37'),
	(15, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:21:22', '2022-12-17 20:21:22'),
	(16, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:23:36', '2022-12-17 20:23:36'),
	(17, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:24:52', '2022-12-17 20:24:52'),
	(18, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:25:06', '2022-12-17 20:25:06'),
	(19, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:25:58', '2022-12-17 20:25:58'),
	(20, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:26:28', '2022-12-17 20:26:28'),
	(21, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:26:42', '2022-12-17 20:26:42'),
	(22, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:27:03', '2022-12-17 20:27:03'),
	(23, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:27:08', '2022-12-17 20:27:08'),
	(24, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:27:11', '2022-12-17 20:27:11'),
	(25, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:27:11', '2022-12-17 20:27:11'),
	(26, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:27:38', '2022-12-17 20:27:38'),
	(27, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:30:06', '2022-12-17 20:30:06'),
	(28, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:30:20', '2022-12-17 20:30:20'),
	(29, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:30:21', '2022-12-17 20:30:21'),
	(30, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:30:53', '2022-12-17 20:30:53'),
	(31, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:31:10', '2022-12-17 20:31:10'),
	(32, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:32:07', '2022-12-17 20:32:07'),
	(33, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:33:18', '2022-12-17 20:33:18'),
	(34, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:35:36', '2022-12-17 20:35:36'),
	(35, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:35:47', '2022-12-17 20:35:47'),
	(36, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:36:27', '2022-12-17 20:36:27'),
	(37, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:37:14', '2022-12-17 20:37:14'),
	(38, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:03', '2022-12-17 20:44:03'),
	(39, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:21', '2022-12-17 20:44:21'),
	(40, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:28', '2022-12-17 20:44:28'),
	(41, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:28', '2022-12-17 20:44:28'),
	(42, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:28', '2022-12-17 20:44:28'),
	(43, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:28', '2022-12-17 20:44:28'),
	(44, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:28', '2022-12-17 20:44:28'),
	(45, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:29', '2022-12-17 20:44:29'),
	(46, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:29', '2022-12-17 20:44:29'),
	(47, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:29', '2022-12-17 20:44:29'),
	(48, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:29', '2022-12-17 20:44:29'),
	(49, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:29', '2022-12-17 20:44:29'),
	(50, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:29', '2022-12-17 20:44:29'),
	(51, 21.021474, 105.850632, 123, 123, 90, 102, 'car puncture', 'car puncture', 'breakdown', 1, 1, '2022-12-17 20:44:30', '2022-12-17 20:44:30');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
