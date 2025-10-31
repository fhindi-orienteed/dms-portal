import SocialLinks from '../../../components/SocialLinks';
import { Merchant } from '../../../types/merchant';

export interface SocialLinksProps {
  merchant: Merchant;
}

export default function MerchantSocialLinks({ merchant }: SocialLinksProps) {
  if (!merchant.socialLinks) {
    return null;
  }

  const facebook = merchant.socialLinks.facebook;
  const twitter = merchant.socialLinks.twitter;
  const instagram = merchant.socialLinks.instagram;
  const linkedin = merchant.socialLinks.linkedin;
  const email = merchant.email;

  return <SocialLinks facebook={facebook} instagram={instagram} twitter={twitter} linkedin={linkedin} email={email} />;
}
