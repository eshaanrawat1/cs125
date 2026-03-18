import React from 'react';
import Typography from '../atoms/Typography';
import { FaRegPaperPlane } from "react-icons/fa";

const SearchTemplate = ({ children }) => (
  <div className="w-full max-w-4xl mx-auto pt-12 md:pt-24 pb-12 px-4">
    
    <Typography variant="h1" className="text-center mb-12 flex items-center justify-center gap-3">
      <FaRegPaperPlane className="text-blue-600 translate-y-[-4px]" size={36}/>
      <span className="text-gray-900 font-black text-3xl md:text-5xl">Smart Travel</span> 
      <span className="text-blue-600 font-black text-3xl md:text-5xl">Advising</span>
    </Typography>

    <div className="flex flex-col gap-6">
      {children}
    </div>
    
  </div>
);

export default SearchTemplate;