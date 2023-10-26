<script lang="ts">
  export let matchup: {
    team1: string;
    team2: string;
    team1Record: string;
    team2Record: string;
    team1Score: number;
    team2Score: number;
    team1Proj: number;
    team2Proj: number;
  };
</script>

<div class="flex gap-2 bg-base-100 rounded px-2 h-12 shrink-0">
  <div>
    <div>{matchup.team1}</div>
    <div>{matchup.team2}</div>
  </div>
  <div class="text-xs flex flex-col h-full justify-center gap-2">
    <div>({matchup.team1Record})</div>
    <div>({matchup.team2Record})</div>
  </div>
  <div class="font-bold text-info">
    <div>{matchup.team1Score}</div>
    <div>{matchup.team2Score}</div>
  </div>
  <div class="text-xs flex flex-col h-full justify-center gap-1">
    <div>{matchup.team1Proj}</div>
    <div>{matchup.team2Proj}</div>
  </div>
</div>
