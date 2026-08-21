DROP SCHEMA if exists ticket_system CASCADE;

----------------------------------------------------Creation--------------------------------------------

CREATE SCHEMA ticket_system;

create table ticket_system.customers (
    customer_id int generated always as identity primary key,
    name varchar(36) not null,
    email varchar(255) unique
);

create table ticket_system.users (
    user_id int generated always as identity primary key,
    name varchar(36) not null,
    email varchar(255) unique
);

create table ticket_system.categories (
    category_id int generated always as identity primary key,
    category varchar(36) not null
);

create table ticket_system.tickets(
    ticket_id int generated always as identity primary key,
    title varchar(255) not null,
    description text not null,
    priority varchar(10) CHECK ( priority in ('low', 'medium', 'high')),
    status varchar(10) not null,
    customer_id int references ticket_system.customers(customer_id) on DELETE cascade,
    category_id int references ticket_system.categories(category_id) on delete cascade,
    created_at timestamptz default now()
);

create table ticket_system.comments(
    comment_id int generated always as identity primary key,
    text text not null,
    author varchar(36) not null,
    ticket_id int references ticket_system.tickets(ticket_id) on delete cascade
);

create table ticket_system.assignments(
    assignement_id int generated always as identity primary key,
    ticket_id int references ticket_system.tickets(ticket_id) on delete cascade,
    user_id int references ticket_system.users(user_id) on delete cascade
);

create table ticket_system.status_history(
    status_id int generated always as identity primary key,
    ticket_id int references ticket_system.tickets(ticket_id) on delete cascade,
    previous_status_array text[],
    updated_by int references ticket_system.users(user_id) on delete cascade
);


insert into ticket_system.customers("name", "email")
values
('vaisakh', 'vaisakh@example.com'),
('ranjith', 'ranjith@example.com');

insert into ticket_system.users("name", "email")
VALUES
('user1', 'user1@example.com'),
('user2', 'user2@example.com'),
('system', 'system@example.com');

insert into ticket_system.categories("category")
VALUES 
('billing & payments'),
('techinical support'),
('Account and Access management'),
('General Inquiries'),
('Feature Request');

insert into ticket_system.tickets("title", "description", "priority", "status", "customer_id", "category_id")
VALUES
('refund request', 'forgot to turn off the auto-pay', 'high', 'pending' , 1, 1),
('forgot passward', 'unable to updat my passward using forget passward', 'medium', 'pending', 2, 2);

insert into ticket_system.comments("text", "author", "ticket_id")
VALUES
('Thakyou, hi Vaisakh I am user1 who is assigned to process your request the refund process have been started and you will get your refund within 3-5 working days', 'user1', 1),
('Product requirment not met', 'vaisakh', 1),
('Kindly specify user requirment', 'user1', 1),
('Implemetn a hamburger that has all necessary components and values', 'vaisakh', 1),
('Thanks for the information. the refund process has been completed the money will be credited to you bank-account in 2 days do you have any other querry', 'user1', 1),
('No, Thank you', 'vaisakh', 1);

insert into ticket_system.assignments("ticket_id", "user_id")
values
(1,1);

insert into ticket_system.status_history("ticket_id", "previous_status_array", "updated_by")
VALUES
(1, array['assignment left', 'assigned to user1', 'issue enquired by user1', 'issue resolurion process started by user1'], 1),
(2, array['assignment left'], 3);