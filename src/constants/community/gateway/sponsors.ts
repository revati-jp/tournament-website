import type { CardItem } from "@app-types/community/gateway";

import xrayPadLogo from "@assets/community/gateway/sponsors/x-raypad.webp";
import undercadeLogo from "@assets/community/gateway/sponsors/undercade.webp";
import eKatsuLogo from "@assets/community/gateway/sponsors/ekatsu.webp";

export const GATEWAY_SPONSORS: CardItem[] = [
  {
    name: "X-Raypad",
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
  {
    name: "e活",
    description:
      "「e活」は、ゲーム大会への支援を行いながら、活発なゲームコミュニティを育て、eスポーツを「生活の一部」として社会に根付かせることをビジョンとしています。熱量のあるゲーム大会へ、資金提供や技術提供など、幅広い分野の提供を行っています。",
    logoImage: eKatsuLogo,
    socials: {
      twitter: "https://x.com/e_ekatsu",
    },
  },
];
