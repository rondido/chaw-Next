import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>임시 서치바</div>
      {children}
    </div>
  );
};

export default Layout;
