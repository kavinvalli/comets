import prisma from "../lib/prisma.ts";
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function Developer(props) {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-screen w-full bg-[#eee] text-black flex flex-col py-24 px-12 md:px-60">
      <div className="w-full flex justify-between">
        <div className="font-semibold text-lg text-black">
          {props.user.name}
        </div>
        <div className="font-semibold text-lg text-black">
          {window.localStorage.getItem("apiKEYY")}
        </div>
      </div>
      <div className="w-full grid grid-cols-8 flex items-center">
        <input
          type="text"
          placholder="Search"
          className="rounded bg-white border border-gray-400 col-span-7 p-4 text-black"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Link href="/create-app">
          <button className="bg-background rounded py-4 px-2 ml-2 text-white">
            Create App
          </button>
        </Link>
      </div>
      <div className="projects grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {props.user.apps
          .filter((app) =>
            app.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((app) => (
            <Link href={`/apps/${app.id}`} key={app.id}>
              <div className="cursor-pointer bg-white px-4 py-4 my-4 mx-4 rounded">
                <h4>{app.name}</h4>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { user: null } };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      name: true,
      apps: true,
    },
  });
  console.log(user);

  return {
    props: { user },
  };
}
