import type { ReactElement } from "react";

export type TextLink = { text: string; href: string };

// Turn the first match of each link's text into a link that opens in a new tab.
export function withLinks(text: string, links: TextLink[]) {
  let parts: (string | ReactElement)[] = [text];
  for (const link of links) {
    parts = parts.flatMap((part): (string | ReactElement)[] => {
      if (typeof part !== "string") return [part];
      const at = part.indexOf(link.text);
      if (at === -1) return [part];
      return [
        part.slice(0, at),
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-link">
          {link.text}
        </a>,
        part.slice(at + link.text.length),
      ];
    });
  }
  return parts;
}
