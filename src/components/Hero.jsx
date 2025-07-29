import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

function Hero() {
  return (
    <>
      <div className="text-center space-y-3 flex justify-center items-center flex-col py-20 mt-10 md:px-0 px-5">
        <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#5388c5_100%)]"></div>

        <h4 className="font-generalsans font-light border border-zinc-200 shadow-xs px-3 text-sm py-0.5 rounded-3xl">
          For Developers, By Developers
        </h4>
        <h1 className="text-5xl font-boska font-medium">
          Your Personal Bug Diary
        </h1>
        <p className="md:max-w-1/2 text-sm md:text-base font-generalsans text-zinc-500">
          Document bugs, track solutions, and build your debugging knowledge
          base. Turn every bug into a learning opportunity and never solve the
          same problem twice.
        </p>

        <Link to={"/diary"}>
          <button className="flex space-x-2 border border-zinc-400 px-4 shadow-2xl mt-4 cursor-pointer py-2 items-center font-generalsans bg-black text-white">
            <span>start your diary</span>
            <span>
              <ArrowRight strokeWidth={1} />
            </span>
          </button>
        </Link>
      </div>
    </>
  );
}

export default Hero;
