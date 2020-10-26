CREATE DATABASE IF NOT EXISTS myvaccin;
USE myvaccin;

-- user
 CREATE USER IF NOT EXISTS 'user'@'%'
     IDENTIFIED WITH mysql_native_password
     BY 'pass'
;

-- Ge användaren alla rättigheter.
GRANT ALL PRIVILEGES
    ON *.*
    TO 'user'@'%'
;
