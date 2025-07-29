import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-zinc-600 mb-4">
      <ul className="flex items-center gap-1 flex-wrap">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          // Replace "products" with "Shop" in breadcrumb
          let label = decodeURIComponent(value);
          if (label === "products") label = "Shop";
          else label = label.replace(/-/g, " ").replace(/\d+$/, "").trim();

          label = label.replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize

          return (
            <li key={to} className="flex items-center gap-1">
              <ChevronRight size={16} strokeWidth={1.5} />
              {isLast ? (
                <span className="text-zinc-800">{label}</span>
              ) : (
                <Link to={to} className="hover:underline">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumb;