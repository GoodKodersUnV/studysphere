import React from 'react';

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
      <p className="text-gray-600">You are not authorized to access this page.</p>
      <p className="text-gray-600">Currently, this site is only accessible to beta testers.</p>
    </div>
  );
};

export default UnauthorizedPage;
