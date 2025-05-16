
import React, { createContext, useState } from 'react';

export const FormDetailsContext = createContext();

export const FormDetailsProvider = ({ children }) => {
  const [formDetails, setFormDetails] = useState({
    headerTexts: {
      line1: "FOR SCIENCE AND TECHNOLOGY",
      line2: "PROJECT PROPOSAL (2024-2025)"
    },
    additionalTextLines: [] // Extra lines to be added below header texts in the PDF
  });

  return (
    <FormDetailsContext.Provider value={{ formDetails, setFormDetails }}>
      {children}
    </FormDetailsContext.Provider>
  );
};
