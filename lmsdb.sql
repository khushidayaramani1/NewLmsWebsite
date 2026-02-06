use  lmswebsite;
select * from users;
create table studentPaymentDetail(
	userId bigint,
    foreign key (userId) references users(user_id),
    userEmail varchar(255),
    cardNo varchar(255),
    ExpiryDate varchar(255),
    cvc varchar(3)
);
drop table studentPaymentDetail;
desc users;
select * from enroll;
alter table enroll drop column card_number;

delete  from enroll where enroll_id=1 or enroll_id=2 or enroll_id=3;

select course_id from enroll where user_id='user_38KaAKjXMxQpz804bP6L8bgWqry';

select * from enroll;

select user_id,course_id from enroll;

select * from users;

select * from courses;

 SELECT 
  u.user_name,
  c.course_title
FROM enroll e
JOIN users u ON e.user_id = u.user_id
JOIN course c ON e.course_id = c.course_id;

desc users;

SELECT u.user_name, c.course_title FROM enroll e JOIN users u ON e.user_id = u.clerk_id JOIN courses c ON e.course_id = c.id;

ALTER TABLE users 
ADD COLUMN isStudent BOOLEAN DEFAULT true;

alter table users drop column isStudent;

select * from users;
truncate users;





