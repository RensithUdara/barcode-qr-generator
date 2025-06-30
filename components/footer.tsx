export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-700 dark:from-gray-100 dark:to-purple-400 bg-clip-text text-transparent mb-2">
              CodeGen Pro
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Professional code generation made beautiful</p>
          </div>

          <div className="flex justify-center gap-8 mb-8">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:scale-110"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:scale-110"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:scale-110"
            >
              Contact
            </a>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-gray-500 dark:text-gray-400">&copy; 2024 CodeGen Pro. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
