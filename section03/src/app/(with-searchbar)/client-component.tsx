"use client";
import React from "react";
import ServerComponent from "./server-component";

const ClientComponent = ({ children }: { children: React.ReactNode }) => {
  console.log("client component");
  return <div>{children}</div>;
};

export default ClientComponent;
