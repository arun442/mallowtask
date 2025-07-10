import { LuTableProperties,LuTableOfContents } from "react-icons/lu";

export default function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="flex space-x-2 py-2">
      <button
        onClick={() => setViewMode('table')}
        className={`p-1 rounded transition-colors flex items-center ${
          viewMode === 'table' 
            ? 'border border-[#1990FF]  text-[#1990FF]' 
            : 'border border-gray-600  text-gray-600'
        }`}
      >
       <LuTableProperties/> Table
      </button>
      <button
        onClick={() => setViewMode('card')}
        className={`p-1 rounded transition-colors flex items-center ${
          viewMode === 'card' 
            ? 'border border-[#1990FF]  text-[#1990FF]' 
            : 'border border-gray-600  text-gray-600'
        }`}
      >
        <LuTableOfContents/> Card
      </button>
    </div>
  );
}