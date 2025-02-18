// components/ProgressBar.js
"use client"
import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const ProgressBar = () => {
  useEffect(() => {
    // Configure NProgress
    NProgress.configure({ showSpinner: false });

    // Start progress bar on route change
    const handleRouteStart = () => NProgress.start();
    // Complete progress bar on route change complete
    const handleRouteComplete = () => NProgress.done();
    // Complete progress bar on route change error
    const handleRouteError = () => NProgress.done();

    // Add event listeners
    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteComplete);
    Router.events.on('routeChangeError', handleRouteError);

    // Cleanup event listeners on unmount
    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteComplete);
      Router.events.off('routeChangeError', handleRouteError);
    };
  }, []);

  return null; // Progress bar is rendered globally, so no need for JSX here
};

export default ProgressBar;