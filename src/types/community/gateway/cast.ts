import type { SocialLinks } from "./card";

export interface CastData {
  name: string;
  desktopImage: ImageMetadata;
  mobileImage: ImageMetadata;
  days: string;
  socials: SocialLinks;
}
