DROP SCHEMA if exists ticket_system CASCADE;

------------------CREATION---------------------------

CREATE SCHEMA ticket_system;

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
    category_id int references ticket_system.categories(category_id) on delete cascade,
    created_at timestamptz default now(),
    assignee varchar(36),
    customer varchar(36) not null
);

------------------SEEDING---------------------------

INSERT INTO ticket_system.categories ("category")
VALUES ( 'Billing & Payments');
INSERT INTO ticket_system.categories ("category")
VALUES ( 'Technical Support & Bugs');
INSERT INTO ticket_system.categories ("category")
VALUES ( 'Account & Access Management');
INSERT INTO ticket_system.categories ("category")
VALUES ( 'General Inquiries');
INSERT INTO ticket_system.categories ("category")
VALUES ( 'Feature Requests');