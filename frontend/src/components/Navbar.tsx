import { Button } from './ui/button'

function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg fixed top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </a>
            <a href="/about" className="text-gray-700 hover:text-gray-900">
              About Us
            </a>
            <a href="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button asChild>
              <a href="/signup">Sign up</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar