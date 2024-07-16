# GraphQL User Dashboard

This project is a simple, responsive web application using React.js that fetches data from a GraphQL API and displays it in a user-friendly manner. The application includes features like data fetching, sorting, and state management using Redux Toolkit.

## Table of Contents

- [Features](#features)
- [Project Setup](#project-setup)
- [Running the Project](#running-the-project)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- Fetch data from a GraphQL API.
- Display data in a list or table format with sorting and filtering capabilities.
- Design a clean and responsive UI.
- Implement state management using Redux Toolkit.
- Write tests for key components using Jest and React Testing Library.

## Project Setup

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   Create a `.env` file in the root directory of the project and add any necessary environment variables.

## Running the Project

To run the project locally, use the following command:

    ```bash
    npm start
    ```

This will start the development server and you can view the project in your browser at `http://localhost:3000`.

## Running Tests

To run the tests, use the following command:

    ```bash
    npm test
    ```

This will start Jest in watch mode and run all the tests in the project.

## Project Structure

The project structure is organized as follows:

```
/assignment
    /frontend
        /src
            /components
                /__tests__         # Test files for components
                UserList.js        # Main component for displaying user data
            /constants
                query.js           # GraphQL queries
            /store
                userSlice.js       # Redux slice for managing user state
            App.js                 # Main App component
            index.js               # Entry point of the application

    /backend
        .env                      # Env variables
        resolvers.js              # GraphQL resolvers
        schema.js                 # GraphQL schema
        server.js                 # Server setup
```

## Dependencies

The project relies on the following major dependencies:

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: A library that provides tools for efficient Redux development.
- **Apollo Client**: A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.
- **Material-UI**: A popular React UI framework.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **React Testing Library**: A library for testing React components.

## License

This project is licensed under the MIT License.

## Screenshot
