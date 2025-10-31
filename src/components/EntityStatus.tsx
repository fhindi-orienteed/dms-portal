import { useTranslation } from '../hooks/useTranslation';
import { getStatusColor, getStatusTranslationKey } from '../utils';
import { Badge } from './ui';

export interface Props {
  status?: string;
  entity?: string;
}

export default function EntityStatus({ status, entity }: Props) {
  const { t } = useTranslation();
  const color = getStatusColor(status);
  const labgel = t(getStatusTranslationKey(status, entity));

  return <Badge color={color}>{labgel}</Badge>;
}
