"use client";

import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { SermonSeriesSummary } from '../../types/sermons';
import SermonSeriesGrid from './SermonSeriesGrid';

interface SermonFiltersProps {
  series: SermonSeriesSummary[];
}

export default function SermonFilters({ series }: SermonFiltersProps) {
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Helper to get UTC year from date string (avoids timezone conversion issues)
  const getUTCYear = (dateString: string): number => {
    const date = new Date(dateString);
    return date.getUTCFullYear();
  };

  // Extract unique years from series StartDate, sorted descending (newest first)
  const years = useMemo(() => {
    const yearSet = new Set<number>();
    series.forEach((s) => {
      if (s.StartDate) {
        const year = getUTCYear(s.StartDate);
        if (!isNaN(year)) {
          yearSet.add(year);
        }
      }
    });
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [series]);

  // Filter series by selected year
  const filteredSeries = useMemo(() => {
    if (selectedYear === 'all') {
      return series;
    }
    const yearNum = parseInt(selectedYear, 10);
    return series.filter((s) => {
      if (!s.StartDate) return false;
      const seriesYear = getUTCYear(s.StartDate);
      return seriesYear === yearNum;
    });
  }, [series, selectedYear]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="sermon-filters">
      <div className="sermon-filters__controls">
        <div className="sermon-filters__select-wrapper">
          <FontAwesomeIcon icon={faCalendarAlt} className="sermon-filters__select-icon" />
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="sermon-filters__select"
            aria-label="Filter by year"
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {selectedYear !== 'all' && (
          <span className="sermon-filters__count">
            {filteredSeries.length} series found
          </span>
        )}
      </div>
      <SermonSeriesGrid series={filteredSeries} isLoading={false} />
    </div>
  );
}

