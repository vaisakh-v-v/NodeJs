begin;

select e.equipment_id, e.name, m.last_maintainance_date, m.record
from booking_system.equipments as e 
inner join booking_system.maintenance_record as m on m.equipment_id = e.equipment_id;

savepoint initial_state;

update eq_booking_system.equipments
set purchase_date = '2026-04-05'
where equipment_id = 4;

rollback to initial_state;
update booking_system.equations
set purchase_date = '2026-03-12'
where equipment_id = 4;

rollback to initial_state;

update booking_system.equipments
set purchase_date = '2025-01-03'
where equipment_id = 3

commit;