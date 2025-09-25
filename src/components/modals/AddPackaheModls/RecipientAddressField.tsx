import TextArea from '../../form/input/TextArea';
import Label from '../../form/Label';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RecipientAddressField({ value, onChange }: Props) {
  return (
    <div>
      <Label htmlFor="recipientAddress">Recipient Address *</Label>
      <TextArea
        placeholder="Street address, city, state, postal code"
        rows={3}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}