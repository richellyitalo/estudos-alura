-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.17-log - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.4.0.5145
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura para tabela cdc_react.autor
DROP TABLE IF EXISTS `autor`;
CREATE TABLE IF NOT EXISTS `autor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cdc_react.autor: ~5 rows (aproximadamente)
DELETE FROM `autor`;
/*!40000 ALTER TABLE `autor` DISABLE KEYS */;
INSERT INTO `autor` (`id`, `email`, `nome`, `senha`) VALUES
	(1, 'rcrawford0@businessweek.com', 'Crawford', '2JUFp3bMsSUw');
INSERT INTO `autor` (`id`, `email`, `nome`, `senha`) VALUES
	(2, 'dyoung1@twitpic.com', 'Young', 'SsTFfx0qo4');
INSERT INTO `autor` (`id`, `email`, `nome`, `senha`) VALUES
	(3, 'bhoward2@webnode.com', 'Howard', 'lMgRZTy');
INSERT INTO `autor` (`id`, `email`, `nome`, `senha`) VALUES
	(4, 'scox3@123-reg.co.uk', 'Cox', 'j3Plr0kaThg');
INSERT INTO `autor` (`id`, `email`, `nome`, `senha`) VALUES
	(5, 'crichardson4@adobe.com', 'Richardson', 'kJk8cFsmqXNb');
/*!40000 ALTER TABLE `autor` ENABLE KEYS */;

-- Copiando estrutura para tabela cdc_react.livro
DROP TABLE IF EXISTS `livro`;
CREATE TABLE IF NOT EXISTS `livro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `preco` decimal(19,2) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_jiba630fqnramd9goavw4xor0` (`autor_id`),
  CONSTRAINT `FK_jiba630fqnramd9goavw4xor0` FOREIGN KEY (`autor_id`) REFERENCES `autor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cdc_react.livro: ~15 rows (aproximadamente)
DELETE FROM `livro`;
/*!40000 ALTER TABLE `livro` DISABLE KEYS */;
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(1, 31.41, 'Overhold', 5);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(2, 98.63, 'Tin', 3);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(3, 39.94, 'Y-find', 3);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(4, 27.26, 'Job', 4);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(5, 16.68, 'Zaam-Dox', 1);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(6, 47.03, 'Tresom', 5);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(7, 57.09, 'Andalax', 3);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(8, 9.46, 'Pannier', 5);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(9, 5.74, 'Hatity', 3);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(10, 60.24, 'Y-Solowarm', 2);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(11, 43.78, 'Ventosanzap', 5);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(12, 7.43, 'Zontrax', 4);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(13, 41.70, 'Hatity', 4);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(14, 55.99, 'Sonsing', 5);
INSERT INTO `livro` (`id`, `preco`, `titulo`, `autor_id`) VALUES
	(15, 58.61, 'Mat Lam Tam', 4);
/*!40000 ALTER TABLE `livro` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
