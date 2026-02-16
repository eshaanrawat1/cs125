import React from 'react';
import Typography from '../atoms/Typography';
import { FaRegPaperPlane } from "react-icons/fa";

const SearchTemplate = ({ children }) => (
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="max-w-3xl mx-auto">
      <Typography variant="h1" className="text-center mb-8 flex items-center justify-center gap-2">
        <FaRegPaperPlane size={25}/>
        FAANGPLS <span className="text-blue-600">Smart Travel Advising</span>
      </Typography>
      {children}
    </div>
  </div>
);

export default SearchTemplate;
