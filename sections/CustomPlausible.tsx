import { Head } from "$fresh/runtime.ts";

interface Props {
  /**
  * @description The description of name.
  */
  name?: string;
}

export default function Section({ name = "Capy" }: Props) {
  return <Head>
    <script defer data-domain="blog.lucis.dev" src="https://plausible.io/js/script.js"></script>
  </Head>
}