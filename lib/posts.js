import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

// getSortedPostsData function
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  // console.log('fileNames: ', fileNames)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')
    // console.log('id: ', id)
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    // console.log('fullPath: ', fullPath)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // console.log('fileContents: ', fileContents)
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    console.log('matterResult: ', matterResult)
    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // console.log('allPostsData: ', allPostsData)
  // Sort posts by date
  // 这个比较函数是传递给 sort 方法的参数，它将根据返回值的正负来确定元素的排序顺序。如果返回值大于 0，则 a 将排在 b 的后面；如果返回值小于 0，则 a 将排在 b 的前面；如果返回值等于 0，则 a 和 b 的顺序保持不变
  return allPostsData.sort((a, b) => {
    console.log('a.date: ', a.date)
    console.log('b.date: ', b.date)
    console.log('sort ', a.date > b.date)
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// 返回目录中的 posts 文件名列表（不包括 .md ）
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

// 根据以下内容 id 返回发布数据
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = remark ? await remark().use(html).process(matterResult.content) : ''
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
