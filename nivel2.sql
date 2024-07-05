-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-07-2024 a las 00:55:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nivel2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nombre`, `apellidos`, `email`, `password`, `direccion`, `dni`, `edad`, `fecha_creacion`, `telefono`) VALUES
(1, 'Juan', 'Pérez Gómez', 'juan.perez@example.com', '123', 'Calle Falsa 123', '12345678A', 30, '2024-01-01 00:00:00', '123456789'),
(2, 'María', 'Rodríguez López', 'maria.rodriguez@example.com', 'estebanl123', 'Avenida Siempre Viva 456', '87654321B', 25, '2024-02-01 00:00:00', '987654321'),
(3, 'Luis', 'Martínez Sánchez', 'luis.martinez@example.com', 'manuel123', 'Plaza Mayor 789', '11223344C', 35, '2024-03-01 00:00:00', '564738291'),
(4, 'Ana', 'García Fernández', 'ana.garcia@example.com', 'kiara123', 'Calle Luna 101', '22334455D', 28, '2024-04-01 00:00:00', '112233445'),
(5, 'Carlos', 'López Martínez', 'carlos.lopez@example.com', 'pablo1234', 'Avenida Sol 202', '33445566E', 32, '2024-05-01 00:00:00', '223344556');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
