import { BlogCard } from "../../blog/Blog";

export function Introduction() {
  return (
    <section className="">
      <p className="text-xs text-tertiary-text">intro</p>
      <div className="text-center flex gap-5 bg-code-card rounded p-1 px-2">
        <p className="text-tertiary-text">1 | </p>
        <span className="flex gap-2">
          <span className="flex">
            <p className="text-secondary-text">{"<"}</p>
            <p className="text-[#E06C75]">{"p"}</p>
            <p className="text-secondary-text">{">"}</p>
          </span>
          <p className="text-secondary-text">" i write code. "</p>

          <span className="flex">
            <p className="text-secondary-text">{"</"}</p>
            <p className="text-[#E06C75]">{"p"}</p>
            <p className="text-secondary-text">{">"}</p>
          </span>
        </span>
      </div>
    </section>
  );
}

export function CurrentProject() {
  return (
    <section className="w-full">
      <h1 className="text-primary-text mb-1">Currently Working On</h1>
      <div className="flex flex-col gap-2 justify-center bg-card p-4 rounded-md shadow">
        {/* <BlogCard /> */}
      </div>
    </section>
  );
}

export function RecentProjects({
  postCards,
}: {
  postCards: {
    title: string;
    date: string;
    tags: string[];
    fileName: string;
  }[];
}) {
  return (
    <section className="w-full">
      <h1 className="text-primary-text mb-1">Recent Posts</h1>

      <div className="flex flex-col gap-2 justify-center bg-card p-4 rounded-md shadow">
        {postCards.map((postCard) => {
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
  );
}
