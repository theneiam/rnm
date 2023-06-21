"use client";

import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../apollo-config";

const GuessWhoLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <div className="bg-gray-600 min-h-screen px-20">{children}</div>
    </ApolloProvider>
  );
};

export default GuessWhoLayout;
