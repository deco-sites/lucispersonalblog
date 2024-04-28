import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { ComponentChildren, Fragment } from "preact";
import { BlogPost } from "apps/blog/types.ts";
import { useId } from "../sdk/useId.ts";

export interface CTA {
  text?: string;
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
  cta?: CTA;
  posts?: BlogPost[] | null;
  pagination?: {
    /**
     * @title First page
     * @description Leave it as 0 to start from the first page
     */
    page?: number;
    /** @title items per page */
    perPage?: number;
  };
} 

const DEFAULT_IMAGE =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9";

function Container({ children }: { children: ComponentChildren }) {
  return (
    <div class="container lg:mx-auto lg:py-14 mx-2 py-12 text-sm">
      <div class="space-y-8">{children}</div>
    </div>
  );
}

export default function BlogPosts({
  cta = { text: "Show more" },
  posts = [
    {
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
    {
      slug: "/",
      title: "Title of blogpost #2",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
    {
      slug: "/",
      title: "Title of blogpost #3",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
    {
      slug: "/",
      title: "Title of blogpost #4",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
    {
      slug: "/",
      title: "Title of blogpost #5",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
    {
      slug: "/",
      title: "Title of blogpost #6",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
    {
      slug: "/",
      title: "Title of blogpost #7",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
    {
      slug: "/",
      title: "Title of blogpost #8",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
    {
      slug: "/",
      title: "Title of blogpost #9",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
    {
      slug: "/",
      title: "Title of blogpost #10",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
    {
      slug: "/",
      title: "Title of blogpost #11",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
    {
      slug: "/",
      title: "Title of blogpost #12",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
    {
      slug: "/",
      title: "Title of blogpost #13",
      authors: [{ name: "Name of the author", email: "author@deco.cx" }],
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: DEFAULT_IMAGE,
      date: "01 Apr 2024",
      categories: [{ name: "Tag#1", slug: "tag-1" }],
      content: "Blog Post Content"
    },
  ],
  pagination: {
    page = 0,
    perPage = 6,
  } = {},
}: Props) {
  const from = perPage * page;
  const to = perPage * (page + 1);

  // It's boring to generate ids. Let's autogen them
  const postList = useId();

  // Get the HTMX link for this section
  const fetchMoreLink = usePartialSection({
    mode: "append",
    // Renders this section with the next page
    props: {
      pagination: { perPage, page: page + 1 },
    },
  })["f-partial"];

  function calculateReadingTime(words: number): string {
    const wordsPerMinute = 250;
    const estimatedTimeMinutes = words / wordsPerMinute;

    const roundedReadingTime = Math.round(estimatedTimeMinutes);
    return `${roundedReadingTime} min`;
  }

  const ContainerComponent = page === 0 ? Container : Fragment;

  return (
    <ContainerComponent>
      <>
        <div class="gap-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {posts.slice(from, to).map((post) => (
            <a
              href={`/blog/${post.slug}`}
              class="border border-secondary overflow-hidden rounded-lg"
            >
              <Image
                width={380}
                height={274}
                class="object-fit w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={post.image || ""}
                alt={post.image}
                decoding="async"
                loading="lazy"
              />
              <div class="p-6 space-y-4">
                <div class="font-semibold">{calculateReadingTime(post.content.split(" ").length)}</div>
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
                    : ""}</span>
                  <span>•</span>
                  <span>{post.authors[0]?.name}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        {to < posts.length && (
          <div class="flex justify-center w-full" id={postList}>
            <button
              hx-get={fetchMoreLink}
              hx-swap="outerHTML"
              hx-target={`#${postList}`}
              aria-label={cta.text}
              class="btn btn-primary"
            >
              <span class="inline [.htmx-request_&]:hidden">
                {cta.text}
              </span>
              <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
            </button>
          </div>
        )}
      </>
    </ContainerComponent>
  );
}
