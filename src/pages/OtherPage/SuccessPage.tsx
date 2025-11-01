import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";

export default function Success() {
  return (
    <>
      <PageMeta
        title="Success | TailAdmin - React.js Admin Dashboard Template"
        description="Your message has been sent successfully. Thank you for contacting us."
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
            <div className="flex justify-center items-center w-full mb-8">
          <img
            src="images/error/success.svg"
            alt="200"
            className="dark:hidden"
          />
          <img
            src="/images/error/success-dark.svg"
            alt="200"
            className="hidden dark:block"
          />
          </div>
          <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
            ! SUCCESS
          </h1>
          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            Awesome! your message has been sent successfully, Our support team
            will get back to you as soon as possible .
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    </>
  );
}
