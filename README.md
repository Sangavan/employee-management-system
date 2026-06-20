# Employee Management System

A full-stack CRUD web application for managing employee records, built with the MERN stack. Users can create, view, edit, and delete employees, with all data persisted in a MongoDB database.

## Live Demo

- **Frontend (Vercel):** https://employee-management-system-lemon-gamma.vercel.app
- **Backend API (Render):** https://employee-management-system-mkbj.onrender.com

## Tech Stack

- **Frontend:** React (Vite), Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose (hosted on MongoDB Atlas)
- **Deployment:** Vercel (frontend) and Render (backend)

## Features

- View all employees in a table (Employee No, Name, Designation, Salary)
- Add a new employee — Employee No is auto-incremented
- Edit an employee's name, designation, and salary
- Delete an employee with a confirmation prompt
- Data persists in MongoDB (survives page refresh)

## Project Structure
employee-management-system/

├── client/   # React + Vite frontend

└── server/   # Node + Express backend


## Note on Deployment

The backend is hosted on Render's free tier, which spins down after inactivity. The first request after an idle period may take up to ~50 seconds while the server wakes up — subsequent requests are fast.