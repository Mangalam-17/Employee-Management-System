# Employee Management System

A full-stack Employee Management System built using **React**, **Node.js**, **Express**, and **MongoDB**.  
Designed as a lightweight HR-style admin tool supporting employee lifecycle operations with a focus on clean architecture, data validation, and real-world behaviors such as soft deletion and unique constraints.

---

## 🚀 Features

### **Core Functionality**

- Add Employee
- Edit Employee Details
- View All Active Employees
- Soft Delete (status = INACTIVE)
- Unique Email Constraint (backend enforced)
- Modal-based UI (no page reloads)
- Real-time table refresh after mutations

### **Business Behaviors**

- Employees are never physically deleted
- Deleted employees become `INACTIVE` and are excluded from active list
- Email must be unique per employee (HR requirement)
- Salary stored numerically

---

## 🧩 Tech Stack

| Layer        | Technology                                          |
| ------------ | --------------------------------------------------- |
| Frontend     | React, Vite, TailwindCSS                            |
| Backend      | Node.js, Express.js                                 |
| Validation   | Zod                                                 |
| Database     | MongoDB (Mongoose ODM)                              |
| API Style    | REST                                                |
| Architecture | Layered (Controller → Service → Repository → Model) |

---

## 🏗️ Architecture Overview

Backend follows a clean modular architecture:
