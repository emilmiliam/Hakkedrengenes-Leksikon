import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function FilterPanel({ sortBy, setSortBy, minScore, setMinScore }) {
  return (
    <div className="flex gap-3 flex-wrap">
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sorter efter..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="overall_score">Højeste score</SelectItem>
          <SelectItem value="year_asc">Ældste først</SelectItem>
          <SelectItem value="year_desc">Nyeste først</SelectItem>
          <SelectItem value="episode">Afsnit nummer</SelectItem>
        </SelectContent>
      </Select>

      <Select value={String(minScore)} onValueChange={(v) => setMinScore(Number(v))}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Min. score..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Alle scores</SelectItem>
          <SelectItem value="40">40+ point</SelectItem>
          <SelectItem value="45">45+ point</SelectItem>
          <SelectItem value="48">48+ point</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}