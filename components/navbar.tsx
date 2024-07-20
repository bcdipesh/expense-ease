import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default async function NavBar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();
  let jsxContent: React.JSX.Element;

  if (!isUserAuthenticated) {
    jsxContent = (
      <>
        <li>
          <Button variant="ghost" asChild>
            <LoginLink>Sign in</LoginLink>
          </Button>
        </li>
        <li>
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
          <div className="flex items-center space-x-4">
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
      <ul className="flex items-center justify-between py-10">
        <li>
          <Link href="/" className="text-xl font-bold">
            Expense Tracker
          </Link>
        </li>

        <div className="flex items-center space-x-4">
          {jsxContent}
          <li>
            <ThemeToggle />
          </li>
        </div>
      </ul>
    </nav>
  );
}
