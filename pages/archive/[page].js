import fs from "fs";

import Link from "next/link";

import Layout from "../../components/Layout";
import Pager from "../../components/Pager";
import { listContentFiles, readContentFiles } from "../../lib/content-loader";

const COUNT_PER_PAGE = 10;

export default function Archive(props) {
  const { posts, page, total, perPage } = props;
  return (
    <Layout title="アーカイブ">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="p-6 rounded-lg hover:bg-[#2B5FEC] prose hover:prose-a:text-white my-6 max-w-xl shadow-neumorphism hover:shadow-blueNeumorphism group"
        >
          <h2>
            <Link href="/posts/[id]" as={`/posts/${post.slug}`}>
              <a className="text-sm md:text-lg group-hover:text-white">
                {post.title}
              </a>
            </Link>
          </h2>
          <div>
            <span className="text-xs md:text-sm text-left">
              {post.published}
            </span>
          </div>
        </div>
      ))}

      <Pager
        page={page}
        total={total}
        perPage={perPage}
        href="/archive/[page]"
        asCallback={(page) => `/archive/${page}`}
      />

      <style jsx>{`
        .post-teaser {
          margin-bottom: 2em;
        }

        .post-teaser h2 a {
          text-decoration: none;
        }
      `}</style>
    </Layout>
  );
}
// ページコンポーネントで使用する値を用意する

export async function getStaticProps({ params }) {
  const page = parseInt(params.page, 10);
  const end = COUNT_PER_PAGE * page;
  const start = end - COUNT_PER_PAGE;
  const posts = await readContentFiles({ fs });

  return {
    props: {
      posts: posts.slice(start, end),
      page,
      total: posts.length,
      perPage: COUNT_PER_PAGE,
    },
  };
}

// 有効なURLパラメータを全件返す

export async function getStaticPaths() {
  const posts = await listContentFiles({ fs });
  const pages = range(Math.ceil(posts.length / COUNT_PER_PAGE));
  const paths = pages.map((page) => ({
    params: { page: `${page}` },
  }));

  return { paths: paths, fallback: false };
}

// ユーティリティ: 1から指定された整数まで格納したArrayを返す

function range(stop) {
  return Array.from({ length: stop }, (_, i) => i + 1);
}
