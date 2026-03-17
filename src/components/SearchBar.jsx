import { Input } from '@/components/ui/input';

export default function SearchBar({ value, onChange }) {
  return (
    <Input
      type="text"
      placeholder="Søg efter film..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-sm"
    />
  );
}