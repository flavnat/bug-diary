import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import React, { useState } from "react";
import BugForm from "../components/BugForm";
import BugCard from "../components/BugCard";
import Breadcrumb from "../components/BreadCrumb";

function Diary() {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [bugs, setBugs] = useState([]);

  const handleAddBug = (newBug) => {
    setBugs([newBug, ...bugs]);
  };

  return (
    <>
      <div className="py-10 md:px-16 px-5 font-generalsans space-y-6 max-w-7xl mx-auto">
        <Breadcrumb />
        {/* Header */}
        <div className="space-y-1 mt-6">
          <h1 className="text-3xl capitalize">my bug diary</h1>
          <p className="font-quicksand font-light text-sm text-zinc-700">
            Document bugs, solutions, and lessons learned to build your
            debugging knowledge base.
          </p>
        </div>

        <div className="lg:flex lg:space-x-8 space-y-6 lg:space-y-0">
          <div className="lg:w-1/2 font-quicksand">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFormOpen((prev) => !prev);
              }}
              className="w-32 flex items-center justify-between bg-zinc-700 text-white duration-700 transition-all cursor-pointer px-4 py-1 border space-x-1.5"
            >
              <span className="inline-block w-[80px]">
                {isFormOpen ? "Close" : "Add Bug"}
              </span>
              <span>
                <ChevronUp
                  className={`duration-300 transition-all ${
                    isFormOpen ? "rotate-180" : ""
                  }`}
                  size={20}
                  strokeWidth={0.8}
                />
              </span>
            </button>

            {isFormOpen && (
              <div className="mt-5 font-generalsans transition-all ease-in duration-700">
                <div className="space-y-0.5">
                  <h1 className="text-lg">Add New Bug Entry</h1>
                  <p className="font-quicksand text-zinc-600 text-xs">
                    Document a bug you've encountered and how you solved it.
                  </p>
                </div>
                <BugForm
                  onAddBug={handleAddBug}
                  setIsFormOpen={setIsFormOpen}
                />
              </div>
            )}
          </div>

          {/* Right Side: Bug List */}
          <div className="lg:w-1/2 space-y-6">
            <div>
              <h2 className="text-xl text-zinc-800">
                Bug History ({bugs.length})
              </h2>
              {bugs.length === 0 ? (
                <p className="text-zinc-500 italic text-sm mt-2">
                  No bugs reported yet. Add one to get started!
                </p>
              ) : (
                <div className="space-y-5 mt-4">
                  {bugs.map((bug) => (
                    <BugCard key={bug.id} bug={bug} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Diary;
