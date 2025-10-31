import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from '../icons';

export interface SocialLinksProps {
  twitter?: string;
  linkedin?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  size?: number;
}

export default function SocialLinks({ facebook, twitter, linkedin, instagram, size = 4 }: SocialLinksProps) {
  const sizeClass = `size-${size}`;

  return (
    <div className='flex items-center gap-2'>
      {facebook && (
        <a href={facebook} target='_blank' rel='noopener noreferrer'>
          <FacebookIcon className={`${sizeClass} text-blue-600 hover:text-blue-700`} />
        </a>
      )}
      {twitter && (
        <a href={twitter} target='_blank' rel='noopener noreferrer'>
          <TwitterIcon className={`${sizeClass} text-blue-400 hover:text-blue-500`} />
        </a>
      )}
      {instagram && (
        <a href={instagram} target='_blank' rel='noopener noreferrer'>
          <InstagramIcon className={`${sizeClass} text-blue-400 hover:text-blue-500`} />
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target='_blank' rel='noopener noreferrer'>
          <LinkedinIcon className={`${sizeClass} text-blue-700 hover:text-blue-800`} />
        </a>
      )}
    </div>
  );
}
