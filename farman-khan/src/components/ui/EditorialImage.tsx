"use client";

import { useEffect, useRef, useState } from "react";
import { photoSrc, photoSrcSet, type Photo } from "@/lib/images";

type Props = {
  photo: Photo;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

/**
 * Responsive image with a skeleton shimmer while loading and an on-brand
 * gradient if the file cannot load — a section is never left blank.
 */
export default function EditorialImage({ photo, sizes = "100vw", className = "", imgClassName = "", priority, style }: Props) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const ref = useRef<HTMLImageElement>(null);

  // An image can finish loading before React hydrates and attaches onLoad.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete) setState(img.naturalWidth > 0 ? "ready" : "error");
  }, []);

  return (
    <div className={`relative overflow-hidden bg-charcoal ${className}`}>
      {state !== "ready" && (
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#1d1a17] to-[#2a2119]">
          {state === "loading" && (
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
          )}
          {state === "error" && (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(198,164,119,0.28),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgba(167,125,88,0.22),transparent_55%)]" />
              <svg className="absolute inset-0 h-full w-full opacity-[0.18]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                {Array.from({ length: 14 }, (_, i) => (
                  <path key={i} d={`M ${i * 8 - 10} -5 C ${i * 8 + 10} 30, ${i * 8 - 12} 65, ${i * 8 + 6} 105`} fill="none" stroke="#C6A477" strokeWidth="0.25" />
                ))}
              </svg>
              <div className="absolute inset-3 border border-champagne/15" />
            </>
          )}
        </div>
      )}
      {state !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={photoSrc(photo)}
          srcSet={photoSrcSet(photo)}
          sizes={sizes}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          style={style}
          className={`h-full w-full object-cover transition-opacity duration-700 ${state === "ready" ? "opacity-100" : "opacity-0"} ${imgClassName}`}
        />
      )}
    </div>
  );
}
