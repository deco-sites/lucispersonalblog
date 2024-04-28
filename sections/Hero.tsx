import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

export interface Props {
  /** 
   * @format rich-text
   * @default Click here to tweak this text however you want.
   */
  title?: string;
  description?: string;
  image?: ImageWidget;
  placement?: "left" | "right";
  cta?: CTA[];
}

const PLACEMENT = {
  left: "flex-col text-left lg:flex-row-reverse",
  right: "flex-col text-left lg:flex-row",
};

export default function HeroFlats({
  title = "Click here to tweak this text however you want.",
  description = "This text is entirely editable, tailor it freely.",
  image,
  placement = "left",
  cta,
}: Props) {
  return (
    <div>
      <div class="flex flex-col gap-8 items-center mx-auto">
        <div
          class={`flex w-full xl:container xl:mx-auto py-20 mx-5 md:mx-10 z-10 ${
            image
              ? PLACEMENT[placement]
              : "flex-col items-center justify-center text-center"
          } lg:pt-36 lg:pb-20 gap-12 md:gap-20 items-center`}
        >
          {image && (
            <Image
              width={640}
              class="lg:w-1/2 object-fit w-full"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image}
              alt={image}
              decoding="async"
              loading="lazy"
            />
          )}
          <div
            class={`mx-6 lg:mx-auto lg:w-full space-y-4 gap-4 ${
              image
                ? "lg:w-1/2 lg:max-w-xl"
                : "flex flex-col items-center justify-center lg:max-w-3xl"
            }`}
          >
            <div
              class="font-medium inline-block leading-[100%] lg:text-[80px] text-4xl tracking-[-2.4px]"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            >
            </div>
            <p class="leading-[150%] md:text-md text-lg">
              {description}
            </p>
            {cta && cta.length > 0 &&
              (
                <div class="flex gap-3 items-center lg:pt-20">
                  {cta?.map((item) => (
                    <a
                      key={item?.id}
                      id={item?.id}
                      href={item?.href}
                      target={item?.href.includes("http") ? "_blank" : "_self"}
                      class={`font-normal btn btn-primary ${
                        item.outline && "btn-outline"
                      }`}
                    >
                      {item?.text}
                    </a>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
