import SocialLinks from '../../../components/SocialLinks';
import { Merchant } from '../../../types/merchant';

export interface SocialLinksProps {
  merchant: Merchant;
  size?: number;
}

export default function MerchantSocialLinks({ merchant, size = 4 }: SocialLinksProps) {
  if (!merchant.socialLinks) {
    return null;
  }

  const facebook = merchant.socialLinks.facebook;
  const twitter = merchant.socialLinks.twitter;
  const instagram = merchant.socialLinks.instagram;
  const linkedin = merchant.socialLinks.linkedin;

  return <SocialLinks size={size} facebook={facebook} instagram={instagram} twitter={twitter} linkedin={linkedin} />;
}
