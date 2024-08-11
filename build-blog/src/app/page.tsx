import {
  CurrentProject,
  Introduction,
  RecentProjects,
} from "@/components/pageComponents/homeComponents/Home";

export default function Home() {
  return (
    <main className="">
      <article className="w-[42rem] flex flex-col items-center justify-center m-auto gap-10">
        <Introduction />
        <CurrentProject />
        <RecentProjects />
      </article>
    </main>
  );
}
