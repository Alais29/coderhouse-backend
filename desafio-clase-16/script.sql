create database prueba;

use prueba;

create table items (id INT primary key auto_increment not null, nombre VARCHAR(20) not null, categoria VARCHAR(20) not null, stock int unsigned);

insert into items (nombre, categoria, stock) values 
('Fideos', 'Harina', 20),
('Leche', 'Lácteos', 30),
('Crema', 'Lácteos', 15);

select * from items;

delete from items where id=1;

update items set stock=45 where id=2;

select * from items;