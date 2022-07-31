import Layout from "../../components/layout"
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css';

const Post = ({postData}) => {
    return (
        <Layout>
        <Head><title>{postData.title}</title></Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <br />
            {postData.id}
            <br />
            <Date dateString={postData.date}/>
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    )

}

export async function getStaticPaths(){
    console.log('paths...')
    const paths = getAllPostIds();
    return {paths, fallback: false}
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);

    return {
        props: {
            postData
        }
    }
  }

export default Post;