INSERT INTO project_category (name)
VALUES ('SI'),
       ('SM'),
       ('SR');

INSERT INTO project (project_name, revenue, start_date, end_date, working_days, pm_name,
                     planned_rate, actual_rate, status, category_id)
VALUES ('Nike website', 50000, '2025-01-01 00:00:00.00', '2025-07-01 00:00:00.00', 181, 'Alice', 100, 75, 'DELAYED', 1),
       ('E-commerce', 20000, '2025-03-01 00:00:00.00', '2025-07-01 00:00:00.00', 122, 'John', 100, 85, 'DELAYED', 2),
       ('Banking Mobile App', 100000, '2025-08-01 00:00:00.00', '2025-09-01 00:00:00.00', 31, 'David', 100, 100,
        'COMPLETED', 1),
       ('Healthcare App', 70000, '2025-01-01 00:00:00.00', '2025-06-01 00:00:00.00', 151, 'Lily', 100, 75, 'DELAYED', 3),
       ('ERP migration', 30000, '2025-09-01 00:00:00.00', '2025-11-31 00:00:00.00', 91, 'John', 20, 15, 'DELAYED', 2),
       ('Logistics Tracking', 150000, '2025-07-01 00:00:00.00', '2025-12-31 00:00:00.00', 183, 'Tom', 43, 40, 'IN_PROGRESS',
        3),
       ('Smart City Platform', 100000, '2025-05-01 00:00:00.00', '2025-07-01 00:00:00.00', 61, 'Grace', 100, 100,
        'COMPLETED', 1);
