import { BlogCard } from "@/components/blog/Blog";
import { CgSearch } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";

export function PostsIntro() {
  return (
    <section>
      <div className="flex flex-col justify-center items-center gap-5">
        {/* <h1 className="text-secondary-text">posts</h1> */}
        <div className="relative flex gap-1">
          <input
            className="bg-cta rounded-md px-2 placeholder:text-sm placeholder:text-secondary-text text-primary-text outline-none text p-1"
            placeholder="search a post"
          ></input>

          {/* <div className="absolute left-[102%] flex gap-2"> */}
          <button className="bg-cta p-2 rounded-md hover:bg-cta-active h-full">
            <CgSearch size={15} className="text-primary-text duration-0" />
          </button>
          {/* </div> */}
        </div>

        <div>
          <button className="bg-cta p-2 rounded-full hover:bg-cta-active">
            <FaPlus size={12} className="text-primary-text duration-0" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function PostsSearch() {
  return (
    <section className="w-full">
      <h1 className="text-primary-text mb-1">All Posts</h1>

      <div className="flex flex-col gap-2 justify-center bg-card p-4 rounded-md shadow">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </section>
  );
}
