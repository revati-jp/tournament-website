export interface SocialLinks {
  youtube?: string;
  twitch?: string;
  twitter?: string;
  instagram?: string;
  line?: string;
}

export interface CardItem {
  name: string;
  description: string;
  logoImage: string | ImageMetadata;
  website?: string;
  socials: SocialLinks;
}
