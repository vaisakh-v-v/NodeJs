create table customers(
    customer_id int generated always as identity primary key,
    name varchar(36),
    email varchar(255) unique
);

create table categories(
    category_id int generated always as identity primary key,
    category varchar(36) unique
);

create table users(
    user_id int generated always as identity primary key,
    name varchar(36),
    email varchar(255) unique
);

create table tickets(
    ticket_id int generated always as identity primary key,
    title varchar(36),
    description text,
    priority varchar(10),
    status varchar(10),
    customer_id int references customers(customer_id),
    category_id int references categories(category_id)
);

create table assignments(
    id int generated always as identity  primary key,
    ticket_id int references tickets(ticket_id),
    user_id int references users(user_id)
);

create table status_history(
    status_id int generated always as identity primary key,
    ticket_id int references tickets(ticket_id),
    previous_status_array text[],
    updated_by int references users(user_id)
);

create table comments(
    comment_id int generated always as identity primary key,
    text text,
    author varchar(36),
    ticket_id int references tickets(ticket_id)
);