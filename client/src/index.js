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
import AllPosts from './pages/post/AllPosts';
import Authors from './pages/post/Authors';
import UserProvider from './context/userContext';

const router = createBrowserRouter([
  {
    path:"/",
    element:<UserProvider><Layout/></UserProvider>,
    errorElement:<ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {path: "user/signup", element: <CreateAccount />},
      {path: "user/login", element: <Login />},
      {path: "user", element: <UserProfile />},
      {path: "user/logout", element: <Logout />},
      {path: "users", element: <Authors />},
      {path: "posts", element: <AllPosts />},
      {path: "posts/create", element: <CreatePost />},
      {path: "posts/authors", element: <PostAuthors />},
      {path: "posts/categories/:category", element: <PostCategory />},
      {path: "posts/user/:id", element: <Dashboard />},
      {path: "posts/:id", element: <PostInfo />},
      {path: "posts/:id/edit", element: <EditPost />},
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

