export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t py-10">
      <p className="text-sm text-muted-foreground">
        &copy; {currentYear} / Expense Tracker
      </p>
    </footer>
  );
}
