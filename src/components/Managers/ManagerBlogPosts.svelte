<script lang="ts">
  import { getPostsByAuthor } from "$lib/utils/helper";
  import LinearProgress from "@smui/linear-progress";

  export let manager;

  let postsData = getPostsByAuthor(manager._id);
</script>

<div>
  <h4>Blog Posts by {manager.name}</h4>
  {#await postsData}
    <LinearProgress indeterminate />
  {:then posts}
    <ul>
      {#each posts as post}
        <li>
          <a href={`/blog/${post.slug?.current}`}>{post.title}</a>
        </li>
      {/each}
    </ul>
  {/await}
</div>
