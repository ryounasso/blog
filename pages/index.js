// import Head from 'next/head'
import styles from "../styles/Home.module.css";
import fs from "fs";

import Link from "next/link";

import Layout from "../components/Layout";
import { readContentFiles } from "../lib/content-loader";

export default function Home(props) {
  const { posts, hasArchive } = props;

  return (
    <Layout title="">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="p-6 rounded-lg hover:bg-[#2B5FEC] prose hover:prose-a:text-white max-w-xl m-6 shadow-neumorphism"
        >
          <h2>
            <Link href="/posts/[id]" as={`/posts/${post.slug}`}>
              <a className="text-sm md:text-lg">{post.title}</a>
            </Link>
          </h2>
          <div>
            <span className="text-xs md:text-sm text-left">
              {post.published}
            </span>
          </div>
        </div>
      ))}

      {hasArchive ? (
        <div className="text-right mt-8">
          <Link href="/archive/[page]" as="/archive/1">
            <a className="text-xs md:text-sm">アーカイブ</a>
          </Link>
        </div>
      ) : (
        ``
      )}
    </Layout>
  );
}

// ページコンポーネントで使用する値を用意する

export async function getStaticProps({ params }) {
  const MAX_COUNT = 5;
  const posts = await readContentFiles({ fs });
  const hasArchive = posts.length > MAX_COUNT;

  return {
    props: {
      posts: posts.slice(0, MAX_COUNT),
      hasArchive,
    },
  };
}
