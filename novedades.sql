-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 28-03-2023 a las 19:44:22
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ropa deportiva-energia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

DROP TABLE IF EXISTS `novedades`;
CREATE TABLE IF NOT EXISTS `novedades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` text NOT NULL,
  `cuerpo` text NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `titulo`, `subtitulo`, `cuerpo`, `img_id`) VALUES
(1, '2 X 1 EN PRODUCTOS SELECCIONADOS', 'Accede ya a tu promocion es por tiempo limitado', 'No te pierdas esta promoción de 2 X 1 en productos seleccionados, compra 2 productos y te llevas gratis el de menor valor. Válido desde el 27/3 hasta 27/4 o hasta agotar stock. Exclusivo para pagos en efectivos. Promoción no valida para tarjetas de crédito. No acumulable con otras promociones.', 'y8pcsffgoxxpirqji80f'),
(2, '10% de descuento en toda la tienda', 'solo valido para los dias viernes del mes de Abril', '​PROMOCIÓN VALIDA CON TODOS LO MEDIOS DE PAGO. TOPE  DE REINTEGRO $400 POR CLIENTE APLICABLE A LA PRIMERA COMPRA POR VIERNES. EL DESCUENTO SE VERÁ REFLEJADO EN HASTA DOS RESÚMENES POSTERIORES EN CASO DEL PAGO SEA CON TARJETAS DE CREDITO. BENEFICIO VÁLIDO HASTA EL 30/04/2023. NO ACUMULABLE CON OTRAS PROMOCIONES', 'lmyzqqrbqkqywfzq93wq'),
(3, 'LLEGAMOS A LOS 10K EN INSTAGRAM', 'Gracias por elegirnos!!', 'Queremos agradecer a todos por confiar en nuestros productos. Esten atentos que vamos a largar un super sorteo. Gracias nuevamente.', 'ihpg5j0se7j8lz3ssqjp'),
(4, 'NUEVA COLECCION DE OTOÑO', 'Ya ingreso la nueva colección de OTOÑO', 'No te lo podes perder!!!', 'whmcq0j7rcytqd7mddup');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
