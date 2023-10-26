<script lang="ts">
    import { onMount } from "svelte";
    import AuthorAndDate from "./AuthorAndDate.svelte";
    import { PortableText } from "@portabletext/svelte";
    import Loading from "@/components/Loading.svelte";
    import type { BlogPost, Person } from "@/lib/types";

    export let postsData: Promise<BlogPost[]>,
        postID: string,
        managersData: Promise<Person[]>;

    let createdAt: string, id: string;

    let safePost = false;
    let loading = true;
    let title, body, type, author;

    let week, year;
    let managers;

    onMount(async () => {
        const post = postsData.posts.filter(
            (p) => p.slug.current === postID
        )[0];
        id = post.slug.current;

        managers = await managersData;

        if (post != null) {
            createdAt = post.date;
            ({ title, body, type, author, week, year } = post);
            if (!title) {
                console.error("Invalid post: No title provided");
            } else if (!body) {
                console.error(`Invalid post (${title}): No body provided`);
            } else if (!type) {
                console.error(`Invalid post (${title}): No type provided`);
            } else if (!author) {
                console.error(`Invalid post (${title}): No author provided`);
            } else if (!week || !year) {
                console.error("Invalid post no week or year");
            } else {
                safePost = true;
            }
        }
        loading = false;
    });
</script>

{#if loading}
    <!-- promise is pending -->
    <div class="loading">
        <p>Loading Blog Post...</p>
        <Loading />
    </div>
{:else if safePost}
    <div class="post">
        <div class="title-block">
            <small>Week {week} of the {year} season</small>
            <h3>{title}</h3>
        </div>

        <div class="body">
            <PortableText class="article-padding" value={body} />
        </div>

        <hr class="divider" />

        <AuthorAndDate {type} {author} {createdAt} {managers} />
    </div>
{/if}
