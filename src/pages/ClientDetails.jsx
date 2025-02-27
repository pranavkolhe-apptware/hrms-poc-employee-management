"use client";

import React from "react";
import { useParams } from "react-router-dom";

const ClientDetails = () => {
  const { clientId } = useParams();
  // Fetch or derive client details based on clientId

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Client Details</h1>
      <p>Client ID: {clientId}</p>
      {/* Additional client details display */}
    </div>
  );
};

export default ClientDetails;