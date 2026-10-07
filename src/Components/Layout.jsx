import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Layout;