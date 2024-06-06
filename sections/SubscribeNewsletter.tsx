import { AppContext } from "../apps/site.ts";
import type { AppContext as RecordsApp } from "site/apps/deco/records.ts";
import type { AppContext as ResendApp } from "apps/resend/mod.ts";
import { newsletter } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import { useComponent } from "./Component.tsx";

interface Props {
  submissionResponse: { error?: string; email: string };
  /**
   * @description The title for the newsletter section.
   */
  title?: string;

  /**
   * @description The description text for the newsletter section.
   * @format textarea
   */
  description?: string;

  /**
   * @description The placeholder text for the email input field.
   */
  emailPlaceholder?: string;

  /**
   * @description The text for the submit button.
   */
  submitButtonText?: string;
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext & RecordsApp & ResendApp
): Promise<Props> {
  const form = await req.formData();
  const email = `${form.get("email") ?? ""}`;

  if (!email) {
    return { ...props, submissionResponse: { email: "" } };
  }

  const drizzle = await ctx.invoke("records/loaders/drizzle.ts");

  try {
    const recs = await drizzle
      .select({ email: newsletter.email })
      .from(newsletter)
      .where(eq(newsletter.email, email));

    if (recs.length) {
      return {
        ...props,
        submissionResponse: { error: "Email já cadastrado.", email },
      };
    }

    await drizzle.insert(newsletter).values({
      email,
      confirmed_at: null,
    });

    await ctx.invoke("resend/actions/emails/send.ts", {
      text: "Test",
      to: email,
    });

    return { ...props, submissionResponse: { email: "" } };
  } catch (e) {
    ctx.monitoring?.logger?.error(e);
    return {
      ...props,
      submissionResponse: { error: "Erro no sistema.", email },
    };
  }
}

export function loader(props: Props) {
  return props;
}

export default function NewsletterSubscriber(props: Props) {
  const {
    title = "Subscribe to Our Newsletter",
    description = "Stay up-to-date with our latest news and promotions.",
    emailPlaceholder = "Enter your email address",
    submitButtonText = "Subscribe",
    submissionResponse,
  } = props;
  return (
    <section class="relative py-16 bg-cover bg-center">
      <div class="container mx-auto px-4 flex flex-col">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-4xl font-bold mb-4">{title}</h2>
          <p class="text-lg mb-8">{description}</p>
          <form
            class="flex justify-center"
            hx-post={useComponent(import.meta.url, props)}
            hx-target="closest section"
            hx-swap="outerHTML"
          >
            <input
              type="email"
              value={submissionResponse?.email}
              class="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={emailPlaceholder}
              name="email"
              required
            />
            <button type="submit" class={`btn btn-primary`}>
              <span class="[.htmx-request_&]:hidden inline">
                {submitButtonText}
              </span>
              <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
            </button>
          </form>
        </div>
        <div class="max-w-3xl mx-auto text-center mt-5">
          {submissionResponse?.error && (
            <div role="alert" class="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{submissionResponse?.error}</span>
            </div>
          )}
          {submissionResponse && !submissionResponse.error && (
            <div role="alert" class="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Pronto! <br /> Você{" "}
                <b class="font-bold">receberá um e-mail para confirmação</b>.
                Clique no link para finalizar a inscrição.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
