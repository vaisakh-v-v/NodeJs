select status, count(*) from ticket_system.tickets group by status;

select users.name as Assignee, count(*)
from ticket_system.assignments
INNER JOIN ticket_system.users on users.user_id = assignments.user_id
GROUP BY users.name
ORDER BY users.name;

-- Customers with more than five open tickets.
SELECT * 
FROM ticket_system.customers 
WHERE customers.customer_id in (
    SELECT tickets.customer_id 
    FROM ticket_system.tickets
    GROUP BY customer_id
    HAVING count(*) > 5
);
-- Returns an empty table 

-- Users with no assigned tickets.


select * 
from ticket_system.users 
where users.user_id not in (
    select assignments.user_id 
    from ticket_system.assignments
    GROUP BY user_id
);

-- Oldest unresolved ticket.

select ticket_id 
from ticket_system.tickets
where status = 'pending'
ORDER BY created_at;

-- Counts by category and priority.
-- used right join to get all categories from categories table and show there respective count

select categories.category, count(tickets.category_id)
from ticket_system.tickets
right join ticket_system.categories on tickets.category_id = categories.category_id
group by categories.category
order by count(tickets.ticket_id) desc;

select priority, count(*)
from ticket_system.tickets
group by priority
ORDER BY array_position(ARRAY['high', 'medium', 'low'], priority);