import React from "react";
import Link from "next/link";
const LandingContainer: React.FC = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="text-white text-7xl">
        <div className="bg-slate-950 px-8 py-5 rounded-md shadow-lg">
          <Link href={"/report"}>Generate New Report</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingContainer;
