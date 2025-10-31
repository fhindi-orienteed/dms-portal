export interface Props {
  title?: string;
  subTitle?: string;
}

export default function LineItemText({ title, subTitle }: Props) {
  return (
    <div className='flex flex-col gap-2'>
      <p className='font-medium text-gray-800 text-theme-sm dark:text-white/90'>{title}</p>
      <p className='text-xs text-gray-500 dark:text-gray-400'>{subTitle}</p>
    </div>
  );
}
