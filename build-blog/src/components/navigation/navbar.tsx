import Link from "next/link";
import Image from "next/image";
export function Navbar() {
  return (
    <header className="p-10 flex justify-center items-center ">
      {/* links */}
      <nav className="flex justify-between items-center bg-white rounded-lg w-[42rem] p-2 px-4 shadow-md text-neutral-800">
        <div className="navbar_links flex gap-2">
          <Link
            href={"/"}
            className="hover:bg-neutral-200 duration-150 rounded-md p-1 px-2"
          >
            Home
          </Link>
          <Link
            href={"/"}
            className="hover:bg-neutral-200 duration-150 rounded-md p-1 px-2"
          >
            Articles
          </Link>
          <Link
            href={"/"}
            className="hover:bg-neutral-200 duration-150 rounded-md p-1 px-2"
          >
            Projects
          </Link>
          <Link
            href={"/"}
            className="hover:bg-neutral-200 duration-150 rounded-md p-1 px-2"
          >
            Practice
          </Link>
        </div>

        {/* buttons */}
        <div className="navbar_buttons flex gap-5 justify-center items-center px-2">
          <button className="bg-neutral-200 rounded-full px-2 flex gap-2 items-center justify-center h-[32px] hover:bg-neutral-300 duration-100">
            <Image
              src={"/navbar/search.svg"}
              alt="Search"
              width={15}
              height={15}
            />
            <span className="text-xs text-neutral-800 font-semibold rounded-full px-2 shadow bg-neutral-50 flex">
              <Image
                src={"/navbar/control-btn.svg"}
                alt="ctrl"
                width={10}
                height={10}
              />
              +k
            </span>
          </button>

          <div className="shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] rounded-full bg-neutral-50 flex items-center justify-center h-[32px] w-[32px] hover:cursor-pointer">
            <Image
              src={"/navbar/light-mode.svg"}
              alt="light"
              width={20}
              height={20}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
