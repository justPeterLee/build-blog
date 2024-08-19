"use client";
import { BlogCard } from "@/components/blog/Blog";
import { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";

export function PostsSearch({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: (newSearch: string) => void;
}) {
  return (
    <section>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="relative flex gap-1">
          <input
            className="bg-cta rounded-md px-2 placeholder:text-sm placeholder:text-secondary-text text-primary-text outline-none text p-1"
            placeholder="search a post"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          ></input>

          <button className="bg-cta p-2 rounded-md hover:bg-cta-active h-full">
            <CgSearch size={15} className="text-primary-text duration-0" />
          </button>
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

export function PostsSearchResults({
  defaultPosts,
}: {
  defaultPosts: PostMetaData[];
}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchPost, setSearchPost] = useState(defaultPosts);
  return (
    <>
      <PostsSearch
        searchValue={searchValue}
        setSearchValue={(newSearch) => {
          setSearchValue(newSearch);
        }}
      />
      <section className="w-full">
        <h1 className="text-primary-text mb-1">All Posts</h1>

        <div className="flex flex-col gap-2 justify-center bg-card p-4 rounded-md shadow">
          {searchPost.map((postCard) => {
            return (
              <BlogCard
                key={Math.random()}
                title={postCard.title}
                date={postCard.date}
                tags={postCard.tags}
                fileName={postCard.fileName}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
