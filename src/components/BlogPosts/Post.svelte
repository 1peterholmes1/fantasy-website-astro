<script lang="ts">
    import { fly } from "svelte/transition";
    import AuthorAndDate from "./AuthorAndDate.svelte";
    import { PortableText } from "@portabletext/svelte";
    import type { BlogPost, Person } from "@/lib/types";
    import type { PortableTextBlock } from "@sanity/types";

    export let post: BlogPost,
        createdAt: Date,
        id: string | null = null,
        direction: number = 1;

    console.log(post);

    let safePost = false;
    let title: string,
        body: PortableTextBlock[],
        type: "recap" | "preview" | "other",
        author: Person,
        week: number,
        date: Date,
        year: number;

    if (post != null) {
        ({ title, body, type, author, week, date, year } = post);
        if (!title) {
            console.error("Invalid post: No title provided");
        } else if (!body) {
            console.error(`Invalid post (${title}): No body provided`);
        } else if (!type) {
            console.error(`Invalid post (${title}): No type provided`);
        } else if (!author) {
            console.error(`Invalid post (${title}): No author provided`);
        } else if (!date || !week || !year) {
            console.error("Invalid post");
        } else {
            safePost = true;
        }
    }

    const duration = 300;

    let e: any;

    $: isOverflown = e ? e.scrollHeight > e.clientHeight : false;
</script>

{#if safePost}
    {#key id}
        <div
            in:fly={{ delay: duration, duration: duration, x: 150 * direction }}
            out:fly={{ delay: 0, duration: duration, x: -150 * direction }}
            class="post"
        >
            <a
                href={`/blog/${post.slug.current}`}
                class="link link-primary link-hover text-xl"
            >
                <small>
                    Week {week} of the {year} season
                </small>
                <h3>{title}</h3>
            </a>

            <div
                class="max-h-[9em] overflow-hidden relative"
                bind:this={e}
                style="padding-bottom: {isOverflown ? '3em' : '0'}"
            >
                <article class="prose text-left">
                    <PortableText value={body} />
                </article>
                {#if isOverflown}
                    <div
                        class="absolute bottom-0 left-0 h-12 w-full bg-gradient-to-b from-base-200/0 to-base-200 to-70%"
                    />
                {/if}
            </div>

            <div class="viewFull">
                <a class="btn" href="/blog/{id}">View Full Post</a>
            </div>

            <div class="divider" />

            <AuthorAndDate {type} {author} {createdAt} />
        </div>
    {/key}
{/if}
