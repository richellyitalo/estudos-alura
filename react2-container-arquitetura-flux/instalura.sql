-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 17-Jul-2017 às 20:51
-- Versão do servidor: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `instalura`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `comentario`
--

CREATE TABLE `comentario` (
  `id` int(11) NOT NULL,
  `texto` varchar(255) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `comentario`
--

INSERT INTO `comentario` (`id`, `texto`, `usuario_id`) VALUES
(1, 'Material confined likewise it humanity raillery an unpacked as he. Three chief merit no if. Now how her edward engage not horses.', 1),
(2, 'Material confined likewise it humanity raillery an unpacked as he. Three chief merit no if. Now how her edward engage not horses.', 2),
(3, 'Material confined likewise it humanity raillery an unpacked as he. Three chief merit no if. Now how her edward engage not horses.', 3),
(4, 'Material confined likewise it humanity raillery an unpacked as he. Three chief merit no if. Now how her edward engage not horses.', 1),
(5, 'Material confined likewise it humanity raillery an unpacked as he. Three chief merit no if. Now how her edward engage not horses.', 2),
(6, 'Material confined likewise it humanity raillery an unpacked as he. Three chief merit no if. Now how her edward engage not horses.', 3),
(7, 'But why smiling man her imagine married. Chiefly can man her out believe manners cottage colonel unknown.', 1),
(8, 'But why smiling man her imagine married. Chiefly can man her out believe manners cottage colonel unknown.', 2),
(9, 'Must you with him from him her were more. In eldest be it result should remark vanity square. Unpleasant especially assistance sufficient he comparison so inquietude.', 3),
(10, 'aaaa', 1),
(11, 'abc', 1),
(12, 'comentando', 1),
(13, 'abc', 1),
(14, 'aaa', 1),
(15, 'teste', 1),
(16, 'Mais um comentário', 1),
(17, 'Comentando', 1),
(18, 'Eba, deu certo! #iamprogramming', 1),
(19, 'Mais um comentário com #listar', 1),
(20, 'Comentando o comentário', 1),
(21, 'Teste', 1),
(22, 'Torre', 1),
(23, 'Comentei, ihuu', 1),
(24, 'testei', 1),
(25, 'testei de novo', 1),
(26, 'Comentei', 1),
(27, 'COmentando outra foto', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `foto`
--

CREATE TABLE `foto` (
  `id` int(11) NOT NULL,
  `comentario` varchar(255) NOT NULL,
  `instante` tinyblob,
  `url` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `foto`
--

INSERT INTO `foto` (`id`, `comentario`, `instante`, `url`, `usuario_id`) VALUES
(1, 'comentario da foto', 0xaced00057372000d6a6176612e74696d652e536572955d84ba1b2248b20c00007870770e05000007e1070f0e37060c65d40078, 'https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-15/e35/14482111_1635089460122802_8984023070045896704_n.jpg?ig_cache_key=MTM1MzEzNjM4NzAxMjIwODUyMw%3D%3D.2', 1),
(2, 'comentario da foto', 0xaced00057372000d6a6176612e74696d652e536572955d84ba1b2248b20c00007870770e05000007e1070f0e37060c65d40078, 'https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2', 1),
(3, 'comentario da foto', 0xaced00057372000d6a6176612e74696d652e536572955d84ba1b2248b20c00007870770e05000007e1070f0e370615d0b78078, 'https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-15/e35/14482111_1635089460122802_8984023070045896704_n.jpg?ig_cache_key=MTM1MzEzNjM4NzAxMjIwODUyMw%3D%3D.2', 2),
(4, 'comentario da foto', 0xaced00057372000d6a6176612e74696d652e536572955d84ba1b2248b20c00007870770e05000007e1070f0e370615d0b78078, 'https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2', 2),
(5, 'comentario da foto', 0xaced00057372000d6a6176612e74696d652e536572955d84ba1b2248b20c00007870770e05000007e1070f0e3706162c450078, 'https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-15/e35/14482111_1635089460122802_8984023070045896704_n.jpg?ig_cache_key=MTM1MzEzNjM4NzAxMjIwODUyMw%3D%3D.2', 3),
(6, 'comentario da foto', 0xaced00057372000d6a6176612e74696d652e536572955d84ba1b2248b20c00007870770e05000007e1070f0e3706162c450078, 'https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2', 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `foto_comentarios`
--

CREATE TABLE `foto_comentarios` (
  `foto_id` int(11) NOT NULL,
  `comentarios_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `foto_comentarios`
--

INSERT INTO `foto_comentarios` (`foto_id`, `comentarios_id`) VALUES
(1, 2),
(1, 1),
(2, 3),
(3, 24),
(4, 8),
(5, 6),
(6, 21),
(4, 5),
(5, 9),
(3, 19),
(3, 18),
(3, 17),
(3, 16),
(3, 15),
(3, 14),
(3, 13),
(3, 12),
(3, 11),
(3, 10),
(4, 25),
(6, 7),
(6, 22),
(1, 23),
(3, 4),
(4, 20),
(3, 26),
(4, 27);

-- --------------------------------------------------------

--
-- Estrutura da tabela `foto_likers`
--

CREATE TABLE `foto_likers` (
  `foto_id` int(11) NOT NULL,
  `likers_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `foto_likers`
--

INSERT INTO `foto_likers` (`foto_id`, `likers_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 3),
(3, 1),
(3, 2),
(4, 1),
(5, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `url_foto_perfil` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `login`, `senha`, `url_foto_perfil`) VALUES
(1, 'alots', '123456', 'https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-19/11199408_569104449895751_1837574990_a.jpg'),
(2, 'rafael', '123456', 'https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-19/s150x150/12599387_1591433254512484_973178862_a.jpg'),
(3, 'vitor', '123456', 'https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-19/11348357_521348038019129_1965512179_a.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_amigos`
--

CREATE TABLE `usuario_amigos` (
  `usuario_id` int(11) NOT NULL,
  `amigos_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario_amigos`
--

INSERT INTO `usuario_amigos` (`usuario_id`, `amigos_id`) VALUES
(1, 2),
(1, 3),
(2, 3),
(3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKixspmid2pb85o8ypsd20jakxg` (`usuario_id`);

--
-- Indexes for table `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkeyss3i39o47lj7jctjqpwai2` (`usuario_id`);

--
-- Indexes for table `foto_comentarios`
--
ALTER TABLE `foto_comentarios`
  ADD UNIQUE KEY `UK_q7n6ell78v39kt5e3ft1jjica` (`comentarios_id`),
  ADD KEY `FK63njju1kpwp9v7rddj9tphtnr` (`foto_id`);

--
-- Indexes for table `foto_likers`
--
ALTER TABLE `foto_likers`
  ADD PRIMARY KEY (`foto_id`,`likers_id`),
  ADD KEY `FK7krtysepu5keme216xktlx8pw` (`likers_id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario_amigos`
--
ALTER TABLE `usuario_amigos`
  ADD PRIMARY KEY (`usuario_id`,`amigos_id`),
  ADD KEY `FK78dfuay1npvomfdwyjk49iu8h` (`amigos_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `foto`
--
ALTER TABLE `foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
