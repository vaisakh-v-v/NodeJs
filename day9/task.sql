begin;
insert into ticket_system.assignments("ticket_id", "user_id")
values(2,2);

savepoint assigned;

update ticket_system.tickets
set status = 'assigned'
where tickets.ticket_id = 2;

savepoint ticket_status_updated;

update ticket_system.tickets
set priority = 'very low'
where ticket_id = 2;

rollback to ticket_status_updated;

update ticket_system.status_history
set previous_status_array = array_append(previous_status_array, 'assigned to user3')
where ticket_id = 2;

savepoint status_history_updated;

insert into ticket_system.comments("text", "author", "ticket_id")
values('hi, this is Ranjith, please check your messages and email for the validation purpose we will be sendig you a link soon', 'system', 2);

commit;




