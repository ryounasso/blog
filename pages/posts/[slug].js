import fs from "fs";
import path from "path";

import Layout from "../../components/Layout";
import { listContentFiles, readContentFile } from "../../lib/content-loader";

import Head from "next/head";

const headers = { "X-API-KEY": process.env.CMS_API_KEY };

export default function Post(params) {
  return (
    <>
      <Head>
        <title>{params.title}</title>
        <meta property="og:image" content={props.ogImageUrl} />
      </Head>
      <Layout title={params.title}>
        <div className="post-meta">
          <span>{params.published}</span>
        </div>
        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: params.content }}
        />
      </Layout>
    </>
  );
}

// ページコンポーネントで使用する値を用意する

export async function getStaticProps({ params }) {
  const content = await readContentFile({ fs, slug: params.slug });
  const blogPostUrl = [process.env.CMS_API_URL, params.id].join("/");
  const response = await fetch(blogPostUrl, { headers });
  const { title } = await response.json();
  const baseUrl = {
    production: "https://tdkn.dev",
    development: "https://localhost:3000",
  }[process.env.NODE_ENV];

  return {
    props: {
      ...content,
      ogImageUrl: `${baseUrl}/api/ogp?title=${title}`,
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
  const response = await fetch(process.env.CMS_API_URL, { headers });
  const { contents: posts } = await response.json();

  return { paths, fallback: false };
}
