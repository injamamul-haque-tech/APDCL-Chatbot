-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2023 at 06:27 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `6th_sem_internship_apdcl`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `consumer_number` int(11) NOT NULL,
  `recharge_btn` int(11) DEFAULT 0,
  `prepaid_bill_btn` int(11) DEFAULT 0,
  `postpaid_bill_btn` int(11) DEFAULT 0,
  `tips_btn` int(11) DEFAULT 0,
  `update_mobile_number_btn` int(11) DEFAULT 0,
  `lodge_complaint_btn` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`consumer_number`, `recharge_btn`, `prepaid_bill_btn`, `postpaid_bill_btn`, `tips_btn`, `update_mobile_number_btn`, `lodge_complaint_btn`) VALUES
(230700, 6, 3, 0, 2, 0, 1),
(230701, 1, 1, 0, 5, 1, 1),
(230702, 0, 0, 1, 0, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `bill_number` int(4) NOT NULL,
  `consumer_number` int(6) DEFAULT NULL,
  `amount_paid` int(5) DEFAULT NULL,
  `due_amount` int(5) DEFAULT NULL,
  `bill_date` date NOT NULL,
  `due_date` date NOT NULL,
  `transaction_mode` varchar(8) DEFAULT NULL,
  `transaction_id` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`bill_number`, `consumer_number`, `amount_paid`, `due_amount`, `bill_date`, `due_date`, `transaction_mode`, `transaction_id`) VALUES
(101, 230702, 850, 800, '2023-03-17', '2023-03-31', 'online', 'T02'),
(102, 230700, 1000, 700, '2023-03-23', '2023-03-31', 'online', 'T03'),
(103, 230702, 500, 500, '2023-05-05', '2023-05-31', 'online', 'T01'),
(104, 230702, 200, 700, '2023-06-02', '2023-06-30', 'online', 'T04'),
(105, 230702, 4000, 4000, '2023-07-20', '2023-07-31', 'cash', 'T05'),
(106, 230700, 670, 200, '2023-04-12', '2023-04-30', 'online', 'T06'),
(107, 230700, 1350, 1200, '2023-02-25', '2023-02-28', 'cash', 'T07');

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `complaint_number` int(3) NOT NULL,
  `consumer_number` int(6) DEFAULT NULL,
  `complaint_details` varchar(100) DEFAULT NULL,
  `complaint_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`complaint_number`, `consumer_number`, `complaint_details`, `complaint_date`) VALUES
(101, 230700, 'My meter shows Incorrect readings', '2023-07-08'),
(102, 230701, 'My meter shows Incorrect readings', '2023-07-10'),
(103, 230702, 'There was a payment error in my last payment', '2023-07-20'),
(104, 230702, 'Voltage fluctuation in my electricity connection', '2023-07-30');

-- --------------------------------------------------------

--
-- Table structure for table `electric_connection`
--

CREATE TABLE `electric_connection` (
  `meter_number` int(11) NOT NULL,
  `connected_load` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `electric_connection`
--

INSERT INTO `electric_connection` (`meter_number`, `connected_load`) VALUES
(30010050, '10.00'),
(30010051, '10.00'),
(30010052, '8.50');

-- --------------------------------------------------------

--
-- Table structure for table `tips`
--

CREATE TABLE `tips` (
  `tip_number` int(2) NOT NULL,
  `tip_details` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tips`
--

INSERT INTO `tips` (`tip_number`, `tip_details`) VALUES
(0, 'Spread awareness among family members about electrical safety'),
(1, 'Replace the CFL or halogen bulbs to energy efficient LED bulbs'),
(2, 'Switch off electrical appliances when not in use'),
(3, 'Try using natural lighting during the day'),
(4, 'Plant trees for shade and do regular maintenance of electrical equipments'),
(5, 'Faulty or outdated wiring can pose serious risks, so ensure proper wiring'),
(6, 'Ensure proper earthing at your house'),
(7, 'Avoid overloading electrical circuits by not plugging too many appliances into single outlet'),
(8, 'Ensure that all electrical outlets and switches are in good condition'),
(9, 'Keep electrical devices away from water & never touch switches/outlets with wet hands');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `consumer_number` int(6) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `mobile_number` varchar(11) DEFAULT NULL,
  `user_connection_type` varchar(100) NOT NULL,
  `meter_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`consumer_number`, `name`, `address`, `mobile_number`, `user_connection_type`, `meter_number`) VALUES
(230700, 'Deepa Choudhury', 'HNo: 22, Fatasil Ambari, Guwahati', '9876514267', 'prepaid', 30010052),
(230701, 'Upama Das', 'HNo: 13, Beltola, Guwahati ', '7890152673', 'prepaid', 30010050),
(230702, 'Kapil ', 'HNo: 31, Maligaon, Guwahati', '9954276100', 'postpaid', 30010051);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`consumer_number`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`bill_number`),
  ADD KEY `consumer_number` (`consumer_number`);

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`complaint_number`),
  ADD KEY `consumer_number` (`consumer_number`);

--
-- Indexes for table `electric_connection`
--
ALTER TABLE `electric_connection`
  ADD PRIMARY KEY (`meter_number`);

--
-- Indexes for table `tips`
--
ALTER TABLE `tips`
  ADD PRIMARY KEY (`tip_number`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`consumer_number`),
  ADD KEY `meter_number` (`meter_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `bill_number` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `complaint_number` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `electric_connection`
--
ALTER TABLE `electric_connection`
  MODIFY `meter_number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30010053;

--
-- AUTO_INCREMENT for table `tips`
--
ALTER TABLE `tips`
  MODIFY `tip_number` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `consumer_number` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=230703;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`consumer_number`) REFERENCES `user` (`consumer_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`consumer_number`) REFERENCES `user` (`consumer_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`consumer_number`) REFERENCES `user` (`consumer_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`meter_number`) REFERENCES `electric_connection` (`meter_number`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
