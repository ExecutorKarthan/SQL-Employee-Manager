DROP DATABASE IF EXISTS org_db;
CREATE DATABASE org_db;

USE org_db;

CREATE TABLE departments(
    id: INT NOT NULL ,
    dept_name: VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles(
    id: INT NOT NULL ,
    title: VARCHAR(30),
    salary: DECIMAL,
    dept_id: INT,
    FOREIGN KEY (dept_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id: INT NOT NULL ,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id: INT,
    manager_id: INT, 
    FOREIGN KEY(role_id) 
    REFERENCES roles(id)
    ON DELETE SET NULL
    FOREIGN KEY(manager_id)
    REFERENCES manager(id)
    ON DELETE SET NULL
    PRIMARY KEY(id)
);