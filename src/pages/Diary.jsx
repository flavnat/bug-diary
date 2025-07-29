import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import React, { useState } from "react";

function Diary() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <>
      <div className="border p-10 font-generalsans space-y-4">
        {/* header */}
        <div className="space-y-1">
          <h1 className="text-3xl">my bug diary</h1>
          <p className="text-zinc-700 font-quicksand">
            Document bugs, solutions, and lessons learned to build your
            debugging knowledge base.
          </p>
        </div>

        {/* options */}

        <div className="border font-quicksand">
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
            <div className="mt-2 font-generalsans transition-all ease-in duration-700">
              <div className="space-y-0.5">
                <h1 className="text-xl">Add New Bug Entry</h1>
                <p className="font-quicksand text-zinc-600 text-sm">
                  Document a bug you've encountered and how you solved it.
                </p>
              </div>


              <form action="" className="mt-4 border">
                <div className="flex flex-col">
                  <label htmlFor="bug-title">Bug Title</label>
                  <input type="text" name="bugTitle" className="border border-zinc-400" id="bug-title" />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Diary;
