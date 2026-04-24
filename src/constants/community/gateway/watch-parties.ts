import type { CardItem } from "@app-types/community/gateway";

import hoshimiIcon from "@assets/community/gateway/watch-parties/hoshimi.webp";
import tallemiEllaIcon from "@assets/community/gateway/watch-parties/tallemi-ella.webp";

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
    name: "タルレミ・エラ",
    description:
      "Overwatchの伝道師として多大な人気を誇るVtuber。影響力も非常に大きく、彼女の配信を通じて競技シーンに興味を持つファンも数多い。本大会では、若手プレイヤーたちの活躍を視聴者と一緒に見届けます！",
    logoImage: tallemiEllaIcon,
    socials: {
      twitch: "https://www.twitch.tv/tallemi_ella",
      twitter: "https://x.com/Tallemi_Ella",
      youtube: "https://www.youtube.com/@Tallemi_Ella",
    },
  },
];
