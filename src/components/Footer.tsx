import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between mx-auto gap-4 py-10">
        <div className="flex flex-col items-center gap-4 px-8">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            Built by{" "}
            <Link
              href="https://www.linkedin.com/in/rikichoi/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Riki
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/rikichoi/reviewme-nextjs"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 ">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()} ReviewMe. All rights reserved.
          </p>
          <nav className="flex items-center space-x-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Privacy
            </Link>
            <Link
              href="https://github.com/rikichoi/reviewme-nextjs"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/rikichoi/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
