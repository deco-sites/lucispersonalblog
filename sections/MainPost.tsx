import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { BlogPost } from "apps/blog/types.ts";

export interface CTA {
  id?: string;
  href?: string;
  text?: string;
  outline?: boolean;
}

/** @title {{{title}}} */
export interface Post {
  url?: string;
  title?: string;
  author?: string;
  excerpt?: string;
  image?: ImageWidget;
  date?: string;
  readingTime?: string;
  tags?: string[];
}

export interface Props {
  post?: BlogPost | null;
}

const DEFAULT_IMAGE =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9";

export default function MainPost({
  post = {
      slug: "/",
      title: "Title of blogpost #1",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
}: Props) {
  return (
    <div class="container lg:mx-auto lg:py-14 mx-2 py-12 text-sm">
      <div class="space-y-16">
        <a
          href={`/blog/${post.slug}`}
          class="border border-secondary gap-8 grid grid-cols-1 items-center md:grid-cols-2 overflow-hidden rounded-lg"
        >
          {post.image && (
            <Image
              width={656}
              height={500}
              class="object-fit w-full z-10"
              sizes="(max-width: 656px) 100vw, 30vw"
              src={post.image || ""}
              alt={post.image}
              decoding="async"
              loading="lazy"
            />
          )}
          <div class="p-6 space-y-4">
            <div class="space-y-2">
              <h3 class="text-2xl">{post.title}</h3>
              <p class="text-base">{post.excerpt}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              {post.categories?.map((category) => (
                <div class="badge badge-lg badge-primary text-xs">
                  {category.name}
                </div>
              ))}
            </div>
            <div class="flex flex-wrap gap-2">
                  <span>{post.date
                    ? new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                    : ""}
                    </span>
                    <span>•</span>
              <span>{post.authors[0]?.name}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
