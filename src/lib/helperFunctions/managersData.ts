import { managersStore, teamManagersStore } from '@/lib/stores'
import { getLeagueData } from './leagueData'
import { leagueID } from '@/lib/leagueInfo'
import type { SleeperUser, SleeperRoster, TeamData, TeamManagersObject } from '../types'
import { get } from 'svelte/store'
import { getTeamData, rosterToManagers } from './universalFunctions'

export const getManagers = async () => {
  if (get(managersStore) && get(managersStore).length > 0) {
    return get(managersStore)
  }

  try {
    //FIXME: Change to ideally not have to use the whole hostname
    const managers = await fetch('http://localhost:4321/api/managers')
    const managersData = await managers.json()
    managersStore.update(() => managersData)
  } catch (e) {
    console.error(e)
  }

  return get(managersStore)
}

export const getLeagueTeamManagers = async () => {
  if (get(teamManagersStore) && get(teamManagersStore).currentSeason) {
    return get(teamManagersStore);
  }
  let currentLeagueID = leagueID;
  let teamManagersMap: { [year: number]: { [roster_id: string]: { team: TeamData, managers: string[] } } } = {};
  let finalUsers: { [id: string]: SleeperUser } = {};
  let currentSeason = null;

  // loop through all seasons and create a [year][roster_id]: team, managers object
  while (currentLeagueID && parseInt(currentLeagueID) != 0) {
    try {
      const usersRaw = await fetch(`https://api.sleeper.app/v1/league/${currentLeagueID}/users`)
      const leagueData = await getLeagueData(currentLeagueID)
      const rostersRaw = await fetch(`https://api.sleeper.app/v1/league/${currentLeagueID}/rosters`)

      const users: SleeperUser[] = await usersRaw.json()
      const rosters: SleeperRoster[] = await rostersRaw.json()

      const year = parseInt(leagueData.season);

      currentLeagueID = leagueData.previous_league_id;

      if (!currentSeason) {
        currentSeason = year;
      }

      teamManagersMap[year] = {};
      const processedUsers = await processUsers(users);

      // in order to not overwrite most recent data, only add new entries to finalUsers
      for (const processedUserKey in processedUsers) {
        if (finalUsers[processedUserKey]) continue;
        finalUsers[processedUserKey] = processedUsers[processedUserKey];
      }
      for (const roster of rosters) {
        teamManagersMap[year][roster.roster_id] = {
          team: getTeamData(processedUsers, roster.owner_id),
          managers: rosterToManagers(roster),
        };
      }

    } catch (e) {
      console.error(e)
    }
  }

  // TODO: Fix Previous Winners
  // teamManagersMap[2020] = [
  //   { managers: [{ managerID: 0 }] },
  //   {
  //     //first place index 1 (Aidan)
  //     managers: [{
  //       managerID: parseInt('995826221885820928')
  //     }],
  //     team: { name: 'Aidan Martin' }
  //   },
  //   {
  //     //toilet index 2 (Vamsi)
  //     managers: [{
  //       managerID: parseInt('997938625302020096')
  //     }]
  //   },
  //   { managers: [{ managerID: 3 }] },
  //   { managers: [{ managerID: 4 }] },
  //   { managers: [{ managerID: 5 }] },
  //   { managers: [{ managerID: 6 }] },
  //   {
  //     //second place index 7 (AJ)
  //     managers: [{
  //       managerID: parseInt('995102464678354944')
  //     }],
  //     team: { name: 'Aayush Jonnagadla' }
  //   },
  //   { managers: [{ managerID: 8 }] },
  //   { managers: [{ managerID: 9 }] },
  //   { managers: [{ managerID: 10 }] },
  //   {
  //     //third place index 11 (Soham)
  //     managers: [{
  //       managerID: 123
  //     }],
  //     team: { name: 'Soham Saxena' }
  //   },
  // ]
  //
  // teamManagersMap[2021] = [
  //   {
  //     //toilet index 0 (Austin)
  //     managers: [{
  //       managerID: 321
  //     }],
  //     team: { name: 'Austin Roberts' }
  //   },
  //   { managers: [{ managerID: 1 }] },
  //   { managers: [{ managerID: 2 }] },
  //   { managers: [{ managerID: 3 }] },
  //   { managers: [{ managerID: 4 }] },
  //   { managers: [{ managerID: 5 }] },
  //   { managers: [{ managerID: 6 }] },
  //   {
  //     //second place index 7 (AJ)
  //     managers: [{
  //       managerID: parseInt('995102464678354944')
  //     }],
  //     team: { name: 'Aayush Jonnagadla' }
  //   },
  //   { managers: [{ managerID: 8 }] },
  //   { managers: [{ managerID: 9 }] },
  //   {
  //     //third place index 10 (Dean)
  //     managers: [{
  //       managerID: parseInt('730197380263178240')
  //     }],
  //     team: { name: 'Dean Tessone' }
  //   },
  //   {
  //     //first place index 11 (Soham)
  //     managers: [{
  //       managerID: 123
  //     }],
  //     team: { name: 'Soham Saxena' }
  //   },
  // ]
  //
  // teamManagersMap[2022] = [
  //   { managers: [{ managerID: 0 }] },
  //   { managers: [{ managerID: 1 }] },
  //   { managers: [{ managerID: 2 }] },
  //   { managers: [{ managerID: 3 }] },
  //   {
  //     //toilet index 4 (Saagar)
  //     managers: [{
  //       managerID: parseInt('995130048317288448')
  //     }],
  //     team: { name: 'Saagar Basavaraju' }
  //   },
  //   {
  //     //third place index 5 (Lorcan)
  //     managers: [{
  //       managerID: parseInt('997942394978910208')
  //     }],
  //     team: { name: 'Lorcan Kelly' }
  //   },
  //   { managers: [{ managerID: 6 }] },
  //   { managers: [{ managerID: 7 }] },
  //   {
  //     //first place index 8 (Kiran)
  //     managers: [{
  //       managerID: parseInt('871231829326413824')
  //     }],
  //     team: { name: 'Kiran Krishnamurthi' }
  //   },
  //   {
  //     //second place index 9 (Ian)
  //     managers: [{
  //       managerID: parseInt('995101418782531584')
  //     }],
  //     team: { name: 'Ian Broadbooks' }
  //   },
  // ]

  const response: TeamManagersObject = {
    currentSeason,
    teamManagersMap,
    users: finalUsers,
  }
  teamManagersStore.update(() => response);
  return response;
}


const processUsers = async (rawUsers: SleeperUser[]) => {
  let finalUsers: { [id: string]: SleeperUser } = {};
  let managers = []
  managers = await getManagers()
  for (const user of rawUsers) {
    user.user_name = user.user_name ?? user.display_name;
    finalUsers[user.user_id] = user;
    const manager = managers.find(m => m.managerID === user.user_id);
    if (manager) {
      finalUsers[user.user_id].display_name = manager.name;
    }
  }
  return finalUsers;
}
