import Image from "next/image";
import { photographs } from "@content/photography.manifest";
import { photoSlots, type PhotoSlotId } from "@content/photography.slots";

/**
 * A person's portrait from the photo manifest. Until one is supplied, the
 * person's initials in serif on a soft pine panel: honest, and finished-looking.
 */
export function Portrait({ slot, name, className = "", sizes }: { slot: PhotoSlotId; name: string; className?: string; sizes: string }) {
  const id = photoSlots[slot].photoId;
  const photo = id ? photographs.find((p) => p.id === id) : undefined;
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .filter((_, i, all) => i === 0 || i === all.length - 1)
    .join("");
  return (
    <div className={`relative overflow-hidden bg-pine-soft [container-type:size] ${className}`}>
      {photo ? (
        <Image src={photo.src} alt={name} fill sizes={sizes} className="object-cover" style={{ objectPosition: photo.focus }} />
      ) : (
        <span role="img" aria-label={name} className="absolute inset-0 flex items-center justify-center font-serif text-[min(34cqw,7rem)] leading-none text-pine" dir="ltr">
          {initials}
        </span>
      )}
    </div>
  );
}
