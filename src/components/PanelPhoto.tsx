import Image from "next/image";
import { photographs } from "@content/photography.manifest";
import { photoSlots, type PhotoSlotId } from "@content/photography.slots";

const isDev = process.env.NODE_ENV !== "production";

/**
 * A faded photograph behind a panel's text. Shows only a photo logged in the
 * manifest (rule 4, COMPLIANCE C6), with its place and month as a caption.
 * With no photo: a quiet dev-only note; nothing in production.
 */
export function PanelPhoto({ slot, tone }: { slot: PhotoSlotId; tone: "snow" | "pine" }) {
  const { photoId, brief } = photoSlots[slot];
  const photo = photoId ? photographs.find((p) => p.id === photoId) : undefined;

  if (!photo) {
    if (!isDev) return null;
    return (
      <span className="pointer-events-none absolute end-6 top-6 max-w-[16rem] rounded-(--radius-control) px-2 py-1 text-end font-gothic text-[0.6875rem] leading-snug opacity-70 outline-1 outline-dashed [outline-color:color-mix(in_oklab,currentColor_40%,transparent)]">
        Photograph to come: {brief}
      </span>
    );
  }

  return (
    <>
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 58vw, 100vw"
        className={`pointer-events-none object-cover transition-opacity duration-500 ${
          tone === "pine" ? "opacity-35 mix-blend-luminosity group-hover:opacity-45" : "opacity-25 grayscale-[30%] group-hover:opacity-35"
        }`}
      />
      <span className="pointer-events-none absolute end-6 bottom-6 font-gothic text-[0.6875rem] text-ink-soft">
        {photo.place}, {photo.prefecture}. {photo.monthTaken}.
      </span>
    </>
  );
}
