<script lang="ts">
  import type { Image } from "@sanity/types";
  import { buildImage } from "@/lib/sanity";

  export let image: Image,
    width: number = 24;
</script>

<div class="avatar">
  <div class={`w-${width} rounded-full`}>
    {#if image}
      <img src={buildImage(image, width * 4)} alt="user avatar" />
    {:else}
      <img src="/managers/blankManager.png" alt="user avatar" />
    {/if}
  </div>
</div>
