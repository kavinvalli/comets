import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export const getServerSideProps = async ({ params }) => {
  const app = await prisma.app.findUnique({
    where: {
      id: String(params?.aid),
    },
  });
  return {
    props: app,
  };
};

const App = (props) => {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="w-full h-screen bg-[#eee] flex justify-center items-center flex-col">
      <Link href="/developer" className="rounded shadow-lg">
        <div className="bg-white absolute top-5 left-5 p-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
      </Link>
      <div className="bg-white p-6 rounded shadow-lg">
        <div>
          <strong className="text-lg font-bold">Name:</strong>
          <p>{props.name}</p>
        </div>
        <div>
          <strong className="text-lg font-bold">Unique ID:</strong>
          <p>{props.uname}</p>
        </div>
        <div>
          <strong>Api Key:</strong>
          <div className="flex">
            <p className="mr-3">
              {showApiKey ? props.apiKey : "●".repeat(props.apiKey.length)}
            </p>
            {showApiKey ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
