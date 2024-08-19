import {
  CurrentProject,
  Introduction,
  RecentProjects,
} from "@/components/pageComponents/homeComponents/Home";
import { getPostCards } from "@/lib/api";

export default function Home() {
  const recentPostCards = getPostCards();
  return (
    <main className="">
      <article className="w-[42rem] flex flex-col items-center justify-center m-auto gap-10">
        <Introduction />
        <CurrentProject />
        <RecentProjects postCards={recentPostCards} />
      </article>
    </main>
  );
}
