import { Link } from "react-router-dom"; 

const Home = () => {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold">MyBlog</h1>
        <nav>
          <Link to="/signup" className="mx-4 hover:underline">
            Sign Up
          </Link>
          <Link to="/signin" className="mx-4 hover:underline">
            Sign In
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-center items-center text-white text-center py-16 px-8">
        <h2 className="text-5xl font-extrabold mb-6">Welcome to MyBlog</h2>
        <p className="text-lg mb-8 max-w-2xl">
          Your gateway to amazing stories and knowledge. Discover, read, and share your thoughts with the world.
        </p>
        <div>
          <Link
            to="/signup"
            className="bg-white text-blue-500 py-3 px-8 rounded-lg font-semibold mr-4 hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
          <Link
            to="/signin"
            className="border-2 border-white text-white py-3 px-8 rounded-lg font-semibold hover:bg-white hover:text-blue-500 transition"
          >
            Log In
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
