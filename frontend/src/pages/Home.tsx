import {useState} from "react";

function Home() {
  const [pressedCount, setPressedCount] = useState(0);

  function buttonWasClicked() {
    setPressedCount(pressedCount + 1);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">
          Vite + React + TypeScript + Tailwind v4
        </h1>
        <p className="mt-4 text-gray-600">
          Your manual setup is complete!
        </p>
        <p className="mt-2 text-gray-600">
          This is the home page. Navigate using the links above.
        </p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={buttonWasClicked}
        >
          Buttony boi {pressedCount}
        </button>
      </div>
    </div>
  )
}

export default Home
