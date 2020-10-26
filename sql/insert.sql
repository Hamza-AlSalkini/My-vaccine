--
-- 
-- By Hamza for
-- 2020-10-01
-- myvaccin tables and procedurs
--
USE myvaccin;
DROP TABLE IF EXISTS `vaccinated`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `vaccine`;
DROP TABLE IF EXISTS `familyMembers`;


CREATE TABLE `users`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` CHAR(100),
    `password` CHAR(100),
    `firstName` CHAR(50),
    `secondName` CHAR(50),
    `dateOfBirth` CHAR(50),
    `gender` CHAR(10),
    `mobile` INT,
    `address` CHAR(50),
    `post` INT,
    `role` CHAR(10) DEFAULT 'user'

)ENGINE=InnoDB DEFAULT
CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM users;
INSERT INTO users
VALUES
    (1, 'admin@admin.com','$2a$10$MS9iV3n7EjomLHNST3toE.u65f90eqkBVW8FIZekPSp19SKv8AFuC', 'admin', 'admin', '0/0/0', 'secret', 000000000, 'secret', 0000, 'admin')
;


CREATE TABLE `vaccine`
(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `vaccine` CHAR(100),
    `description` CHAR(100),
    `recommendation` CHAR(100),
    `duration` INT

)ENGINE=InnoDB DEFAULT
CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM vaccine;
INSERT INTO vaccine
VALUES
    (1001, 'Hepatitis B','Protects your baby against Hepatitis', '3 doses each does one month ', 30),
    (1002, 'DTaP', 'Help developing the immunity system', 'For baby at 2,4,6 month age', 60),
    (1003, 'Hib', 'Haemophilus influenzae type b', 'For baby at 2,4,6 month age', 60),
    (1004, 'IPV', 'Help developing the immunity system', 'For baby at 2,4,6 month age', 60),
    (1005, 'flu vaccination', 'To protect your kid from infulenza at this age', 'Every flu season from 7 months up to 60 years', 365)


;

CREATE TABLE `familyMembers`
(   
    `idu` INT,
    `idf` INT AUTO_INCREMENT PRIMARY KEY,
    `name` CHAR(100),
    `dateofbirth` CHAR(50),
    `gender` CHAR(20)

)ENGINE=InnoDB DEFAULT
CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

DROP PROCEDURE IF EXISTS add_family_member;
DELIMITER ;;
CREATE PROCEDURE add_family_member(
    `a_idu` INT,
    `a_name` CHAR(100),
    `a_dateofbirth` CHAR(100),
    `a_gender` CHAR(100)
    )
    BEGIN
    INSERT INTO familyMembers(idu, name, dateofbirth, gender) VALUES
    (a_idu, a_name, a_dateofbirth, a_gender);

END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS show_family_members;
DELIMITER ;;
CREATE PROCEDURE show_family_members(
    `a_idu` INT
)
    BEGIN
SELECT * FROM familyMembers WHERE idu = a_idu;
END
;;
DELIMITER ;


DROP PROCEDURE IF EXISTS show_vaccine;
DELIMITER ;;
CREATE PROCEDURE show_vaccine()
    BEGIN
SELECT * FROM vaccine;
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS show_one;
DELIMITER ;;
CREATE PROCEDURE show_one(
    `a_id` INT
    )
    BEGIN
SELECT * FROM vaccine where id = a_id;
END
;;
DELIMITER ;


DROP PROCEDURE IF EXISTS edit_vaccine;
DELIMITER ;;
CREATE PROCEDURE edit_vaccine(
    `a_id` INT,
    `a_vaccine` CHAR(100),
    `a_description` CHAR(100),
    `a_recommendation` CHAR(100),
    `a_duration` INT

    )
    BEGIN
    UPDATE vaccine SET
    `vaccine` = a_vaccine,
    `description` = a_description,
    `recommendation` = a_recommendation,
    `duration` = a_duration
    WHERE id = a_id;

END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_vaccine;
DELIMITER ;;
CREATE PROCEDURE delete_vaccine(
    `a_id` INT

    )
    BEGIN
    DELETE FROM vaccine 
    WHERE id = a_id;

END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS add_vaccine;
DELIMITER ;;
CREATE PROCEDURE add_vaccine(
    `a_vaccine` CHAR(100),
    `a_description` CHAR(100),
    `a_recommendation` CHAR(100),
    `a_duration` INT
    )
    BEGIN
    INSERT INTO vaccine(vaccine, description, recommendation, duration) VALUES
    (a_vaccine, a_description, a_recommendation, a_duration);

END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS show_users;
DELIMITER ;;
CREATE PROCEDURE show_users()
    BEGIN
SELECT * FROM users WHERE role = 'user';
END
;;
DELIMITER ;


DROP PROCEDURE IF EXISTS delete_user;
DELIMITER ;;
CREATE PROCEDURE delete_user(
    `a_id` INT

    )
    BEGIN
    DELETE FROM vaccinated 
    WHERE id = a_id;
    DELETE FROM familyMembers 
    WHERE idu = a_id;
    DELETE FROM users 
    WHERE id = a_id AND role = 'user';
    

END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS show_one_user;
DELIMITER ;;
CREATE PROCEDURE show_one_user(
    `a_id` INT
    )
    BEGIN
SELECT * FROM users where id = a_id;
END
;;
DELIMITER ;


DROP PROCEDURE IF EXISTS show_one_member;
DELIMITER ;;
CREATE PROCEDURE show_one_member(
    `a_idf` INT,
    `a_idu` INT
    )
    BEGIN
SELECT * FROM familyMembers where idf = a_idf AND idu = a_idu;
END
;;
DELIMITER ;


DROP PROCEDURE IF EXISTS edit_member;
DELIMITER ;;
CREATE PROCEDURE edit_member(
    `a_idu` INT,
    `a_idf` INT,
    `a_name` CHAR(100),
    `a_dateofbirth` CHAR(100),
    `a_gender` CHAR(20)

    )
    BEGIN
    UPDATE familyMembers SET
    `name` = a_name,
    `dateofbirth` = a_dateofbirth,
    `gender` = a_gender
    WHERE idf = a_idf 
    AND idu = a_idu;

END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_member;
DELIMITER ;;
CREATE PROCEDURE delete_member(
    `a_idf` INT,
    `a_idu` INT,
    `a_name` CHAR(50)
    )
    BEGIN
    DELETE FROM familyMembers 
    WHERE idf = a_idf AND idu = a_idu;
    DELETE FROM vaccinated 
    WHERE id = a_idu AND name = a_name;

END
;;
DELIMITER ;

CREATE TABLE `vaccinated`
(
    `id` INT,
    `name` CHAR(50),
    `vaccine` CHAR(100),
    `date` CHAR(50),
    FOREIGN KEY (id) REFERENCES users(id)

)ENGINE=InnoDB DEFAULT
CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

DROP PROCEDURE IF EXISTS create_user_vaccine;
DELIMITER ;;
CREATE PROCEDURE create_user_vaccine(
    `a_id` INT,
    `a_name` CHAR(50),
    `a_vaccine` CHAR(100),
    `a_date` CHAR(100)
    )
    BEGIN
    INSERT INTO vaccinated(id, name, vaccine, date) VALUES
    (a_id, a_name, a_vaccine, a_date);

END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS show_vaccinated_info;
DELIMITER ;;
CREATE PROCEDURE show_vaccinated_info(
    `a_id` INT
    )
    BEGIN
    
SELECT  	u.username AS mail,
            va.id AS 'id',
		    va.name AS 'name',
		    va.vaccine AS 'vaccine',
		    v.description AS 'description',
            va.date AS 'date',
            DATE_ADD(va.date, INTERVAL v.duration DAY) AS 'valid'
    FROM vaccinated AS va
		JOIN users AS u 
         ON u.id = va.id
		 JOIN vaccine AS v
         ON v.vaccine = va.vaccine
        WHERE va.id = a_id
        ORDER BY valid ASC;
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS edit_user;
DELIMITER ;;
CREATE PROCEDURE edit_user(
    `a_id` INT,
    `a_mail` CHAR(100),
    `a_first` CHAR(100),
    `a_second` CHAR(100),
    `a_dateofbirth` CHAR(100),
    `a_gender` CHAR(20),
    `a_mobile` INT,
    `a_address` CHAR(20),
    `a_post` INT
    )
    BEGIN
    UPDATE users SET
    `username` = a_mail,
    `firstName` = a_first,
    `secondName` = a_second,
    `dateOfBirth` = a_dateofbirth,
    `gender` = a_gender,
    `mobile` = a_mobile,
    `address` = a_address,
    `post` = a_post
    WHERE id = a_id;

END
;;
DELIMITER ;



DROP PROCEDURE IF EXISTS show_one_vaccinated;
DELIMITER ;;
CREATE PROCEDURE show_one_vaccinated(
    `a_id` INT,
    `a_name` CHAR(50),
    `a_vaccine` CHAR(100),
    `a_date` CHAR(100)
    )
    BEGIN
    
SELECT * 
    FROM vaccinated 
    WHERE 
    id = a_id AND
    name = a_name AND
    vaccine = a_vaccine AND
    date = a_date; 
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_log_vaccinated;
DELIMITER ;;
CREATE PROCEDURE delete_log_vaccinated(
    `a_id` INT,
    `a_name` CHAR(50),
    `a_vaccine` CHAR(100),
    `a_date` CHAR(100)
    )
    BEGIN
    DELETE FROM vaccinated 
    WHERE 
    id = a_id AND
    name = a_name AND
    vaccine = a_vaccine AND
    date = a_date; 

END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS edit_log_vaccinated;
DELIMITER ;;
CREATE PROCEDURE edit_log_vaccinated(
    `a_id` INT,
    `a_name` CHAR(50),
    `a_vaccine` CHAR(100),
    `a_date` CHAR(100),
    `a_newdate` CHAR(100)
    )
    BEGIN
    
    UPDATE vaccinated SET
    date = a_newdate
    WHERE id = a_id AND
    name = a_name AND
    vaccine = a_vaccine AND
    date = a_date; 

END
;;
DELIMITER ;


SELECT 'All tables are inserted' AS Message;
