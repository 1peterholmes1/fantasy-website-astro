<script lang="ts">
  import ScoreTickerItem from "./ScoreTickerItem.svelte";
  let dummyScores = [
    {
      team1: "...Deshaun...Really?",
      team2: "Mickey Mouse Clubhouse",
      team1Score: 124,
      team2Score: 123,
      team1Proj: 125,
      team2Proj: 123,
      team1Record: "7-3",
      team2Record: "6-4",
    },
    {
      team1: "...Deshaun...Really?",
      team2: "Mickey Mouse Clubhouse",
      team1Score: 124,
      team2Score: 123,
      team1Proj: 125,
      team2Proj: 123,
      team1Record: "7-3",
      team2Record: "6-4",
    },
    {
      team1: "...Deshaun...Really?",
      team2: "Mickey Mouse Clubhouse",
      team1Score: 124,
      team2Score: 123,
      team1Proj: 125,
      team2Proj: 123,
      team1Record: "7-3",
      team2Record: "6-4",
    },
    {
      team1: "...Deshaun...Really?",
      team2: "Mickey Mouse Clubhouse",
      team1Score: 124,
      team2Score: 123,
      team1Proj: 125,
      team2Proj: 123,
      team1Record: "7-3",
      team2Record: "6-4",
    },
    {
      team1: "...Deshaun...Really?",
      team2: "Mickey Mouse Clubhouse",
      team1Score: 124,
      team2Score: 123,
      team1Proj: 125,
      team2Proj: 123,
      team1Record: "7-3",
      team2Record: "6-4",
    },
    {
      team1: "...Deshaun...Really?",
      team2: "Mickey Mouse Clubhouse",
      team1Score: 124,
      team2Score: 123,
      team1Proj: 125,
      team2Proj: 123,
      team1Record: "7-3",
      team2Record: "6-4",
    },
  ];

  let nflState = {
    season_start_date: "2023-09-07",
    previous_season: "2022",
    league_create_season: "2023",
    display_week: 7,
    league_season: "2023",
    season_type: "regular",
    season: "2023",
    leg: 7,
    week: 7,
  };
</script>

<div class="w-screen h-16 flex items-center gap-4 bg-gray-500 px-2">
  <div class="text-center h-14 bg-base-200 font-bold rounded py-1 min-w-[60px]">
    <span class="">Week {nflState.week} Scores</span>
  </div>
  <div class="flex gap-4 overflow-x-auto hidescroll">
    {#each dummyScores as matchup}
      <ScoreTickerItem {matchup} />
    {/each}
  </div>
</div>

<style>
  .hidescroll::-webkit-scrollbar {
    display: none;
  }
  .hidescroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
