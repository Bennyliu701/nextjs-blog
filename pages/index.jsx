import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'

// 在 Next.js 中，getStaticProps 是一个特殊的函数。当您在页面组件中导出 getStaticProps 函数时，Next.js 会自动调用该函数，并将返回的数据作为 props 传递给组件。

// 在 getStaticProps 函数中，您可以执行任何异步操作，例如从数据库或文件系统获取数据。然后，您可以将这些数据作为 props 返回，以便在组件中使用。

// 在您的情况下，当您在 pages/index.js 文件中导出 getStaticProps 函数并返回 allPostsData，Next.js 会自动调用该函数并将返回的数据传递给 Home 组件。这样，您可以在 Home 组件中通过 props 参数访问 allPostsData。

// 需要注意的是，getStaticProps 函数只会在构建时运行一次，并不会在每个请求时执行。这意味着它适用于静态页面，例如博客文章列表，其中数据在构建时就已经确定，并且在每个请求中都是相同的。

// 如果您需要根据每个请求动态获取数据，您可以使用 getServerSideProps 函数。这个函数会在每个请求时执行，并将数据传递给组件。
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Hi i'm Benny]-stage</p>
        <p>
          (This is a sample website - you'll be building a site like this on{' '}
          <a href='https://www.nextjs.cn/learn'>our Next.js tutorial1</a>.)
        </p>
      </section>
      <Link legacyBehavior href='/posts/first-post'>
        <a>← Go to Posts</a>
      </Link>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link legacyBehavior href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
