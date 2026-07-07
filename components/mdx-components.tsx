import Link from "next/link";
import type { ReactNode, AnchorHTMLAttributes } from "react";

/** Pull-quote used inside articles: <Pull>…</Pull>. */
export function Pull({ children }: { children: ReactNode }) {
  return <div className="pull">{children}</div>;
}

function MdxLink({ href = "", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

/** Components made available to every MDX post. */
export const mdxComponents = {
  Pull,
  a: MdxLink,
};
