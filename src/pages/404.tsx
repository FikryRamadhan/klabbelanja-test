function InternalPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-9xl font-bold text-blue-600">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
                Page Not Found
            </h2>
            <p className="text-gray-600 mt-2 mb-6 text-center">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>
            <a
                href="/"
                className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
                Go Back Home
            </a>
        </div>
    )
}

export default InternalPage