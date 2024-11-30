import React, { useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import SearchIcon from './SearchIcon';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isSearchOpen: boolean;
  setSearchOpen: (value: boolean) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  isSearchOpen,
  setSearchOpen,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  return (
    <Draggable
      onStart={(e: DraggableEvent, data: DraggableData) => {
        setIsDragging(false);
        setDragStartPosition({ x: data.x, y: data.y });
      }}
      onDrag={(e: DraggableEvent, data: DraggableData) => {
        const deltaX = Math.abs(data.x - dragStartPosition.x);
        const deltaY = Math.abs(data.y - dragStartPosition.y);
        if (deltaX > 5 || deltaY > 5) {
          setIsDragging(true);
        }
      }}
      onStop={(e: DraggableEvent, data: DraggableData) => {
        setTimeout(() => setIsDragging(false), 100);
      }}
    >
      <div
        className={`search-container ${isSearchOpen ? 'open' : ''}`}
        onClick={(data) => {
          if (!isDragging) {
            setSearchOpen(!isSearchOpen); // 問題なし
          }
        }}
      >
        <div className="search-logo">
          <SearchIcon />
        </div>
        <input
          className="search-input"
          type="text"
          placeholder="Search rooms"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // 検索クエリ更新
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </Draggable>
  );
};

export default SearchBar;
