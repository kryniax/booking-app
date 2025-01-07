# Niceplace &#x2600;

**Niceplace** is a web application that allows users to find their dream hotel for a vacation and provides an easy way to book and manage planned trips.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Tests](#tests)
- [Demo](#demo)

## Features

- **User Registration and Login**: Create accounts and log in to the application.
- **Browse Available Reservations**: View a list of available booking options.
- **Make Reservations**: Book selected options.
- **Manage Reservations**: View and cancel your reservations.

## Technologies

- **Backend**: Node.js, Express
- **Frontend**: Vite, React, TypeScript
- **Database**: MongoDB
- **Testing**: Playwright (end-to-end tests)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kryniax/booking-app.git
   cd booking-app
   ```

2. **Install dependencies**:

   - Backend:

     ```bash
     cd backend
     npm install
     ```

   - Frontend:

     ```bash
     cd ../frontend
     npm install
     ```

## Configuration

1. **Backend**:

   - Create a `.env` file in the `backend` directory based on `.env.example`.

2. **Frontend**:

   - Create a `.env` file in the `frontend` directory based on `.env.example`.

## Running the Application

1. **Backend**:

   ```bash
   cd backend
   npm run dev
   ```

   The backend will be available at `http://localhost:{your_port}`.

2. **Frontend**:

   ```bash
   cd ../frontend
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

## Tests

1. **End-to-end tests**:

   - Navigate to the `e2e-tests` directory:

     ```bash
     cd e2e-tests
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Run the tests:

     ```bash
     npx playwright test
     ```

## Demo

[Niceplace](https://niceplace.onrender.com/)
