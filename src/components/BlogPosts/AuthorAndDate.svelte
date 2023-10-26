<script lang="ts">
    import { parseDate } from "@/lib/utils";
    import Avatar from "@/components/Avatar.svelte";
    import type { Person } from "@/lib/types";

    export let type: string, author: Person, createdAt: string;
</script>

<div class="flex flex-col items-center">
    <div class="flex justify-center items-center gap-2">
        <a
            href={`/manager?manager=${author.slug?.current}`}
            class="link link-hover"
        >
            <span class="flex gap-2 items-center">
                <Avatar image={author.image} width={12} />
                <span class="author">{author.name}</span>
            </span>
        </a>
        -
        <span><i>{parseDate(createdAt)}</i></span>
    </div>
    <div class="btn btn-info btn-xs">
        <a href="/blog?filter={type}&page=1">{type}</a>
    </div>
</div>
