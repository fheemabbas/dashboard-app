# Next.js Authentication App

This project is a simple web application built with Next.js, Material-UI (MUI), React Hook Form, and Redux Toolkit Query (RTK Query). It demonstrates proficiency in React, state management, API integration, and responsive design.

## Setup and Installation

### Prerequisites

- Node.js (>=14.0.0)
- npm (>=6.0.0) or yarn (>=1.22.0)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-name>

   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Features

- **Register Page:**

  - Registration form with email and password fields.
  - Real-time validation using React Hook Form.
  - API integration for user registration.
  - Error handling and feedback using MUI's Alert component.

- **Login Page:**

  - Login form with email and password fields.
  - Real-time validation using React Hook Form.
  - API integration for user login.
  - Error handling and feedback using MUI's Alert component.
  - Link to the registration page if the user does not exist.

- **Dashboard Page:**
  - Protected route accessible only to authenticated users.
  - Fetch and display a list of users using RTK Query.
  - Pagination for navigating through multiple pages of users.
  - Logout functionality with feedback using MUI's Alert component.

## Technologies Used

- **Framework:** Next.js
- **Styling:** Material-UI (MUI)
- **Form Management:** React Hook Form
- **State Management & Data Fetching:** Redux Toolkit (RTK) with RTK Query
- **API:** [Reqres.in](https://reqres.in/) for authentication and user data
