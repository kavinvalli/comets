import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Home(props) {
  console.log(props);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      console.log(session.user.email);
      const f = async () => {
        try {
          const r1 = await (
            await fetch(`https://common-assets.herokuapp.com/User`)
          ).text();
          console.log(r1);
          const res = await fetch(`/api/user`, {
            method: "POST",
            body: JSON.stringify({
              email: session.user.email,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          const r = await res.json();
          if (typeof window != "undefined") {
            console.log("here");
            window.localStorage.setItem("apiKEYY", r.key);
          }
        } catch (err) {
          console.error(err.message);
        }
      };
      f();
      return () => {};
    }
  }, [session]);
  return (
    <div
      className="bg-background w-full text-white snap-y snap-mandatory"
      style={{
        backgroundImage: 'url("/bg-illu.png")',
        backgroundSize: "cover",
      }}
    >
      <nav className="flex justify-between items-center pt-12 px-8 text-lg">
        <a>About</a>
        <div className="flex items-center">
          <a
            href="https://comet-docs.exun.co"
            target="_blank"
            rel="noreferrer"
            className="mr-3"
          >
            Docs
          </a>
          {session ? (
            <>
              <Link href="/developer">
                <a className="mr-3">Developer</a>
              </Link>
              <button
                onClick={() => {
                  window.localStorage.clear();
                  signOut();
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </nav>
      <div className="h-[calc(100vh-74px)] px-4 flex flex-col justify-center items-center snap-center">
        <Image src="/logoo.png" width="700" height="160" alt="logo" />
        <h1 className="text-2xl sm:text-4xl font-bold">
          Connecting Metaverses
        </h1>
      </div>
      <div className="h-screen flex justify-center items-center grid grid-cols-1 md:grid-cols-2 snap-center">
        <div className="px-24 flex flex-col">
          <h1 className="text-6xl font-medium font-secondary">
            Sync progress
            <br /> across Metaverses
          </h1>
          <p className="text-lg mt-6" style={{ zIndex: "2" }}>
            The biggest problem today is siloed metaverses created by
            disconnected teams.
            <br />
            Comet allows the user to carry over progress from one metaverse to
            another by retaining common assets.
          </p>
        </div>
        <div className="relative h-full w-full">
          <img
            src="/a.png"
            className="absolute bottom-0"
            style={{ zIndex: "1" }}
          />
        </div>
      </div>
      <div className="h-screen flex justify-center items-center grid-cols-2 px-24 span-center">
        <div className="grid grid-rows-2 grid-cols-2 gap-x-24 gap-y-8 ml-24">
          <div
            className="h-[180px] w-[180px] bg-[rgba(255,255,255,0.25)] text-white rounded-[40px] flex flex-col justify-center items-center px-6 text-center"
            style={{
              boxShadow:
                "0px 3.2589643001556396px 79.84461975097656px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <img src="/link.png" alt="" />
            <h3 className="text-lg font-medium">Easy to plugin API</h3>
          </div>
          <div
            className="h-[180px] w-[180px] bg-[rgba(255,255,255,0.25)] text-white rounded-[40px] flex flex-col justify-center items-center px-4 text-center"
            style={{
              boxShadow:
                "0px 3.2589643001556396px 79.84461975097656px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <img src="/code.png" alt="" />
            <h3 className="text-lg font-medium">Minimal Changes to Code</h3>
          </div>
          <div
            className="h-[180px] w-[180px] bg-[rgba(255,255,255,0.25)] text-white rounded-[40px] flex flex-col justify-center items-center px-2 text-center"
            style={{
              boxShadow:
                "0px 3.2589643001556396px 79.84461975097656px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <img src="/dashboard.png" alt="" />
            <h3 className="text-lg font-medium mt-2">Apps Dashboard</h3>
          </div>
          <div
            className="h-[180px] w-[180px] bg-[rgba(255,255,255,0.25)] text-white rounded-[40px] flex flex-col justify-center items-center px-2 text-center"
            style={{
              boxShadow:
                "0px 3.2589643001556396px 79.84461975097656px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <img src="/call.png" alt="" />
            <h3 className="text-lg font-medium mt-2">Customer Service</h3>
          </div>
        </div>
        <div className="flex flex-col w-full items-end">
          <h2 className="text-6xl font-medium font-secondary">
            Developer Experience
          </h2>
          <p className="text-lg mt-6 text-right">
            Comet provides a very simple and
            <br />
            ready-to-use API and has one of the
            <br />
            best Developer Experiences out there!
          </p>
        </div>
      </div>
    </div>
  );
}
