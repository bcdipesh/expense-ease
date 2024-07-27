import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Expense Ease",
    default: "Expense Ease - Track Your Income & Expenses",
  },
  description:
    "Effortlessly manage your finances with Expense Ease. Track income, expenses, net balance and gain insights into your spending habits.",
  twitter: {
    card: "summary_large_image",
    creator: "@b_c_dipesh",
    title: "Expense Ease - Track Your Income & Expenses",
  },
  openGraph: {
    title: "Expense Ease - Track Your Income & Expenses",
    siteName: "Expense Ease - Track Your Income & Expenses",
  },
  creator: "Dipesh B C",
  metadataBase: new URL("https://expenseease.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="container flex min-h-screen flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main className="my-10">{children}</main>
            <Footer />
          </ThemeProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
