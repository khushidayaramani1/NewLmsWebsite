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
