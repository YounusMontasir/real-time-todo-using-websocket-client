import React from "react";
import Login from "./login";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md fixed top-0 w-full z-10">
        <div className="container w-full flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-green-600">Listly ✅</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 text-center py-24 bg-green-100">
        <h2 className="text-4xl font-bold">Organize Your Tasks Effortlessly with Listly</h2>
        <p className="text-lg text-gray-600 mt-4">A simple, intuitive, and powerful to-do list app to boost your productivity.</p>
        {/* <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">Start for Free</button> */}
        <div>
            <Login></Login>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-20 text-center">
        <h3 className="text-3xl font-semibold mb-10">Why Choose Listly?</h3>
        <div className="grid md:grid-cols-3 gap-10 p-4">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-bold">✅ Smart Task Management</h4>
            <p className="text-gray-600 mt-2">Organize tasks with ease.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-bold">📅 Reminders & Deadlines</h4>
            <p className="text-gray-600 mt-2">Never miss a task.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-bold">📊 Progress Tracking</h4>
            <p className="text-gray-600 mt-2">Stay on top of your tasks.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16 text-center">
        <h3 className="text-3xl font-bold">Ready to Get Organized?</h3>
        {/* <button className="mt-4 bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-gray-100">Sign Up for Free</button> */}
        <div className="text-black">
            <Login></Login>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2025 Listly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
