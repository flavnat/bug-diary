import { useState } from "react";
import FormField from "./FormField";

export default function BugForm({ onAddBug , setIsFormOpen }) {
  const [formData, setFormData] = useState({
    title: "",
    solution: "",
    severity: "",
    codeSnippet: "",
    tags: "",
    lessonLearned: "",
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const hasError = (field) => {
    return submitted || touched[field] ? !formData[field] : false;
  };

  const getError = (field, label) => {
    return hasError(field) ? `${label} is required.` : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTouched({
      title: true,
      solution: true,
      severity: true,
      codeSnippet: touched.codeSnippet || false,
      tags: touched.tags || false,
      lessonLearned: touched.lessonLearned || false,
    });

    const isValid = formData.title && formData.solution && formData.severity;

    if (isValid) {
      const newBug = {
        id: Date.now(),
        title: formData.title,
        solution: formData.solution,
        severity: formData.severity,
        codeSnippet: formData.codeSnippet || null,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        lessonLearned: formData.lessonLearned || null,
        createdAt: new Date().toLocaleDateString(),
      };

      onAddBug(newBug);
      setIsFormOpen(false)

      setFormData({
        title: "",
        solution: "",
        severity: "",
        codeSnippet: "",
        tags: "",
        lessonLearned: "",
      });
      setSubmitted(false);
      setTouched({});
    }
  };

  return (
    <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          type="text"
          id="bug-title"
          label="Bug Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          onBlur={() => handleBlur("title")}
          required
          error={getError("title", "Bug Title")}
        />

        <FormField
          type="select"
          id="severity"
          label="Severity"
          value={formData.severity}
          onChange={(e) =>
            setFormData({ ...formData, severity: e.target.value })
          }
          onBlur={() => handleBlur("severity")}
          options={["Low", "Medium", "High", "Critical"]}
          required
          error={getError("severity", "Severity")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          type="textarea"
          id="code-snippet"
          label="Code Snippet (optional)"
          value={formData.codeSnippet}
          onChange={(e) =>
            setFormData({ ...formData, codeSnippet: e.target.value })
          }
          placeholder="Paste your relevant code here"
          rows={4}
        />

        <FormField
          type="textarea"
          id="solution"
          label="Solution"
          value={formData.solution}
          onChange={(e) =>
            setFormData({ ...formData, solution: e.target.value })
          }
          onBlur={() => handleBlur("solution")}
          placeholder="How did you fix this bug?"
          rows={4}
          required
          error={getError("solution", "Solution")}
        />
      </div>

      <FormField
        type="textarea"
        id="lesson-learned"
        label="Lesson Learned (optional)"
        value={formData.lessonLearned}
        onChange={(e) =>
          setFormData({ ...formData, lessonLearned: e.target.value })
        }
        placeholder="What did you learn from this experience? How can you prevent it in the future?"
        rows={4}
      />

      <FormField
        type="tags"
        id="tags"
        label="Tags"
        value={formData.tags}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        placeholder="e.g. UI, API, login"
      />

      <button
        type="submit"
        className="bg-zinc-800 text-white px-4 py-2 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        disabled={!formData.title || !formData.solution || !formData.severity}
      >
        Submit Bug
      </button>
    </form>
  );
}
