import { themeColorPresets } from './gridUtils';

export interface PageItem {
  habit: { id: string; name: string; icon: string };
  segments: any[][];
  startIndex: number;
  isContinued: boolean;
}

export interface PartitionedPage {
  items: PageItem[];
  isFirst: boolean;
  isLast: boolean;
}

export function paginateHabits({
  habits,
  config,
  dates,
}: {
  habits: any[];
  config: any;
  dates: any[];
}) {
  const isPortrait = config.pageOrientation === 'portrait';
  const colsPerRow = parseInt(config.columnsPerRow);

  // Group columns by columnsPerRow
  const segments: any[][] = [];
  if (colsPerRow > 0 && dates.length > colsPerRow) {
    for (let i = 0; i < dates.length; i += colsPerRow) {
      segments.push(dates.slice(i, i + colsPerRow));
    }
  } else {
    segments.push(dates);
  }

  const maxCols = Math.max(...segments.map((s) => s.length));

  // Hardcoded pixel equivalents at 96 DPI
  const a4Width = 1123;
  const a4Height = 794;
  const letterWidth = 1056;
  const letterHeight = 816;

  // 1. Calculate space for cell sizing
  const containerWidth =
    config.pageSize === 'a4'
      ? isPortrait
        ? a4Height
        : a4Width
      : isPortrait
        ? letterHeight
        : letterWidth;

  const horizontalMarginPadding = 100; // 50px padding * 2
  const habitLabelColumnWidth = 150; // habit labels column width
  const availableGridWidth = containerWidth - horizontalMarginPadding - habitLabelColumnWidth;

  // Compute cell dimensions dynamically
  const idealCellSize = Math.max(14, Math.min(36, Math.floor(availableGridWidth / maxCols) - 2));

  // 2. Pagination split logic
  const pages: PartitionedPage[] = [];
  let currentPageItems: PageItem[] = [];
  let currentPageHeight = 0;

  // Page height limit
  const paperHeight =
    config.pageSize === 'a4'
      ? isPortrait
        ? a4Width
        : a4Height
      : isPortrait
        ? letterWidth
        : letterHeight;

  const maxPageHeight = paperHeight - 100; // minus 50px padding top & bottom

  const page1HeaderHeight = 140;
  const miniHeaderHeight = 50;

  // Estimate footer height
  let estimatedFooterHeight = 0;
  if (config.showNotesSection || config.showStatusLegend) {
    estimatedFooterHeight += 30; // spacing/borders
    if (config.showNotesSection) estimatedFooterHeight += 130; // notes container + header
    if (config.showStatusLegend) estimatedFooterHeight += 60; // legend container + header
  }

  if (habits.length === 0) {
    pages.push({ items: [], isFirst: true, isLast: true });
  } else {
    const headerRowHeight =
      config.showWeekdays || config.showDayNumbers
        ? config.showWeekdays && config.showDayNumbers
          ? 28
          : 18
        : 0;
    const segmentHeight = headerRowHeight + idealCellSize + 12; // cell size + row gaps

    habits.forEach((habit) => {
      let remainingSegments = [...segments];
      let segmentOffset = 0;
      let isContinued = false;

      while (remainingSegments.length > 0) {
        // Limit for current page (footer is present on every page)
        let currentLimit = maxPageHeight - estimatedFooterHeight;
        if (pages.length === 0 && currentPageItems.length === 0) {
          currentLimit -= page1HeaderHeight;
        } else {
          currentLimit -= miniHeaderHeight;
        }

        // If page is not empty, check if we can fit at least 1 segment of this habit
        const requiredHeightForOneSegment = (isContinued ? 20 : 28) + segmentHeight;

        if (
          currentPageHeight + requiredHeightForOneSegment + 20 > currentLimit &&
          currentPageItems.length > 0
        ) {
          // Start a new page
          pages.push({
            items: currentPageItems,
            isFirst: pages.length === 0,
            isLast: false,
          });
          currentPageItems = [];
          currentPageHeight = 0;

          // Recalculate limit for the new page
          currentLimit = maxPageHeight - estimatedFooterHeight - miniHeaderHeight;
        }

        // Calculate how many segments we can fit on this page
        const availableHeight = currentLimit - currentPageHeight - (isContinued ? 20 : 28) - 20; // minus label height and safety buffer
        let countToFit = Math.floor(availableHeight / segmentHeight);
        countToFit = Math.max(1, countToFit); // Fit at least 1 segment

        const sliceCount = Math.min(countToFit, remainingSegments.length);
        const segmentsForPage = remainingSegments.slice(0, sliceCount);

        const itemHeight = (isContinued ? 20 : 28) + sliceCount * segmentHeight;

        currentPageItems.push({
          habit,
          segments: segmentsForPage,
          startIndex: segmentOffset,
          isContinued,
        });

        currentPageHeight += itemHeight;

        // Advance offsets
        remainingSegments = remainingSegments.slice(sliceCount);
        segmentOffset += sliceCount;
        isContinued = true;
      }
    });

    if (currentPageItems.length > 0) {
      pages.push({
        items: currentPageItems,
        isFirst: pages.length === 0,
        isLast: true,
      });
    }
  }

  if (pages.length > 0) {
    pages[pages.length - 1].isLast = true;
  }

  return {
    pages,
    idealCellSize,
    paperHeight,
    containerWidth,
  };
}
