import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default async function NavBar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();
  let jsxContent: React.JSX.Element;

  if (user) {
    const loggedInUser = await db.user.findUnique({
      where: {
        kindeUserId: user.id,
      },
    });

    if (!loggedInUser) {
      await db.user.create({
        data: {
          kindeUserId: user.id,
          name: `${user?.given_name} ${user?.family_name}`,
          imageUrl: user?.picture,
          email: user?.email as string,
        },
      });
    }
  }

  if (!isUserAuthenticated) {
    jsxContent = (
      <>
        <li className="order-1">
          <Button variant="ghost" asChild>
            <LoginLink>Sign in</LoginLink>
          </Button>
        </li>
        <li className="md:order-2">
          <Button asChild>
            <RegisterLink>Start for free</RegisterLink>
          </Button>
        </li>
      </>
    );
  } else {
    jsxContent = (
      <>
        <li>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user?.picture as string} />
              <AvatarFallback>{`${user?.given_name} ${user?.family_name} picture`}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
              <span className="font-semibold">
                {user?.given_name} {user?.family_name}
              </span>
              <LogoutLink>Sign out</LogoutLink>
            </div>
          </div>
        </li>
      </>
    );
  }

  return (
    <nav>
      <ul className="flex flex-wrap items-center justify-between gap-4 py-10">
        <li>
          <Link href="/" className="text-xl font-bold">
            Expense Tracker
          </Link>
        </li>

        <div className="flex items-center gap-4">
          {jsxContent}
          <li className="order-3">
            <ThemeToggle />
          </li>
        </div>
      </ul>
    </nav>
  );
}
