export interface Sponsor {
  name: string;
  description: string;
  logoImage: string | ImageMetadata;
  website: string;
  socials: SocialLinks;
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  line?: string;
}
