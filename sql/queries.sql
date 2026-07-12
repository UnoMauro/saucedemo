/*ENTREGABLES*/

CREATE TABLE teams (
  team_id INT PRIMARY KEY,
  name VARCHAR(100),
  country VARCHAR(50),
  league VARCHAR(50)
);

CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  country VARCHAR(50)
);

CREATE TABLE jerseys (
  jersey_id INT PRIMARY KEY,
  team_id INT REFERENCES teams(team_id),
  type VARCHAR(20),
  price DECIMAL(10,2),
  season VARCHAR(10)
);

CREATE TABLE inventory (
  inventory_id INT PRIMARY KEY,
  jersey_id INT REFERENCES jerseys(jersey_id),
  size VARCHAR(5),
  quantity INT
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT REFERENCES customers(customer_id),
  order_date DATE,
  total DECIMAL(10,2),
  status VARCHAR(20)
);

CREATE TABLE order_items (
  item_id INT PRIMARY KEY,
  order_id INT REFERENCES orders(order_id),
  jersey_id INT REFERENCES jerseys(jersey_id),
  quantity INT,
  price DECIMAL(10,2)
);
 

INSERT INTO teams VALUES
(1, 'Real Madrid', 'España', 'La Liga'),
(2, 'Barcelona', 'España', 'La Liga'),
(3, 'Manchester City', 'Inglaterra', 'Premier League'),
(4, 'Bayern Munich', 'Alemania', 'Bundesliga'),
(5, 'PSG', 'Francia', 'Ligue 1');
INSERT INTO customers VALUES
(1, 'Mauro Mora', 'mauro@test.com', 'Mexico'),
(2, 'Andre Gignac', 'gignac@test.com', 'Francia'),
(3, 'Leo Messi', 'messi@test.com', 'Argentina'),
(4, 'CR7', 'cr7@test.com', 'Portugal'),
(5, 'Neymar Jr', 'neymar@test.com', 'Brasil');
INSERT INTO jerseys VALUES
(1, 1, 'Local', 819.99, '2025-26'),
(2, 1, 'Visita', 824.99, '2025-26'),
(3, 2, 'Local', 794.99, '2025-26'),
(4, 2, 'Visita', 744.99, '2025-26'),
(5, 3, 'Local', 964.99, '2025-26'),
(6, 4, 'Local', 779.99, '2025-26'),
(7, 5, 'Local', 874.99, '2025-26');
INSERT INTO inventory VALUES
(1, 1, 'S', 10),
(2, 1, 'M', 15),
(3, 1, 'L', 8),
(4, 2, 'M', 5),
(5, 3, 'L', 12),
(6, 4, 'S', 3),
(7, 5, 'XL', 20);
INSERT INTO orders VALUES
(1, 1, '2026-01-15', 174.98, 'completed'),
(2, 2, '2026-02-10', 84.99, 'completed'),
(3, 3, '2026-03-05', 94.99, 'pending'),
(4, 4, '2026-04-01', 159.98, 'completed'),
(5, 5, '2026-05-20', 79.99, 'cancelled');
INSERT INTO order_items VALUES
(1, 1, 1, 1, 10.99),
(2, 1, 2, 1, 20.99),
(3, 2, 7, 1, 40.99),
(4, 3, 5, 1, 999994.99),
(5, 4, 3, 1, 739.99),
(6, 4, 4, 1, 274.99),
(7, 5, 6, 1, 1179.99);


/*select * from teams*/

/*EJEMPLO INNER*/
select 
t.name AS EQUIPO,
j.type AS TIPO,
j.price AS PRECIO,
j.season AS TEMPORADA
from jerseys j INNER JOIN teams t ON j.team_id = t.team_id 


/*EJEMPLO LEFT JOIN*/
select 
t.name AS EQUIPO,
SUM(i.quantity) AS TOTAL
from teams t
LEFT JOIN jerseys j ON t.team_id = j.team_id 
LEFT JOIN inventory i ON j.jersey_id = i.jersey_id 
GROUP BY t.Name 


/*EJEMPLO GROUP BY*/

select 
t.name AS EQUIPO,
SUM(i.quantity) AS TOTAL
from inventory i
INNER JOIN jerseys j ON i.jersey_id = j.jersey_id 
INNER JOIN teams t ON j.team_id = t.team_id 
GROUP BY t.Name 

/*EJEMPLO HAVING*/
select 
t.name AS EQUIPO,
SUM(i.quantity) AS TOTAL
from inventory i
INNER JOIN jerseys j ON i.jersey_id = j.jersey_id 
INNER JOIN teams t ON j.team_id = t.team_id 
GROUP BY t.Name 
HAVING SUM(i.quantity) > 10


/*EJEMPLO WHERE*/
select 
t.name AS EQUIPO,
j.type AS TIPO,
j.price AS PRECIO,
j.season AS TEMPORADA
from jerseys j 
INNER JOIN teams t ON j.team_id = t.team_id 
WHERE j.price > (SELECT AVG(PRICE) FROM jerseys)


/*EJEMPLO FUNCTIONS*/
select 
t.name AS EQUIPO,
j.type AS TIPO,
j.price AS PRECIO,
RANK () OVER (PARTITION by t.name ORDER BY j.price DESC) AS RANGO_PRECIO
from jerseys j  
INNER JOIN teams t ON j.team_id = t.team_id 



/*EJEMPLO COMMON*/
WITH TopJerseys AS(
select 
t.name AS EQUIPO,
j.type AS TIPO,
j.price AS PRECIO
from jerseys j  
INNER JOIN teams t ON j.team_id = t.team_id 
WHERE j.price > 200
)
select * from  TopJerseys 
order by price DESC 
