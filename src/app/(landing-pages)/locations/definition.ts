export interface SocialLink {
  platform: string; // Change to string to allow any platform
  url: string;
  icon: string;
}

export interface LocationsDataProps {
  _id: string;
  flag: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  url: string;
  link?: SocialLink[];
  isactive: boolean;
  createdAt: Date;
}

