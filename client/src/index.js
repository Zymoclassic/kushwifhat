import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import CreateAccount from './pages/account/CreateAccount';
import Login from './pages/account/Login';
import UserProfile from './pages/account/UserProfile';
import Logout from './pages/account/Logout';
import PostInfo from './pages/post/PostInfo';
import CreatePost from './pages/post/CreatePost';
import DeletePost from './pages/post/DeletePost';
import EditPost from './pages/post/EditPost';
import PostCategory from './pages/post/PostCategory';
import PostAuthors from './pages/post/PostAuthors';
import Dashboard from './pages/post/Dashboard';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    errorElement:<ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {path: "signup", element: <CreateAccount />},
      {path: "login", element: <Login />},
      {path: "user/:id", element: <UserProfile />},
      {path: "logout", element: <Logout />},
      {path: "create", element: <CreatePost />},
      {path: "authors", element: <PostAuthors />},
      {path: "post/categories/:category", element: <PostCategory />},
      {path: "myposts/:id", element: <Dashboard />},
      {path: "posts/:id", element: <PostInfo />},
      {path: "posts/:id/edit", element: <EditPost />},
      {path: "posts/:id", element: <PostInfo />},
      {path: "posts/:id/delete", element: <DeletePost />},
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

