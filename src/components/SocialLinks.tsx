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

  const className =
    'flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200';

  return (
    <div className='flex items-center gap-2'>
      {facebook && (
        <a href={facebook} target='_blank' rel='noopener noreferrer' className={className}>
          <FacebookIcon className={`${sizeClass}`} />
        </a>
      )}
      {twitter && (
        <a href={twitter} target='_blank' rel='noopener noreferrer' className={className}>
          <TwitterIcon className={`${sizeClass}`} />
        </a>
      )}
      {instagram && (
        <a href={instagram} target='_blank' rel='noopener noreferrer' className={className}>
          <InstagramIcon className={`${sizeClass}`} />
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target='_blank' rel='noopener noreferrer' className={className}>
          <LinkedinIcon className={`${sizeClass}`} />
        </a>
      )}
    </div>
  );
}
