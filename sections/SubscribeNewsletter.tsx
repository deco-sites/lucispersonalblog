
interface Props {
  submissionStatus?: {
    success: boolean;
    message: string;
  }
}

export const action = (props: Props) => {

  return 
}

const SubscribeNewsletter = (props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Subscribe to Our Newsletter</h1>
      </div>
      <div className="w-full max-w-md">
        <form
          hx-post="/live/invoke/site/actions/subscribe.ts"
          hx-target="#response"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              hx-request="click"
              hx-indicator=".htmx-indicator"
            >
              <span className="htmx-indicator hidden">Subscribing...</span>
              <span className="htmx-no-indicator">Subscribe</span>
            </button>
          </div>
        </form>
        <div id="response" className="mt-4 text-center"></div>
      </div>
    </div>
  );
};

export default SubscribeNewsletter;