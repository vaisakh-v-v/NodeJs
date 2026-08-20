select * from ticket_system.assignments;
--  assignement_id | ticket_id | user_id 
-- ----------------+-----------+---------
--               1 |         1 |       1
--               2 |         2 |       2

select * from ticket_system.customers;
--  customer_id |  name   |        email        
-- -------------+---------+---------------------
--            1 | vaisakh | vaisakh@example.com
--            2 | ranjith | ranjith@example.com

select title, description, priority, status from ticket_system.tickets;
--       title      |                    description                    | priority | status  
-- -----------------+---------------------------------------------------+----------+---------
--  refund request  | forgot to turn off the auto-pay                   | high     | pending
--  forgot passward | unable to updat my passward using forget passward | medium   | pending

update ticket_system.tickets 
set status = 'completed' 
where ticket_id = 1;
-- UPDATE 1

update ticket_system.tickets
set status = 'completed'
where ticket_id = 2;
-- UPDATE 1

select * from ticket_system.tickets;
-- ticket_id |      title      |                    description                    | priority |  status   | customer_id | category_id 
-- -----------+-----------------+---------------------------------------------------+----------+-----------+-------------+-------------
--          1 | refund request  | forgot to turn off the auto-pay                   | high     | completed |           1 |           1
--          2 | forgot passward | unable to updat my passward using forget passward | medium   | completed |           2 |           2


select * from ticket_system.users limit 2;
--  user_id | name  |       email       
-- ---------+-------+-------------------
--        1 | user1 | user1@example.com
--        2 | user2 | user2@example.com

select * from ticket_system.tickets
ORDER BY priority desc;
--  ticket_id |      title      |                    description                    | priority |  status   | customer_id | category_id 
-- -----------+-----------------+---------------------------------------------------+----------+-----------+-------------+-------------
--          2 | forgot passward | unable to updat my passward using forget passward | medium   | completed |           2 |           2
--          1 | refund request  | forgot to turn off the auto-pay                   | high     | completed |           1 |           1

select * from ticket_system.tickets
ORDER BY priority;

-- ticket_id |      title      |                    description                    | priority |  status   | customer_id | category_id 
-- -----------+-----------------+---------------------------------------------------+----------+-----------+-------------+-------------
--          1 | refund request  | forgot to turn off the auto-pay                   | high     | completed |           1 |           1
--          2 | forgot passward | unable to updat my passward using forget passward | medium   | completed |           2 |           2

delete from ticket_system.users
where user_id = 3;
-- DELETE 1

select * from ticket_system.users;
--  user_id | name  |       email       
-- ---------+-------+-------------------
--        1 | user1 | user1@example.com
--        2 | user2 | user2@example.com