export interface SocialLink {
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'P' | 'V';
  url: string;
  icon:string;  // Added lately according change schema
}
export interface EmployersDataProps {
    _id: string;
    title: string;
    name: string;
    photo: string;
    isBestEmployee: boolean;
    links: SocialLink[];
  }
  
  