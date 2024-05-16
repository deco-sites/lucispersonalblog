import { AppContext } from "../apps/site.ts";

export default async function subscribe(
  { }: {  },
  req: Request,
  { invoke, monitoring }: AppContext,
) {
  const email = (await req.formData()).get('email');
  
  const newSubscription = {
    email,
    subscribed_at: new Date().toISOString(),
    confirmed_at: null, // Set to null if the user hasn't confirmed yet
  };


  try {
    // TODO: Make e-mail unique
    const response = await invoke("sqlite/actions/executeSql.ts", {
      sql:
        "INSERT INTO subscriptions (email, subscribed_at, confirmed_at) VALUES (?, ?, ?)",
      args: [
        newSubscription.email,
        newSubscription.subscribed_at,
        newSubscription.confirmed_at,
      ],
    });

    return {
      success: true,
      message: ""
    }

  } catch (e) {
    console.log(e)
    monitoring?.logger.error(e);

    return {
      success: false,
      message: "Houve um erro ao se inscrever. Iremos consertar."
    }
  }


  
}
