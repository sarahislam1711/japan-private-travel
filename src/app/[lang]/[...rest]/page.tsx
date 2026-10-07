import { notFound } from "next/navigation";

// Any address with no page: show the 404 inside the language's layout (lang, dir, header, footer).
export const dynamicParams = true;

export default function CatchAll() {
  notFound();
}
