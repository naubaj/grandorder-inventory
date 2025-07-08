"use client";
import { useEffect } from "react";
import { themeChange } from "theme-change";

import { MdiThemeLightDark } from "@/public/MdiThemeLightDark";
import { MdiGithub } from "@/public/MdiGithub";

export function NavBar() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <div className="flex justify-end gap-2">
        <button
          data-toggle-theme="dark,light"
          data-act-class="ACTIVECLASS"
          className="py-2"
        >
          <MdiThemeLightDark />
        </button>
        <a
          href="https://github.com/naubaj/grandorder-inventory"
          target="_blank"
          className="flex justify-center items-center"
        >
          <MdiGithub />
        </a>
      </div>
    </>
  );
}
