import type { Sponsor } from "@types";

import xrayPadLogo from "@assets/community/gateway/sponsors/x-raypad.webp";
import undercadeLogo from "@assets/community/gateway/sponsors/undercade.webp";

export const GATEWAY_SPONSORS: Sponsor[] = [
  {
    name: "X-rayPAD",
    description:
      "世界中のトッププレイヤーに愛用されるX-Raypadは、卓越したコントロール性と耐久性を兼ね備えたゲーミングマウスパッドを展開しています。独自の表面加工により、どんな環境下でも変わらぬ精度と情熱を支えます。",
    logoImage: xrayPadLogo,
    website: "https://shop.x-raypad.com/",
    socials: {
      twitter: "https://x.com/XraypadOfficial",
    },
  },
  {
    name: "Undercade",
    description:
      "「Undercade（アンダーケード）」、遊び心とファッションを追求したブランド。 e-sportsやオタクカルチャーを元にしたナードカジュアルスタイル「U/D」",
    logoImage: undercadeLogo,
    website: "https://undercade.official.ec/",
    socials: {
      twitter: "https://x.com/cade_under",
    },
  },
];
