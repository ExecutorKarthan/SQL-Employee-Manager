INSERT INTO department (id, dept_name)
VALUES (001, "Maintenance"),
       (002, "Physics"),
       (003, "Chemistry"),
       (004, "Biology"),
       (005, "Finance");

INSERT INTO role (id, title, salary, dept_id)
VALUES (011, "Repair Specialist", 65000, 001),
       (022, "Researcher", 70000, 002),
       (033, "Researcher", 70000, 003),
       (044, "Researcher", 70000, 004),
       (111, "Head of Maintenance", 90000, 001),
       (122, "Lead Scientist", 90000, 002),
       (133, "Lead Scientist", 90000, 003),
       (144, "Lead Scientist", 90000, 004),
       (055, "Finance Specialist", 65000, 005),
       (155, "Finance Lead", 90000, 005);

INSERT INTO manager (id, first_name, last_name, role_id)
VALUES (133, "Charles", "Xavier", 033),
       (122, "Eric", "Lensure", 133);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Roger", "Rabbit", 033, 133),
       (002, "Bugs", "Bunny", 133, NULL),
       (003, "Conrad", "Capsin", 022, 122),
       (004, "Hulk", "Hogan", 111, NULL),
       (005, "Barbra", "Gordan", 122, NULL);