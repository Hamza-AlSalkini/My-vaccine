# My vaccine

## OVERVIEW
My vaccine web app is a website that allows the users to register their vaccinations and get reminders when the vaccine is expired..The app also allows users to register their family members.

## App functions

 - User registration interface and log in.
    - User dashboard which has the following:
      - Add/edit/delete family members.
      - Register vaccines for the user and family members.
      - Editing/deleting registered vaccines.
      - Getting reminders on the profile page if the vaccine is expired.
      - Family vaccine log with edit/delete option.
      - Available vaccine on the website.
      - Settings-> Editing user personal info.
      
 - Admin log in interface.
    - Admin dashboard which has the following:
       - Add/edit/delete vaccines.
       - Have an overview of the users with the delete option.
      
  - Security part:
      - Admin and users passwords are hashed.
      - Authorization is set for both users and admin.
  

  ##  Installtions and setup.
   This program was created using:
   MySQL, Node js, Bootstrap.
    
  1 - In the documentation of Mysql, we choose the appropriate operating system and follow the documentation  https://dev.mysql.com/doc/refman/8.0/en/installing.html

     In Linux we use the following commands:
     * Note in the installation you will choose a password for the root user( remember the password as we will need it to log in to the database in the terminal ).

     - sudo apt-get install mysql-server
     - sudo mysql_secure_installation
     - We can check the status of the server by (sudo service mysql status)
     - Now the server is working and we can log in to the database by typing (sudo mysql -uroot -p) and entering the root password.

 2- We need to install Node js https://nodejs.org/en/download/.

 3-  Setup the needed node modules for the project.
   - In Terminal we locate us in the path of the project folder $ /My-vaccine-main.
   - I have already written the needed modules in package.json file, therefore just type( npm install ).

 4- Setup our database:
  - In Terminal we locate us in the path of the project folder $ /My-vaccine-main/sql
  - Log into the database by using (mysql -uroot -p) or for Linux (sudo mysql -uroot -p) and entering the root password(which you have chosen in the MySQL installation).
     - Create our database and new user of the database by typing ( source setup.sql ).
     - Create our tables in the database by typing ( source insert.sql ).
     - Type Exit.
     
 5- Running the app:
   - In the terminal, we locate us in the path of the project folder $ /My-vaccine-main.
       - Type the following command: npm run dev.
         - This will start the app in the address( http://localhost:1337 ).

To access Admin dashboard use the following:
```
Username: admin@admin.com
Password: zolaco123456**@@

```

# About
This web application was developed as an individual project course 
in the Software Engineering program at BTH university in 2020.

The web app was designed to fulfill customer requirements.

In case of any questions regarding the project, 
feel free to contact me at Hamza.alsalkini@gmail.com


# Project developed by
```
Hamza Al Salkini
Software Engineering student
```


  



