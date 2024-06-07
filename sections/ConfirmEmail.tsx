import { AppContext } from "../apps/site.ts";
import type { AppContext as RecordsApp } from "site/apps/deco/records.ts";
import { newsletter } from "../db/schema.ts";
import { eq } from "drizzle-orm";

export interface Props {
  really?: boolean;
  error?: string;
}

export const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext & RecordsApp
) => {
  const url = new URL(req.url);

  const reallyQs = url.searchParams.get("really");

  if (!reallyQs) {
    return props;
  }

  const confirmationKey = url.searchParams.get("key");

  if (!confirmationKey) {
    return { ...props, error: "Sem chave de confirmação." };
  }

  const drizzle = await ctx.invoke("records/loaders/drizzle.ts");

  await drizzle
    .update(newsletter)
    .set({
      confirmed_at: new Date().toISOString(),
      confirmation_key: null,
    })
    .where(eq(newsletter.confirmation_key, confirmationKey ?? ""));

  return { ...props, really: true };
};

export default function ConfirmEmail(props: Props) {
  return (
    <div>
      {/* To avoid confirmation by non-browser reqs (ex: preview, email anti-spam...) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          if (!window.location.search.includes('really')) {
            window.location.href = window.location.href + '&really=true'; 
          }`,
        }}
      />
      {props.really && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-4xl font-bold mb-4">Inscrição Confirmada!</h1>
            <p className="text-lg mb-8">
              Obrigado por se inscrever na minha newsletter pessoal. Você
              receberá atualizações interessantes em breve!
            </p>
            <svg
              className="w-24 h-24 mx-auto mb-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
