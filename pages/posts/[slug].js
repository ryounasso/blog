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
        <meta
          property="og:image"
          content="https://og-image-ryounasso.vercel.app/%E3%82%B5%E3%82%A4%E3%83%9C%E3%82%A6%E3%82%BA%E3%81%95%E3%82%93%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%83%E3%83%97%E3%81%AB%E5%8F%82%E5%8A%A0%E3%81%97%E3%81%A6%E3%81%8D%E3%81%BE%E3%81%97%E3%81%9F%EF%BC%81%EF%BC%81.png?theme=dark&md=1&fontSize=100px"
        />
        <meta name="og:title" content={params.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image"
          content="https://og-image-ryounasso.vercel.app/%E3%82%B5%E3%82%A4%E3%83%9C%E3%82%A6%E3%82%BA%E3%81%95%E3%82%93%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%83%E3%83%97%E3%81%AB%E5%8F%82%E5%8A%A0%E3%81%97%E3%81%A6%E3%81%8D%E3%81%BE%E3%81%97%E3%81%9F%EF%BC%81%EF%BC%81.png?theme=dark&md=1&fontSize=100px"
        />
        <meta name="twitter:title" content={params.title} />
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
