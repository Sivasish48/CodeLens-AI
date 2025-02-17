

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <img src="/logo.png" className="w-32 h-32" alt="logo" />
        <h1 className="text-3xl font-bold">
          Welcome to the <span className="text-red-500">Vite + React</span> template!
        </h1>
        <p className="text-gray-500">
          This is a <span className="text-red-500">Vite + React</span> template. To get started, you can create a project using this template by running <code className="text-green-500">npm init vite@latest</code> or <code className="text-green-500">yarn create vite@latest</code>.
        </p>
        </div>
      </div>
  )
}

export default App