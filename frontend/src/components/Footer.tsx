const Footer = () => {
    return (
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-gray-500">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">EcoTrack</h1>
              <p className="text-sm text-gray-600">
                © 2021 EcoTrack. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About Us
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;
  