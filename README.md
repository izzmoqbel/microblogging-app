# Microblogging App

A simple microblogging application that allows a single admin user to manage and publish blog posts. The admin can perform CRUD operations on blog entries, while users can view blogs and search for posts by title or content. This app is built using PHP for the backend, with HTML, CSS, and JavaScript for the frontend.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Backend](#running-the-backend)
5. [Running the Frontend](#running-the-frontend)
6. [Environment Configuration](#environment-configuration)
7. [Project Structure](#project-structure)

## Project Overview

In this project, we will build a personal microblogging website that allows a single admin user to manage and publish blog posts. The application will enable the admin to create, read, update, and delete blog entries, providing a platform for sharing content. Users visiting the site can view a list of blogs on the home page and access detailed views of individual blog posts. The application will also include search functionality, allowing users to find specific blogs by title or content.

The project will be built using PHP for the backend, with HTML, CSS, and JavaScript for the frontend. The backend will handle data management, including user authentication and blog operations, while the frontend will focus on rendering the user interface and interacting with the backend APIs.

## Prerequisites

Before you begin, ensure that you have the following installed on your system:

- **PHP 7.4 or higher**: The backend of this application is built with PHP. You can download it from [php.net](https://www.php.net/).
- **PostgreSQL**: This application uses PostgreSQL as the database. You can install it from [postgresql.org](https://www.postgresql.org/).
- **Browser**: To interact with the frontend and view the microblogging platform.

## Installation

To get started with the project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/izzmoqbel/microblogging-app
   cd microblogging-app
   ```

2. Set up the Database:

   - Open the backend/blog_db.sql file and execute the SQL queries to set up the database schema (admins, blogs).
   - Ensure your PostgreSQL database is configured and running.

3. Create the .env file:
   In the root of the project directory (where the README.md is located), create a .env file and add the following environment variables for your PostgreSQL database connection:
   ```bash
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```
Make sure to replace the values with your own database credentials if needed. This file will store sensitive information such as your database credentials securely.

4. Configure the database connection:
   

- Open the `backend/db.php` file.
- Instead of hardcoding the database credentials, modify the script to load the credentials from the .env file. You can use the phpdotenv library to load these values.
To install phpdotenv, run the following command in your backend directory:

```bash
composer require vlucas/phpdotenv
```

- Open the `frontend/config.js` file.
- Update the `API_BASE_URL` to point to your backend server. For example:

```javascript
const CONFIG = {
  API_BASE_URL: "http://localhost:3000",
};
```

## Running the Backend

To run the backend, follow these steps:

1. Open a Terminal or Command Prompt

- Navigate to the `backend/` directory in your project folder.

2. Start the PHP Built-in Server

- Run the following command to start the PHP server:

```bash
    php -S localhost:3000
```

3. Ensure the PostgreSQL service is running by executing:

```bash
   sudo service postgresql start
```

4. Navigate to the PHP backend directory and ensure that the database is accessible. You can access the login.php, blog.php, and other PHP files via your server at http://localhost:3000.

## Running the Frontend

To run the frontend, follow these steps:

1. Open a Terminal or Command Prompt

- Navigate to the `frontend` directory in your project folder.

2. Start the PHP Built-in Server

- Run the following command to start the PHP server:

```bash
    php -S localhost:8000
```

**Note:** The frontend communicates with the backend via API calls, so ensure the backend is running first.

## Environment Configuration

To configure the environment for running the application, follow these steps:

### 1. Set Up the Database Connection

- Open the `backend/db.php` file.
- Update the database connection settings with your PostgreSQL credentials, such as:
  - `username`
  - `password`
  - `database name`

Ensure that these values match your PostgreSQL setup.

### 2. Set Up the API Base URL

- Open the `frontend/config.js` file.
- Update the `API_BASE_URL` variable to point to the URL where the backend is hosted. For example:

  ```javascript
  const API_BASE_URL = "http://localhost:3000";
  ```

### 2. Install Required Tools

- Ensure that you have the following tools installed on your local machine:
  - PHP: Required to run the backend PHP code.
  - PostgreSQL: Required to run the database for storing and retrieving blog data.
 
## Project Structure

```bash
microblogging-app/
│
├── backend/
│   ├── db.php
│   ├── blog_db.sql
│   ├── add_blog.php
│   ├── update_blog.php
│   ├── fetch_blogs.php
│   ├── get_blog_details.php
│   ├── login.php
│   ├── logout.php
│   └── delete_blog.php
│
├── frontend/
│   ├── index.html
│   ├── config.js
│   ├── styles.css
│   ├── header_script.js
│   ├── header.html
│   ├── scripts.js
│   ├── blog_details.html
│   ├── create_Blog.html
│   ├── create_blog.js
│   ├── login.html
│   ├── login.js
│   ├── script_blog_details.js
│   └── uploads/
│
├── README.md
```
