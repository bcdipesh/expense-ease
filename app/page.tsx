import Image from "next/image";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    redirect("/transactions");
  }

  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Effortless Expense Tracking
        </h1>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Track your income and expenses effortlessly with our user-friendly
          expense tracker
        </p>

        <Button className="mt-4" asChild>
          <RegisterLink>Get Started Today</RegisterLink>
        </Button>
      </div>

      <Image
        src="/statistic-chart.svg"
        width={400}
        height={400}
        alt="Statistic Chart"
      />
    </div>
  );
}
