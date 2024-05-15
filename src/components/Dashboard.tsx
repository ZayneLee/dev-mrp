"use client";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-blue-100 p-4 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-2">Product Plans</h3>
        <p>Product A: Plan for Q1</p>
        <p>Product B: Plan for Q2</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-2">Employee Holidays</h3>
        <p>Zayne Lee: 16th May</p>
        <p>Jane Smith: 1st July - 10th July</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-2">Other Information</h3>
        <p>Meeting on 15th June</p>
        <p>Annual review on 25th June</p>
      </div>
    </div>
  );
};

export default Dashboard;
