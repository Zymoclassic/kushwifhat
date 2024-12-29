import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => {

  const location = useLocation();

  useEffect(() => {
    // Scroll to the top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);



  return (
    <>
      <NavBar />

            <Outlet />

      <Footer />
    </>
  )
}

export default Layout
