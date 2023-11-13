import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from Blending Pixels" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0d0a1d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap px-4 py-16 ">

        {/* LOGO */}
        {!session && <Link
          href="https://blendingpixels.com"
          className="flex flex-col items-center justify-center gap-1"
        >
          <img src="/logo.png" alt="logo" />
        </Link>
        }

        <div className="flex flex-col items-center gap-5">

          {/* SIGNIN */}
          {!session && <><p className="text-1xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-2 font-semibold no-underline transition hover:bg-white/20"
            >
              SIGN IN
            </Link>
          </>}

          {/* NAVBAR SIGN OUT */}
          {session && <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between bg-[#15162c] px-2 text-white">
            <p className="text-md">
              {session && <span> {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20 text-sm"
            >
              SIGN OUT
            </Link>
          </div>}

        </div>

        {/* NOVEL */}
        {/* <CrudShowcase /> */}

      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
