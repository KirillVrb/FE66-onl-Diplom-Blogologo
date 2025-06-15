import { useState } from 'react';
import styles from '../PostsList/posts-list_styles.module.scss';

type TimeFilter = 'day' | 'week' | 'month' | 'year' | 'all';
type SortOrder = 'title-asc' | 'title-desc';

interface SortingControlsProps {
  onTimeFilterChange: (filter: TimeFilter) => void;
  onSortOrderChange: (order: SortOrder) => void;
}

export const SortingControls = ({ 
  onTimeFilterChange, 
  onSortOrderChange 
}: SortingControlsProps) => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('title-asc');

  const handleTimeFilterChange = (filter: TimeFilter) => {
    setTimeFilter(filter);
    onTimeFilterChange(filter);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as SortOrder;
    setSortOrder(order);
    onSortOrderChange(order);
  };

  return (
    <div className={styles.sortingContainer}>
      <div className={styles.timeFilters}>
        <button
          className={`${styles.timeFilterButton} ${timeFilter === 'day' ? styles.active : ''}`}
          onClick={() => handleTimeFilterChange('day')}
        >
          Day
        </button>
        <button
          className={`${styles.timeFilterButton} ${timeFilter === 'week' ? styles.active : ''}`}
          onClick={() => handleTimeFilterChange('week')}
        >
          Week
        </button>
        <button
          className={`${styles.timeFilterButton} ${timeFilter === 'month' ? styles.active : ''}`}
          onClick={() => handleTimeFilterChange('month')}
        >
          Month
        </button>
        <button
          className={`${styles.timeFilterButton} ${timeFilter === 'year' ? styles.active : ''}`}
          onClick={() => handleTimeFilterChange('year')}
        >
          Year
        </button>
        <button
          className={`${styles.timeFilterButton} ${timeFilter === 'all' ? styles.active : ''}`}
          onClick={() => handleTimeFilterChange('all')}
        >
          All
        </button>
      </div>
      
      <div className={styles.sortSelector}>
        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className={styles.sortSelect}
        >
          <option value="title-asc">Sort by: Title (A-Z)</option>
          <option value="title-desc">Sort by: Title (Z-A)</option>
        </select>
      </div>
    </div>
  );
};