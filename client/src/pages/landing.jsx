import { Link } from "react-router-dom";


const LandingPage = () => {
    return(
        // <div className="w-full">
        //     <h1 className="text-3xl font-bold text-center mt-20 w-full text-black">Welcome to Mini CRM</h1>
        // </div>
        <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center pt-20 pb-20  from-white to-gray-100">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
           Welcome to Mini CRM
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            MiniCRM helps you streamline customer management, track sales, and
            boost productivity — all in one simple dashboard.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 shadow-md"
            >
              Get Started Free
            </Link>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-900">
            Powerful Features to Grow Your Business
          </h3>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-blue-600">Customer Management</h4>
              <p className="mt-3 text-gray-600">
                Keep track of your clients’ details, interactions, and history in one place.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-blue-600">Sales Reports</h4>
              <p className="mt-3 text-gray-600">
                Visualize performance and track progress with easy-to-understand reports.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-blue-600">Team Collaboration</h4>
              <p className="mt-3 text-gray-600">
                Share insights and work together with your team in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h3 className="text-3xl md:text-4xl font-bold">Start Growing Your Business Today 🚀</h3>
        <p className="mt-4 text-lg text-blue-100">
          Sign up for free and experience the power of MiniCRM.
        </p>
        <div className="mt-8">
          <Link
            to="/signup"
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} MiniCRM. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
    )
}
export default LandingPage;