<script lang="ts">
    import type { Person, TeamManagersObject } from "@/lib/types";
    import ManagerRow from "./ManagerRow.svelte";

    export let managers: Person[], leagueTeamManagers: TeamManagersObject;

    let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<div class="managerContainer">
    <h2>PAC-10 Managers</h2>
    <div class="managerConstrained">
        {#each managers as manager, key}
            {#if !manager.hidden}
                <ManagerRow {manager} {leagueTeamManagers} {key} />
            {/if}
        {/each}
    </div>
</div>

<style>
    .managerContainer {
        width: 100%;
        margin: 2em 0 5em;
    }

    .managerConstrained {
        width: 97%;
        max-width: 800px;
        margin: 0 auto;
    }

    h2 {
        text-align: center;
        font-size: 2.8em;
        margin: 2em 0 1.5em;
        line-height: 1em;
    }

    @media (max-width: 520px) {
        h2 {
            text-align: center;
            font-size: 2em;
            margin: 1.5em 0 1em;
            line-height: 1em;
        }
    }
</style>
