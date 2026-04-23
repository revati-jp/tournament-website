import type { CardItem } from "@app-types/community/gateway";

import hoshimiIcon from "@assets/community/gateway/watch-parties/hoshimi.webp";
import placeHolderRevatiIcon from "@assets/community/gateway/watch-parties/revati.webp";

export const GATEWAY_WATCH_PARTIES: CardItem[] = [
  {
    name: "hoshimi",
    description:
      "元Overwatch日本代表であり、現在は公式大会のキャスターとしても活躍するhoshimiさんによるウォッチパーティーを実施します！\n元日本代表視点の鋭い分析と、初心者の方にも分かりやすい丁寧な解説が魅力です。",
    logoImage: hoshimiIcon,
    socials: {
      youtube: "https://www.youtube.com/channel/UCrthRmSTaigZPzz9KGYVF2g",
      twitch: "https://www.twitch.tv/hoshimi0000",
      twitter: "https://x.com/tf2hoshimi",
    },
  },
  {
    name: "？？？",
    description: "",
    logoImage: placeHolderRevatiIcon,
    socials: {},
  },
];
