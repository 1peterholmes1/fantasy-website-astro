import type { Image, PortableTextBlock, Slug } from '@sanity/types'
export interface BlogPost {
  date: Date,
  year: number,
  slug: Slug,
  title: string,
  body: PortableTextBlock[],
  type: "preview" | "recap" | "other",
  week: number,
  author: Person,

  _id: string,
  _type: "fantasyWriteup",
  _createdAt: Date,
  _updatedAt: Date,
  _rev: string,
}


export interface Person {
  name: string,
  slug: Slug,
  bio: PortableTextBlock[],
  image: Image,
  playsFantasy: boolean,
  managerID: string,
  hidden: boolean,
  isCustomFantasyRival: boolean,
  fantasyTeamRival?: Person,
  fantasyCustomRival?: {
    customFantasyRivalName: string,
    customFantasyRivalImage: Image,
  }
  fantasyTookOver: number,
  valuePosition: string,
  rookieOrVets: "Rookies" | "Vets",
  fantasyStart: number,
  fantasyTradingScale: number,
  favLeagueMoment: string,
  fantasyPhilosophy: string,
  favoriteTeam: string,
  favoritePlayer: number,
  location: string,
  fantasyMode: "Win Now" | "Tank" | "Rebuild",

  _id: string,
  _type: "person",
  _createdAt: Date,
  _updatedAt: Date,
  _rev: string,
}

export interface LeagueData {
  [league: string]: {
    total_rosters: number,
    loser_bracket_id?: string,
    group_id?: string,
    bracket_id?: number,
    roster_positions: string[],
    previous_league_id?: number,
    league_id: string,
    draft_id: string,
    last_read_id?: string,
    last_pinned_message_id?: string,
    last_message_time: number,
    last_message_text_map?: any,
    last_message_attachment?: any,
    last_author_is_bot: boolean,
    last_author_id: string,
    last_author_display_name: string,
    last_author_avatar?: string,
    last_message_id: string,
    scoring_settings: any,
    sport: 'nfl',
    season_type: string,
    season: string,
    shard: number,
    avatar: string,
    company_id?: string,
    settings: any,
    metadata: any,
    status: string,
    name: string,
  }
}

type booly = 'on' | 'off'

export interface SleeperUser {
  user_id: string,
  settings?: any,
  metadata: {
    team_name: string,
    mention_pn: booly,
    avatar: string,
    archived: booly,
    allow_sms: booly,
    allow_pn: booly,
  },
  league_id: string,
  is_owner: boolean,
  is_bot: boolean,
  display_name: string,
  avatar: string,
  user_name?: string
}

export interface SleeperRoster {
  taxi?: any,
  starters: string[],
  settings: {
    wins: number,
    waiver_position: number,
    waiver_budget_used: number,
    total_moves: number,
    ties: number,
    ppts_decimal: number,
    ppts: number,
    losses: number,
    fpts_decimal: number,
    fpts_against_decimal: number,
    fpts_against: number,
    fpts: number,
  },
  roster_id: number,
  reserve?: any,
  players: string[],
  player_map?: any,
  owner_id: string,
  metadata: {
    streak: string,
    record: string,
    [p_nickname: string]: string
  },
  league_id: string,
  keepers?: any,
  co_owners?: any
}

export interface TeamData {
  avatar: string,
  name: string
}

export interface TeamManagersObject {
  currentSeason: number | null,
  teamManagersMap: {
    [year: number]: {
      [roster_id: string]: {
        team: TeamData;
        managers: string[];
      }
    }
  },
  users: {
    [id: string]: SleeperUser
  }
}
