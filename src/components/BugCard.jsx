import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function BugCard({ bug }) {
  const severityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  };

  const severityClass = severityColors[bug.severity.toLowerCase()] || "bg-zinc-100 text-zinc-800";

  const language = bug.language?.trim() || "javascript";

  return (
    <div className="border border-zinc-200 p-5 font-generalsans shadow-sm hover:shadow transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-zinc-900 text-lg font-medium">{bug.title}</h3>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${severityClass}`}
        >
          {bug.severity}
        </span>
      </div>

      <p className="text-sm text-zinc-700 mb-3">
        <strong>Solution:</strong> {bug.solution}
      </p>


      {bug.lessonLearned && (
        <p className="text-sm text-zinc-600 mb-4 italic">
          <strong>Lesson:</strong> {bug.lessonLearned}
        </p>
      )}


      {bug.codeSnippet && (
        <div className="mb-4 rounded-md border border-zinc-300 overflow-hidden">
          <div className="bg-zinc-800 px-4 py-1.5 flex justify-between items-center">
            <span className="text-xs text-zinc-300 uppercase tracking-wider font-medium">
              {language}
            </span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(bug.codeSnippet).then(
                  () => alert("Copied to clipboard!"),
                  () => alert("Failed to copy.")
                );
              }}
              className="text-xs text-zinc-300 hover:text-white transition"
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            language={language}
            style={atomOneDark}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.8125rem", // 13px
              lineHeight: "1.5",
              borderRadius: "0",
              overflowX: "auto",
            }}
            wrapLines={true}
            showLineNumbers={false}
            PreTag="div"
            CodeTag="code"
          >
            {bug.codeSnippet}
          </SyntaxHighlighter>
        </div>
      )}


      <div className="flex flex-wrap gap-1.5 mb-3">
        {bug.tags.length > 0 ? (
          bug.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-zinc-100 text-zinc-700 px-2 py-1 rounded-full border border-zinc-200"
            >
              #{tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-zinc-400 italic">No tags</span>
        )}
      </div>

 
      <div className="text-xs text-zinc-500">
        Submitted on {bug.createdAt}
      </div>
    </div>
  );
}