import type { Person, SleeperRoster, SleeperUser, TeamManagersMap, TeamManagersObject } from "../types";

export const rosterToManagers = (roster: SleeperRoster) => {
  const managers = [];
  if (roster.owner_id) {
    managers.push(roster.owner_id);
  }
  if (roster.co_owners) {
    for (const coOwner of roster.co_owners) {
      managers.push(coOwner);
    }
  }
  return managers;
}

export const getTeamData = (users: { [id: string]: SleeperUser }, ownerID: string) => {
  const user = users[ownerID];
  if (user) {
    return {
      avatar: user.metadata?.avatar ? user.metadata.avatar : `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
      name: user.metadata.team_name ? user.metadata.team_name : user.display_name,
    }
  }
  return {
    avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
    name: 'Unknown Team',
  }
}

export const getDatesActive = (teamManagers: TeamManagersObject, managerID: string, managers?: Person[]) => {
  if (!managerID) return;
  if (managers && managers.find(m => m.managerID == managerID)) {
    let m = managers.find(m => m.managerID == managerID);
    if (!m) return { start: null, end: null };
    return { start: m.fantasyTookOver, end: null }
  }
  let datesActive: { start: null | number, end: null | number } = { start: null, end: null };
  const yearsStr: string[] = Object.keys(teamManagers.teamManagersMap).sort((a: string, b: string) => parseInt(b) - parseInt(a));
  const years = yearsStr.map(y => parseInt(y));
  for (const year of years) {
    for (const rosterID in teamManagers.teamManagersMap[year]) {
      if (teamManagers.teamManagersMap[year][rosterID].managers.indexOf(managerID) > -1) {
        datesActive.start = year;
        if (!datesActive.end) {
          datesActive.end = year;
        }
        break;
      }
    }
  }
  if (datesActive.end == teamManagers.currentSeason) {
    datesActive.end = null;
  }
  return datesActive;
}

export const getRosterIDFromManagerID = (teamManagers: TeamManagersObject, managerID: string) => {
  if (!managerID) return null;
  const yearsStr: string[] = Object.keys(teamManagers.teamManagersMap).sort((a, b) => parseInt(b) - parseInt(a));
  const years: number[] = yearsStr.map(y => parseInt(y));
  for (const year of years) {
    for (const rosterID in teamManagers.teamManagersMap[year]) {
      if (teamManagers.teamManagersMap[year][rosterID].managers.indexOf(managerID) > -1) {
        return { rosterID, year };
      }
    }
  }
  return null;
}

export const getTeamNameFromTeamManagers = (teamManagers: TeamManagersObject, rosterID?: string, year?: number) => {
  if (!teamManagers || !teamManagers.currentSeason) return "Unknown Team"
  if (!rosterID) return 'Unknown Team'
  if (!year || year > teamManagers.currentSeason) {
    year = teamManagers.currentSeason;
  }
  let roster = teamManagers.teamManagersMap[year][rosterID];
  if (roster) {
    return roster.team.name
  }
  return "Unknown Team"
}
