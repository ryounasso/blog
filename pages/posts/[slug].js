import fs from "fs"
import path from "path"

import Layout from "../../components/Layout"
import { listContentFiles, readContentFile } from "../../lib/content-loader"

export default function Post(params) {
    return (
        <Layout title={params.title}>
            <div className="post-meta">
                <span>{params.published}</span>
            </div>
            <div className="post-body"
                dangerouslySetInnerHTML={{ __html: params.content }}
            />
        </Layout>
    )
}

// ページコンポーネントで使用する値を用意する

export async function getStaticProps({ params }) {
    const content = await readContentFile({ fs, slug: params.slug })

    return {
        props: {
            ...content
        }
    }
}

// 有効なURLパラメータを全件返す

export async function getStaticPaths() {
    const paths = listContentFiles({ fs })
    .map((filename) => ({
        params: {
            slug: path.parse(filename).name,
        }
    }))

    return { paths, fallback: false }
}

// async function readContentFile({ fs, slug }) {
//     return {
//         title: "竹取物語",
//         published: "2020/07/23",
//         content: "今は昔竹取翁と云ふものありけり。野山に混じりて、竹を取りつつ、"
//     }
// }

// function listContentFiles({ fs }) {
//     return ["taketori.md"]
// }