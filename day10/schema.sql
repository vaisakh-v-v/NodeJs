drop schema if EXISTS booking_system cascade;


create schema booking_system;

create table booking_system.employees(
    employee_id int generated always as identity primary key,
    name varchar(30) not null,
    email varchar(266) unique,
    role varchar(20) check (role in ('admin', 'user'))
);

create table booking_system.categories(
    category_id int generated always as identity primary key,
    category varchar(20) UNIQUE not null
);

create table booking_system.maintenance_record(
    maintenance_id int generated always as identity primary key,
    equipment_id int references booking_system.equipments(equipment_id) on delete cascade
    last_maintenance_date date,
    record text[]
);

create table booking_system.equipments(
    equipment_id int generated always as identity primary key,
    name varchar(30) not null,
    description text,
    purchase_date date not null,
    category_id int references booking_system.categories(category_id) on delete cascade
);

create table booking_system.bookings(
    booking_id int generated always as identity primary key,
    employee_id int references booking_system.employees(employee_id) on delete cascade,
    equipment_id int references booking_system.equipments(equipment_id) on delete cascade,
    booking_date timestamptz default now(),
    start_date date not null,
    end_date date not null
);


create table booking_system.approvals(
    approval_id int generated always as identity primary key,
    employee_id int references booking_system.employees(emplloyee_id) on delete cascade,
    booking_id int references booking_system.bookings(booking_id) on delete cascade,
);


insert into booking_system.employees(name, email, role)
values
 ('vaisakh', 'vaisakh@gmail.com' 'user'),
 ('ranjith', 'ranjith@gmail.com' 'user'),
 ('abhi', 'pambi@gmail.com', 'admin');

 insert into booking_system.categories(category)
VALUES
('category a'),
('category b'),
('category c'),
('category d'),
('category e'),
('category f');

insert into booking_system.equipments(name, description, purchase_date, category_id)
values
('threadmill','cardio equipment', '2022-11-09', 1),
('smith-machine', 'squat equipment', '2023-01-31', 2),
('leg-extention machine', 'leg workout equipment', '2025-02-09', 2);
 
insert into booking_system.maintenance_record(equipment_id, last_maintenance_date, record)
VALUES
(1, '2026-01-01', ARRAY['regular maintenance', 'no issues']);
(2, null, array['']),
(3, '2026-03-08' array['fixed some cables', 'checked for wear and tear in the cables', 'regular maintenance']);

insert into booking_system.bookings(employee_id, last_maintainance_date, record)
VALUES
(1,1,'2023-03-30', '2023-04-20'),
(2,2, '2022-11-09', '2025-02-07');

insert into booking_system.approvals(employee_id, booking_id, comment)
values 
(3,1,'some comment');
