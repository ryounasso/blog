import fs from "fs";
import path from "path";

import Layout from "../../components/Layout";
import { listContentFiles, readContentFile } from "../../lib/content-loader";

import Head from "next/head";

const headers = { "X-API-KEY": process.env.CMS_API_KEY };

export default function Post(params) {
  const content =
    "https://og-image-ryounasso.vercel.app/" +
    params.title +
    ".png?theme=dark&md=1&fontSize=100px";
  return (
    <>
      <Head>
        <title>{params.title}</title>
        <meta property="og:image" content={content} />
        <meta name="og:title" content={params.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={content} />
        <meta name="twitter:title" content={params.title} />
      </Head>
      <Layout title={params.title}>
        <div className="post-meta">
          <span>{params.published}</span>
        </div>
        <div
          className="post-body prose sm:prose-sm p-4 text-[#333333] prose-headings:text-[#333333] marker:prose-li:text-[#333333]"
          dangerouslySetInnerHTML={{ __html: params.content }}
        />
      </Layout>
    </>
  );
}

// ページコンポーネントで使用する値を用意する

export async function getStaticProps({ params }) {
  const content = await readContentFile({ fs, slug: params.slug });

  return {
    props: {
      ...content,
    },
  };
}

// 有効なURLパラメータを全件返す

export async function getStaticPaths() {
  const paths = listContentFiles({ fs }).map((filename) => ({
    params: {
      slug: path.parse(filename).name,
    },
  }));

  return { paths, fallback: false };
}
