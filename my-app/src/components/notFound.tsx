


const NotFound = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
    <div className="bg-white rounded-2xl shadow-md p-12 text-center">
      <div className="text-6xl mb-4">📭</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        No stations found
      </h3>
      <p className="text-gray-600 text-lg">
        Try adjusting your search or check back later
      </p>
    </div>
  </div>  )
}

export default NotFound