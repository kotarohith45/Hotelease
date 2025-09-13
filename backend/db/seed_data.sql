-- seed_data.sql
-- Sample data for HotelEase DB

-- Branches
INSERT INTO branches (name, address, city, phone) VALUES ('Grand Palace', '123 Main St', 'New York', '212-555-1000');
INSERT INTO branches (name, address, city, phone) VALUES ('Ocean View', '456 Beach Ave', 'Miami', '305-555-2000');

-- Rooms
INSERT INTO rooms (branch_id, room_number, room_type, status, price) VALUES (1, '101', 'Deluxe', 'available', 200);
INSERT INTO rooms (branch_id, room_number, room_type, status, price) VALUES (1, '102', 'Suite', 'available', 350);
INSERT INTO rooms (branch_id, room_number, room_type, status, price) VALUES (2, '201', 'Standard', 'available', 120);
INSERT INTO rooms (branch_id, room_number, room_type, status, price) VALUES (2, '202', 'Deluxe', 'available', 220);

-- Customers
INSERT INTO customers (name, email, phone, loyalty_points) VALUES ('Alice Smith', 'alice@example.com', '555-1111', 50);
INSERT INTO customers (name, email, phone, loyalty_points) VALUES ('Bob Lee', 'bob@example.com', '555-2222', 30);

-- Employees
INSERT INTO employees (branch_id, name, role, email) VALUES (1, 'John Admin', 'Admin', 'john.admin@hotel.com');
INSERT INTO employees (branch_id, name, role, email) VALUES (2, 'Mary Manager', 'Manager', 'mary.manager@hotel.com');
INSERT INTO employees (branch_id, name, role, email) VALUES (1, 'Sam Housekeeper', 'Housekeeping', 'sam.hk@hotel.com');

-- Bookings
INSERT INTO bookings (customer_id, room_id, checkin, checkout, status) VALUES (1, 1, TO_DATE('2025-09-15', 'YYYY-MM-DD'), TO_DATE('2025-09-18', 'YYYY-MM-DD'), 'reserved');
INSERT INTO bookings (customer_id, room_id, checkin, checkout, status) VALUES (2, 3, TO_DATE('2025-09-16', 'YYYY-MM-DD'), TO_DATE('2025-09-20', 'YYYY-MM-DD'), 'reserved');

-- Payments
INSERT INTO payments (booking_id, amount, method) VALUES (1, 600, 'card');
INSERT INTO payments (booking_id, amount, method) VALUES (2, 480, 'cash');

-- Services
INSERT INTO services (booking_id, service_type, price) VALUES (1, 'Spa', 80);
INSERT INTO services (booking_id, service_type, price) VALUES (2, 'Breakfast', 20);

-- Feedback
INSERT INTO feedback (customer_id, booking_id, rating, comments) VALUES (1, 1, 5, 'Amazing stay!');
INSERT INTO feedback (customer_id, booking_id, rating, comments) VALUES (2, 2, 4, 'Very good service.');

-- Loyalty
INSERT INTO loyalty (customer_id, points) VALUES (1, 10);
INSERT INTO loyalty (customer_id, points) VALUES (2, 5);
