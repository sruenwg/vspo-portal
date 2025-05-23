import { Clip } from "@/features/clips";

export type LiveStatus = "archive" | "live" | "upcoming";
export type Platform = "youtube" | "twitch" | "twitcasting" | "nicovideo";
export type PlatformWithChat = Extract<Platform, "youtube" | "twitch">;

export type Video = Livestream | Clip;

export type Livestream = {
  id: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  thumbnailUrl: string;
  scheduledStartTime: string;
  actualEndTime?: string;
  iconUrl: string;
  platform: Platform;
  link?: string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  twitchName?: string;
  createdAt?: string;
  twitchPastVideoId?: string;
  isTemp?: boolean;
  tempUrl?: string;
  formattedDateString?: string;
};
