<script lang="ts">
    import Loading from "@/components/Loading.svelte";
    import Post from "./Post.svelte";
    import { getNewestPost } from "@helper/blogPosts";
    let postData = getNewestPost();
</script>

{#await postData}
    <!-- promise is pending -->
    <div class="loading">
        <p>Loading Blog Posts...</p>
        <Loading />
    </div>
{:then post}
    <div class="mx-auto my-2 card w-1/2 bg-base-200 shadow-xl">
        <div class="card-body">
            <h2 class="card-title w-full">Most Recent Blog Post</h2>
            <Post {post} createdAt={post.date} id={post.slug?.current} />
            <div class="btn">
                <a class="viewAll" href="/blog">View More Blog Posts</a>
            </div>
        </div>
    </div>
{:catch error}
    {@debug error}
    <div>Error Loading Blog</div>
{/await}
