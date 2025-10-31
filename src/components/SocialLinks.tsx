import { FacebookIcon, TwitterIcon, LinkedinIcon, MailIcon, InstagramIcon } from '../icons';

export interface SocialLinksProps {
  twitter?: string;
  linkedin?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
}

export default function SocialLinks({ facebook, twitter, linkedin, email, instagram }: SocialLinksProps) {
  return (
    <div className='flex items-center gap-2'>
      {facebook && (
        <a href={facebook} target='_blank' rel='noopener noreferrer'>
          <FacebookIcon className='size-4 text-blue-600 hover:text-blue-700' />
        </a>
      )}
      {twitter && (
        <a href={twitter} target='_blank' rel='noopener noreferrer'>
          <TwitterIcon className='size-4 text-blue-400 hover:text-blue-500' />
        </a>
      )}
      {instagram && (
        <a href={instagram} target='_blank' rel='noopener noreferrer'>
          <InstagramIcon className='size-4 text-blue-400 hover:text-blue-500' />
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target='_blank' rel='noopener noreferrer'>
          <LinkedinIcon className='size-4 text-blue-700 hover:text-blue-800' />
        </a>
      )}
      {email && (
        <a href={`mailto:${email}`}>
          <MailIcon className='size-4 text-gray-600 hover:text-gray-700' />
        </a>
      )}
    </div>
  );
}
