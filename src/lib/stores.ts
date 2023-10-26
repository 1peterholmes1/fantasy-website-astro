import { writable } from "svelte/store";
import type { BlogPost, LeagueData, Person, TeamManagersObject } from "./types";

export const managersStore = writable<Person[]>([]);
export const postsStore = writable<BlogPost[]>([]);
export const teamManagersStore = writable<TeamManagersObject>()
export const leagueDataStore = writable<LeagueData>({})
