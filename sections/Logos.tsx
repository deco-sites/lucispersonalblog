import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Logo {
  src?: ImageWidget;
  /** @description text alternative */
  altText?: string;
}

export interface Props {
  title?: string;
  logos?: Logo[];
}

const IMG_PLACEHODLER = Array(30).fill(0).map(() => ({
  src:
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/03fbcc78-ca86-4616-a59a-b8aa18331a9c",
  altText: "Logo",
}));

export default function Logos({
  title = "Edit this heading however you want",
  logos = IMG_PLACEHODLER,
}: Props) {
  const slideContent = (
    <div class="flex items-center gap-20">
      {logos?.map((logo) => {
        return (
          <Image
            src={logo.src || ""}
            alt={logo.altText || ""}
            width={110}
            height={25}
          />
        );
      })}
    </div>
  );
  return (
    <div class="container lg:mx-auto mx-4 py-6 lg:py-14">
      <div class="flex flex-col gap-12">
        <p class="text-center text-lg">{title}</p>
        <div class="relative w-full overflow-hidden h-11">
          <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-11">
            {slideContent}
          </div>
        </div>
      </div>
    </div>
  );
}
