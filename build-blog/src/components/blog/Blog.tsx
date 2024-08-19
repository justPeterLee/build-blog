import Link from "next/link";

export function BlogCard({
  title,
  date,
  tags,
  fileName,
}: {
  title: string;
  date: string;
  tags: string[];
  fileName: string;
}) {
  return (
    <Link
      href={`/posts/${fileName}`}
      className="bg-code-card py-2 px-4 rounded-md flex justify-between"
    >
      <div className="flex-grow">
        <span>
          <p className="text-tertiary-text text-xs font-semibold">{date}</p>
        </span>

        <span className="flex gap-1">
          <p className="text-primary-text"># {title}</p>
        </span>
      </div>

      <span className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          {tags.map((tag) => (
            <Tag tag={tag} key={Math.random()} />
          ))}
        </div>
      </span>
    </Link>
  );
}

export function Tag({ tag }: { tag: string }) {
  return (
    <span className="px-2 text-secondary-text text-sm bg-tag-card rounded">
      {tag}
    </span>
  );
}
