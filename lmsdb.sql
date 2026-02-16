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
select * from courses;
update users set isEducator = false where clerk_id='user_38KaAKjXMxQpz804bP6L8bgWqry';

select * from course_detail;
desc course_detail;


select * from course_description;

alter table course_detail modify educator_id varchar(255) ;
truncate course_detail;

select * from course_detail;
select * from chapter;

select thumbnail_data from course_detail;

select course_id from course_detail;

select course_id,course_description,course_price,course_title,course_headings from course_detail;
-- courseId  //
-- courseTitle //
-- coursePrice //
-- isPublished
-- discount	
-- educatorId //
-- coursethumbnail //
select * from chapter;
desc chapter;
insert into chapter values(1,'test',1);
select * from enroll;
select * from course_detail;
delete  from enroll where enroll_id=20 OR enroll_id=19 OR enroll_id=18 OR enroll_id=17 OR enroll_id=16 OR enroll_id=15;
truncate enroll;
select course_id from enroll where user_id='user_37zQf8O6HsPTDshjnZWgXd3WVjb';
select count(enroll_id) from enroll where course_id = 8 AND email ='khushitemp559@gmail.com';
truncate chapter;
select * from chapter;
truncate lecture;
delete from course_detail where course_id = 4 OR course_id = 5 OR course_id = 6 OR course_id = 7 OR course_id = 8 OR course_id = 9 OR course_id = 10 OR e_id = 11 OR course_id = 12 ;
truncate course_detail;
select * from enroll;
truncate enroll;
delete from chapter where chapter_id = 1 OR chapter_id = 2 OR chapter_id = 3;
SET SQL_SAFE_UPDATES = 0;
DELETE FROM course_detail;
SET SQL_SAFE_UPDATES = 1;

select * from course_detail;
select * from chapter;
