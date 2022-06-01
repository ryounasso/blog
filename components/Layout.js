import Head from "next/head";
import Link from "next/link";

const Layout = (props) => {
  const { title, children } = props;
  const siteTitle = "ryounasso blog";

  return (
    <div className="container mx-auto max-w-xl min-h-screen prose sm:prose-sm prose-headings:text-[#333333]">
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="flex justify-center items-center relative">
          <h1 className="text-center">
            <Link href="/">
              <a className="font-bold text-lg md:text-2xl block pt-3 mb-3">
                {siteTitle}
              </a>
            </Link>
          </h1>
          <input
            type="checkbox"
            className="toggle absolute right-1 bg-white"
          ></input>
        </div>
      </header>

      <main>
        <div>
          {title ? <h1 className="text-lg md:text-2xl">{title}</h1> : ``}
          <div>{children}</div>
        </div>
      </main>

      <footer className="font-[16] md:font-[18] text-center">
        &copy; {siteTitle}
      </footer>
    </div>
  );
};

export default Layout;
