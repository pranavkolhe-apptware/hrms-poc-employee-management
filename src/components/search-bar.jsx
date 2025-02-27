import { Input } from "./ui/input"
import { Search } from "lucide-react"

const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search employees..."
        className="pl-8"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar

