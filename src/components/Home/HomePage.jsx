"use client";

function HomePage({ currentUser }) {
  
  return (
    <div
      className="flex flex-col md:grid grid-cols-12 h-full mt-4 p-5"
    >
      {
        JSON.stringify(currentUser)
      }
    </div>
  );
}

export default HomePage;
