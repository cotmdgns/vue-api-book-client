CREATE TABLE member(
	mem_no INT PRIMARY KEY auto_increment,
    mem_id VARCHAR(50) NOT NULL UNIQUE,
    mem_pwd VARCHAR(255) NOT NULL,
    mem_name VARCHAR(50) NOT NULL,
    email VARCHAR(50)
);

CREATE TABLE book_info(
	book_no INT PRIMARY KEY auto_increment,
    mem_no INT ,
	book_title VARCHAR(255),
    book_author VARCHAR(255),
    book_image VARCHAR(255),
    book_link VARCHAR(255),
    book_isbn VARCHAR(255)
)


SELECT * FROM member;
SELECT * FROM book_info;

DELETE FROM book_info 
WHERE mem_no = 1 AND book_isbn = '9791141601713';

DROP TABLE member;
DROP TABLE book_info;

select * from member where mem_pwd = 123 and mem_id = 123;