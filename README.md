# Kushwifhat

Kushwifhat is a Full-Stack MERN (MongoDB, Express, React, Node.js) blog application that allows users to create, read, update, and delete blog posts. It provides an interactive and user-friendly interface for sharing thoughts, ideas, and experiences.

## Features

- **User Authentication**: Secure user registration and login using JWT.
- **Blog Management**: CRUD (Create, Read, Update, Delete) operations for blogs.
- **Responsive Design**: Optimized for all types of devices incuding desktop, tab and mobile devices.
- **Image Uploads**: Upload and manage images for blog posts.
- **Profile Management**: Update user profile details, including profile pictures.

## Tech Stack

- **Frontend**: React.js with CSS for styling.
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB for data storage.
- **Authentication**: JSON Web Tokens (JWT).
- **File Uploads**: Managed using `fileUpload`.

## Installation and Setup

Follow the steps below to set up the project on your local machine:

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.
- Git installed.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://www.github.com/zymoclassic/kushwifhat.git
   cd kushwifhat
   ```

2. **Set Up the Backend**:
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory and add the following variables:
     ```env
     PORT=4000
     MONGO_URI=your_mongo_database_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Start the server:
     ```bash
     npm start
     ```

3. **Set Up the Frontend**:
   ```bash
   cd ../client
   npm install
   ```
   - Create a `.env` file in the `backend` directory and add the following variables:
     ```env
     REACT_APP_BASE_URL=http://localhost:4000/api
     REACT_APP_UPLOADS_URL=http://localhost:4000
     ```

   - Start the React development server:
     ```bash
     npm start
     ```

4. **Access the Application**:
   Open your browser and go to `http://localhost:3000` to access the app.

## Project Structure

```
Kushwifhat
├── backend      # Express backend
├── client       # React frontend
└── README.md    # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/user/signup` - Register a new user.
- `POST /api/user/login` - Log in an existing user.

### Blogs
- `GET /api/posts` - Fetch all blogs.
- `GET /api/posts/:id` - Fetch a specific blog by ID.
- `GET /api/posts/user/:id` - Fetch all the posts of a specific user.
- `GET /api/posts/categories/:category` - Fetch all blogs by category.
- `POST /api/posts/create` - Create a new blog.
- `PUT /api/posts/:id/edit` - Update an existing blog.
- `DELETE /api/post/:id/delete` - Delete a blog.

### User
- `GET /api/user` - Fetch all users.
- `GET /api/user/:id` - Fetch user details.
- `POST /api/user/changedp` - Fetch user details.
- `PATCH /api/user/editdetails` - Update user details.

## Contribution Guidelines

Feel free to contribute to Kushwifhat. Here’s how you can get started:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For questions or suggestions, feel free to reach out:
- **GitHub**: [ZymoClassic](https://www.github.com/zymoclassic)
- **Email**: [awopejumoses@gmail.com](mailto:awopejumoses@gmail.com)


