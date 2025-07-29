import { ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import hljs from "highlight.js/lib/core";

import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import bash from "highlight.js/lib/languages/bash";
import java from "highlight.js/lib/languages/java";
import csharp from "highlight.js/lib/languages/csharp";

import Breadcrumb from "../components/BreadCrumb";
import BugCard from "../components/BugCard";
import BugForm from "../components/BugForm";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("html", html);
hljs.registerLanguage("css", css);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("java", java);
hljs.registerLanguage("csharp", csharp);

function Diary() {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [bugs, setBugs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("All");

  const handleAddBug = (newBug) => {
    setBugs([newBug, ...bugs]);
  };

  const detectLanguage = (code) => {
    if (!code || code.trim() === "") return "text";
    const result = hljs.highlightAuto(code);
    return result.language || "text";
  };

  const displayedBugs = useMemo(() => {
    return bugs
      .map((bug) => ({
        ...bug,
        language: bug.language || detectLanguage(bug.codeSnippet),
      }))
      .filter((bug) => {
        const matchesSearch =
          bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bug.solution.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bug.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const matchesFilter =
          filterSeverity === "All" ||
          bug.severity.toLowerCase() === filterSeverity.toLowerCase();

        return matchesSearch && matchesFilter;
      });
  }, [bugs, searchTerm, filterSeverity]);

  return (
    <>
      <div className="py-10 md:px-16 px-5 font-generalsans space-y-6 max-w-7xl mx-auto">
        <Breadcrumb />

        <div className="space-y-1 mt-6">
          <h1 className="text-3xl capitalize">my bug diary</h1>
          <p className="font-quicksand font-light text-sm text-zinc-700">
            Document bugs, solutions, and lessons learned to build your
            debugging knowledge base.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
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

            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Title, solution, tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-zinc-300 rounded px-3 py-1.5 text-sm w-full sm:w-60 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">
                Filter by Severity
              </label>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="border border-zinc-300 rounded px-3 py-1.5 text-sm w-full sm:w-36 focus:outline-none"
              >
                <option>All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:flex lg:space-x-8 space-y-6 lg:space-y-0">
          <div className="lg:w-1/2 font-quicksand">
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

          <div className="lg:w-1/2 space-y-6">
            <div>
              <h2 className="text-xl text-zinc-800">
                Bug History ({displayedBugs.length} of {bugs.length})
              </h2>
              {displayedBugs.length === 0 ? (
                <p className="text-zinc-500 italic text-sm mt-2">
                  No bugs match your search or filter criteria.
                </p>
              ) : (
                <div className="space-y-5 mt-4">
                  {displayedBugs.map((bug) => (
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
