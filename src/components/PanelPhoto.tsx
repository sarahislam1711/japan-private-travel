import Image from "next/image";
import { photographs } from "@content/photography.manifest";
import { photoSlots, type PhotoSlotId } from "@content/photography.slots";

/** The "photograph to come" note shows only with pnpm dev:drafts, like the DRAFT tags. */
const showNotes = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1";

/**
 * A faded photograph behind a panel's text, from the manifest. Its place and
 * month show as a small caption when the manifest gives them.
 */
export function PanelPhoto({
  slot,
  tone,
  note = "top",
  position,
  strength,
}: {
  slot: PhotoSlotId;
  tone: "snow" | "pine";
  note?: "top" | "bottom";
  /** CSS object-position, to keep the subject in view. */
  position?: string;
  /** "soft" for a quieter photo behind type that must stay strong (the hero's place names). */
  strength?: "soft";
}) {
  const { photoId, brief } = photoSlots[slot];
  const photo = photoId ? photographs.find((p) => p.id === photoId) : undefined;

  if (!photo) {
    if (!showNotes) return null;
    return (
      <span className={`pointer-events-none absolute hidden max-w-[16rem] tablet:block ${note === "top" ? "end-6 top-6" : "start-6 bottom-6 text-start"} rounded-(--radius-control) px-2 py-1 font-gothic text-[0.6875rem] leading-snug opacity-70 outline-1 outline-dashed [outline-color:color-mix(in_oklab,currentColor_40%,transparent)] ${note === "top" ? "text-end" : ""}`}>
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
        style={position ? { objectPosition: position } : undefined}
        className={`pointer-events-none object-cover transition-opacity duration-500 ${
          tone === "pine" ? (strength === "soft" ? "opacity-25 grayscale" : "opacity-40 grayscale group-hover:opacity-50") : "opacity-35 grayscale-[20%] group-hover:opacity-45"
        }`}
      />
      {photo.place && photo.monthTaken ? (
        <span className="pointer-events-none absolute end-6 bottom-6 font-gothic text-[0.6875rem] text-ink-soft">
          {photo.place}. {photo.monthTaken}.
        </span>
      ) : null}
    </>
  );
}
