-- hotel_ease_schema.sql
-- Oracle 11g compatible schema for HotelEase DB

-- Drop tables if exist (for dev)
DROP TABLE feedback CASCADE CONSTRAINTS;
DROP TABLE loyalty CASCADE CONSTRAINTS;
DROP TABLE payments CASCADE CONSTRAINTS;
DROP TABLE bookings CASCADE CONSTRAINTS;
DROP TABLE rooms CASCADE CONSTRAINTS;
DROP TABLE services CASCADE CONSTRAINTS;
DROP TABLE employees CASCADE CONSTRAINTS;
DROP TABLE customers CASCADE CONSTRAINTS;
DROP TABLE branches CASCADE CONSTRAINTS;

-- Branches
CREATE TABLE branches (
  branch_id NUMBER PRIMARY KEY,
  name VARCHAR2(100) NOT NULL,
  address VARCHAR2(200) NOT NULL,
  city VARCHAR2(50),
  phone VARCHAR2(20)
);

-- Rooms
CREATE TABLE rooms (
  room_id NUMBER PRIMARY KEY,
  branch_id NUMBER REFERENCES branches(branch_id),
  room_number VARCHAR2(10) NOT NULL,
  room_type VARCHAR2(30) NOT NULL,
  status VARCHAR2(20) DEFAULT 'available', -- available, reserved, occupied, maintenance
  price NUMBER(8,2) NOT NULL
);

-- Customers
CREATE TABLE customers (
  customer_id NUMBER PRIMARY KEY,
  name VARCHAR2(100) NOT NULL,
  email VARCHAR2(100) UNIQUE,
  phone VARCHAR2(20),
  loyalty_points NUMBER DEFAULT 0
);

-- Employees
CREATE TABLE employees (
  employee_id NUMBER PRIMARY KEY,
  branch_id NUMBER REFERENCES branches(branch_id),
  name VARCHAR2(100) NOT NULL,
  role VARCHAR2(30) NOT NULL, -- Admin, Manager, Housekeeping
  email VARCHAR2(100) UNIQUE
);

-- Bookings
CREATE TABLE bookings (
  booking_id NUMBER PRIMARY KEY,
  customer_id NUMBER REFERENCES customers(customer_id),
  room_id NUMBER REFERENCES rooms(room_id),
  checkin DATE NOT NULL,
  checkout DATE NOT NULL,
  status VARCHAR2(20) DEFAULT 'reserved', -- reserved, checked_in, checked_out, cancelled
  created_at DATE DEFAULT SYSDATE
);

-- Payments
CREATE TABLE payments (
  payment_id NUMBER PRIMARY KEY,
  booking_id NUMBER REFERENCES bookings(booking_id),
  amount NUMBER(8,2) NOT NULL,
  method VARCHAR2(20), -- card, cash, online
  paid_at DATE DEFAULT SYSDATE
);

-- Services
CREATE TABLE services (
  service_id NUMBER PRIMARY KEY,
  booking_id NUMBER REFERENCES bookings(booking_id),
  service_type VARCHAR2(50),
  price NUMBER(8,2),
  provided_at DATE DEFAULT SYSDATE
);

-- Feedback
CREATE TABLE feedback (
  feedback_id NUMBER PRIMARY KEY,
  customer_id NUMBER REFERENCES customers(customer_id),
  booking_id NUMBER REFERENCES bookings(booking_id),
  rating NUMBER(1) CHECK (rating BETWEEN 1 AND 5),
  comments VARCHAR2(500),
  created_at DATE DEFAULT SYSDATE
);

-- Loyalty
CREATE TABLE loyalty (
  loyalty_id NUMBER PRIMARY KEY,
  customer_id NUMBER REFERENCES customers(customer_id),
  points NUMBER,
  updated_at DATE DEFAULT SYSDATE
);

-- Sequences
CREATE SEQUENCE seq_branch_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_room_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_customer_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_employee_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_booking_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_payment_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_service_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_feedback_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_loyalty_id START WITH 1 INCREMENT BY 1;

-- Triggers for PKs
CREATE OR REPLACE TRIGGER trg_branch_pk
  BEFORE INSERT ON branches
  FOR EACH ROW
BEGIN
  SELECT seq_branch_id.NEXTVAL INTO :NEW.branch_id FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_room_pk
  BEFORE INSERT ON rooms
  FOR EACH ROW
BEGIN
  SELECT seq_room_id.NEXTVAL INTO :NEW.room_id FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_customer_pk
  BEFORE INSERT ON customers
  FOR EACH ROW
BEGIN
  SELECT seq_customer_id.NEXTVAL INTO :NEW.customer_id FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_employee_pk
  BEFORE INSERT ON employees
  FOR EACH ROW
BEGIN
  SELECT seq_employee_id.NEXTVAL INTO :NEW.employee_id FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_booking_pk
  BEFORE INSERT ON bookings
  FOR EACH ROW
BEGIN
  SELECT seq_booking_id.NEXTVAL INTO :NEW.booking_id FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_payment_pk
  BEFORE INSERT ON payments
  FOR EACH ROW
BEGIN
  SELECT seq_payment_id.NEXTVAL INTO :NEW.payment_id FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_service_pk
  BEFORE INSERT ON services
  FOR EACH ROW
BEGIN
  SELECT seq_service_id.NEXTVAL INTO :NEW.service_id FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_feedback_pk
  BEFORE INSERT ON feedback
  FOR EACH ROW
BEGIN
  SELECT seq_feedback_id.NEXTVAL INTO :NEW.feedback_id FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_loyalty_pk
  BEFORE INSERT ON loyalty
  FOR EACH ROW
BEGIN
  SELECT seq_loyalty_id.NEXTVAL INTO :NEW.loyalty_id FROM dual;
END;
/

-- Audit trigger for bookings status change
CREATE OR REPLACE TRIGGER trg_booking_status_audit
  AFTER UPDATE OF status ON bookings
  FOR EACH ROW
BEGIN
  INSERT INTO loyalty (customer_id, points, updated_at)
  VALUES (:NEW.customer_id, 10, SYSDATE);
END;
/

-- Views
CREATE OR REPLACE VIEW v_occupancy_by_day AS
SELECT b.branch_id, r.room_id, r.room_type, b.checkin, b.checkout, b.status
FROM bookings b
JOIN rooms r ON b.room_id = r.room_id;

CREATE OR REPLACE VIEW v_monthly_revenue AS
SELECT TO_CHAR(p.paid_at, 'YYYY-MM') AS month, SUM(p.amount) AS total_revenue
FROM payments p
GROUP BY TO_CHAR(p.paid_at, 'YYYY-MM');

CREATE OR REPLACE VIEW v_top_rooms AS
SELECT r.room_id, r.room_type, COUNT(b.booking_id) AS bookings_count
FROM rooms r
JOIN bookings b ON r.room_id = b.room_id
GROUP BY r.room_id, r.room_type
ORDER BY bookings_count DESC;

-- Stored Procedures

-- CheckRoomAvailability
CREATE OR REPLACE PROCEDURE CheckRoomAvailability(
  p_branch_id IN NUMBER,
  p_checkin IN DATE,
  p_checkout IN DATE,
  p_room_type IN VARCHAR2,
  p_rooms OUT SYS_REFCURSOR
) AS
BEGIN
  OPEN p_rooms FOR
    SELECT r.room_id, r.room_number, r.room_type, r.price
    FROM rooms r
    WHERE r.branch_id = p_branch_id
      AND r.room_type = p_room_type
      AND r.status = 'available'
      AND r.room_id NOT IN (
        SELECT b.room_id FROM bookings b
        WHERE b.checkin < p_checkout AND b.checkout > p_checkin
      );
END;
/

-- CreateBooking
CREATE OR REPLACE PROCEDURE CreateBooking(
  p_customer_id IN NUMBER,
  p_room_id IN NUMBER,
  p_checkin IN DATE,
  p_checkout IN DATE,
  p_booking_id OUT NUMBER
) AS
BEGIN
  INSERT INTO bookings (customer_id, room_id, checkin, checkout, status)
  VALUES (p_customer_id, p_room_id, p_checkin, p_checkout, 'reserved')
  RETURNING booking_id INTO p_booking_id;

  UPDATE rooms SET status = 'reserved' WHERE room_id = p_room_id;
END;
/

-- CreatePayment
CREATE OR REPLACE PROCEDURE CreatePayment(
  p_booking_id IN NUMBER,
  p_amount IN NUMBER,
  p_method IN VARCHAR2
) AS
BEGIN
  INSERT INTO payments (booking_id, amount, method)
  VALUES (p_booking_id, p_amount, p_method);
END;
/

-- CheckIn
CREATE OR REPLACE PROCEDURE CheckIn(
  p_booking_id IN NUMBER
) AS
  v_room_id NUMBER;
BEGIN
  UPDATE bookings SET status = 'checked_in' WHERE booking_id = p_booking_id;
  SELECT room_id INTO v_room_id FROM bookings WHERE booking_id = p_booking_id;
  UPDATE rooms SET status = 'occupied' WHERE room_id = v_room_id;
END;
/

-- CheckOut
CREATE OR REPLACE PROCEDURE CheckOut(
  p_booking_id IN NUMBER
) AS
  v_room_id NUMBER;
BEGIN
  UPDATE bookings SET status = 'checked_out' WHERE booking_id = p_booking_id;
  SELECT room_id INTO v_room_id FROM bookings WHERE booking_id = p_booking_id;
  UPDATE rooms SET status = 'available' WHERE room_id = v_room_id;
END;
/
