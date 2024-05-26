export interface Props {
  /**
   * @description The link text.
   * @default "Home"
   */
  linkText ?: string;
  /**
   * @description The link URL.
   * @default "/"
   */
  linkUrl ?: string;
}

export default function Header({ linkText = "Home", linkUrl = "/" }: Props) {
  return (
    <header class="container lg:mx-auto lg:py-14 mx-2 py-12 text-sm justify-between items-center">
      <a href={linkUrl} class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>{linkText}</span>
      </a>
    </header>
  );
}