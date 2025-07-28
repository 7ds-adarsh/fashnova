import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/src/components/ui/input.jsx';
import { Button } from '@/src/components/ui/button.jsx';

export function SearchBar({
    onSearch,
    placeholder = "Search jewelry, accessories...",
    className = ""
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch && searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <form onSubmit={handleSearch} className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className={`pl-10 pr-10 bg-input-background border-border text-white placeholder:text-muted-foreground transition-colors ${isFocused ? 'border-secondary ring-1 ring-secondary/20' : 'border-border'
                    }`}
            />
            {searchQuery && (
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground hover:text-white"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </form>
    );
}