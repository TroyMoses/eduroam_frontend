import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm px-3 md:px-10">
      <div className="container flex flex-col md:flex-row items-center justify-between py-6 gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} EduAnalytics. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
