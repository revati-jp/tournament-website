import type { SocialLinks } from "./common";

export interface WatchParty {
  name: string;
  description: string;
  logoImage: string | ImageMetadata;
  socials: SocialLinks;
}
