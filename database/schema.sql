## Database setup

-- Expense Tracker Database Schema
-- Author: Kota Sravanthi

CREATE DATABASE expense_tracker;

USE expense_tracker;

CREATE TABLE users(
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 password VARCHAR(255),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ADD budget DECIMAL(10,2) DEFAULT 0;

CREATE TABLE transactions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type ENUM('income','expense'),
    category VARCHAR(100),
    amount DECIMAL(10,2),
    description TEXT,
    transaction_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
);

CREATE TABLE savings_goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  goal_amount DECIMAL(10,2),
  extra_savings DECIMAL(10,2) DEFAULT 0
);
ALTER TABLE savings_goals
ADD target_date DATE;

CREATE TABLE savings_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    created_at DATE
);
