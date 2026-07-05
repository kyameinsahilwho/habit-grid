import { useEffect, useRef, useState, useLayoutEffect, useMemo } from 'react';
import { LucideIcon } from './LucideIcon';
import { getGridDates, getTimeframeSubtitleText, themeColorPresets } from '../lib/gridUtils';
import { paginateHabits } from '../lib/pagination';
import type { PartitionedPage } from '../lib/pagination';


interface PreviewCanvasProps {
  habits: any[];
  config: any;
  checkedCells: Map<string, boolean>;
  onCellClick: (habitId: string, dateString: string) => void;
  exportPdfRef: React.MutableRefObject<(() => Promise<void>) | null>;
  isExporting: boolean;
  setIsExporting: (val: boolean) => void;
}

export function PreviewCanvas({
  habits,
  config,
  checkedCells,
  onCellClick,
  exportPdfRef,
  isExporting,
  setIsExporting
}: PreviewCanvasProps) {
  const dates = useMemo(() => getGridDates(config), [config]);
  const { pages, idealCellSize, paperHeight, containerWidth } = useMemo(() => paginateHabits({
    habits,
    config,
    dates,
  }), [habits, config, dates]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [notesLines, setNotesLines] = useState<Record<number, number>>({});

  // Dynamic Scaling of pages in viewport
  useEffect(() => {
    function adjustScale() {
      if (!viewportRef.current) return;
      const availableWidth = viewportRef.current.clientWidth - 40;
      if (availableWidth < containerWidth) {
        setScale(availableWidth / containerWidth);
      } else {
        setScale(1);
      }
    }

    adjustScale();
    window.addEventListener('resize', adjustScale);
    return () => window.removeEventListener('resize', adjustScale);
  }, [containerWidth, habits, config]);

  // Calculate notes lines for each page card dynamically based on heights
  useLayoutEffect(() => {
    const newNotesLines: Record<number, number> = {};

    pages.forEach((page, pageIdx) => {
      if (!config.showNotesSection) return;

      const pageEl = document.getElementById(`page-card-${pageIdx}`);
      if (!pageEl) return;

      const contentEl = pageEl.querySelector('.pdf-content') as HTMLElement;
      const headerEl = pageEl.querySelector('.pdf-header') as HTMLElement;
      const gridTableContainer = pageEl.querySelector('.grid-table-container') as HTMLElement;
      const footerEl = pageEl.querySelector('.pdf-footer') as HTMLElement;
      const notesBox = pageEl.querySelector('.pdf-notes-box') as HTMLElement;
      const legendBox = pageEl.querySelector('.pdf-legend-box') as HTMLElement;

      if (contentEl && gridTableContainer && footerEl && notesBox) {
        const contentHeight = contentEl.clientHeight;
        const headerHeight = headerEl ? headerEl.offsetHeight : 0;

        let headerMargin = 0;
        if (headerEl) {
          const headerStyle = window.getComputedStyle(headerEl);
          headerMargin = parseFloat(headerStyle.marginBottom) || 0;
        }

        let tablesHeight = 0;
        const tables = gridTableContainer.querySelectorAll('.habit-segmented-table-wrapper');
        tables.forEach((t: any, idx) => {
          tablesHeight += t.offsetHeight;
          if (idx > 0) tablesHeight += 20; // 20px gap
        });

        let tableContainerMargin = 0;
        const tablesStyle = window.getComputedStyle(gridTableContainer);
        tableContainerMargin = parseFloat(tablesStyle.marginBottom) || 0;

        const footerHeight = footerEl.offsetHeight;
        const legendHeight = legendBox ? legendBox.offsetHeight : 0;
        const emptyNotesBoxHeight = notesBox.offsetHeight;

        const remainingSpace =
          contentHeight -
          (headerHeight + headerMargin + tablesHeight + tableContainerMargin + footerHeight);

        // Adjust remaining space math
        const maxNotesLinesHeight = remainingSpace + Math.max(0, legendHeight - emptyNotesBoxHeight);
        const numLines = Math.max(0, Math.floor((maxNotesLinesHeight + 12) / 26));

        newNotesLines[pageIdx] = numLines;
      }
    });

    setNotesLines(newNotesLines);
  }, [pages, habits, config]);

  // Expose triggerPDFExport to parent through a ref
  useEffect(() => {
    async function getActiveCSS() {
      let cssText = '';
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          if (sheet.href && !sheet.href.startsWith(window.location.origin)) {
            continue;
          }
          const rules = sheet.cssRules || sheet.rules;
          if (rules) {
            for (const rule of Array.from(rules)) {
              cssText += rule.cssText + '\n';
            }
          }
        } catch (e) {
          console.warn('Could not read style rules from stylesheet', sheet.href, e);
        }
      }
      return cssText;
    }

    async function triggerPDFExport() {
      setIsExporting(true);
      try {
        const isPortrait = config.pageOrientation === 'portrait';
        const orientation = isPortrait ? 'portrait' : 'landscape';
        const size = config.pageSize === 'a4' ? 'A4' : 'letter';

        const pageSetupCss = `
          @page {
            size: ${size} ${orientation};
            margin: 0 !important;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
          }
        `;

        const activeCss = (await getActiveCSS()) + '\n' + pageSetupCss;
        const pagesContainer = containerRef.current;
        if (!pagesContainer) {
          throw new Error('PDF pages container not found.');
        }

        // We wrap the pages outerHTML in a container element for backend PDF rendering
        const htmlPayload = `
          <div id="pdf-pages-container" class="pdf-pages-container">
            ${pagesContainer.innerHTML}
          </div>
        `;

        const response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            html: htmlPayload,
            css: activeCss,
            pageSize: size,
            orientation: orientation,
            baseUrl: window.location.origin,
          }),
        });

        if (!response.ok) {
          let errorText = 'Unknown error';
          try {
            const rawText = await response.text();
            try {
              const errData = JSON.parse(rawText);
              errorText = errData.details || errData.error || errorText;
            } catch (_) {
              errorText = rawText || errorText;
            }
          } catch (_) {
            // Fallback
          }
          throw new Error(`Failed to generate PDF: ${errorText}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const cleanTitle = (config.gridTitle || 'habit-grid')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        const filename = `${cleanTitle || 'habit-tracker'}.pdf`;

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      } catch (err: any) {
        console.error('PDF Export Error:', err);
        alert('Error generating PDF: ' + err.message);
      } finally {
        setIsExporting(false);
      }
    }

    exportPdfRef.current = triggerPDFExport;
  }, [config, exportPdfRef, setIsExporting]);

  const isPortrait = config.pageOrientation === 'portrait';
  const presetColors = themeColorPresets[config.themePreset] || themeColorPresets['monochrome'];
  const pageBg = config.themePreset === 'custom' ? config.pdfBgColor : presetColors.bg;
  const pageText = config.themePreset === 'custom' ? config.pdfTextColor : presetColors.text;
  const themeAccent = config.themePreset === 'custom' ? config.pdfTextColor : presetColors.text;

  return (
    <main className="preview-area" ref={viewportRef}>
      <div className="preview-viewport-wrapper">
        <div
          ref={containerRef}
          id="pdf-pages-container"
          className="pdf-pages-container"
        >
          {pages.map((page, pageIdx) => {
            const pageNum = pageIdx + 1;
            const containerStyle: React.CSSProperties = {
              '--pdf-page-bg': pageBg,
              '--pdf-page-text': pageText,
              '--accent': themeAccent,
              transform: scale < 1 ? `scale(${scale})` : 'scale(1)',
              marginBottom: scale < 1 ? `${(paperHeight * (scale - 1))}px` : '0px',
            } as any;

            return (
              <div
                key={pageIdx}
                id={`page-card-${pageIdx}`}
                className={`pdf-page-container format-${config.pageSize} layout-${config.pageOrientation} font-style-${config.titleFont}`}
                style={containerStyle}
              >
                <div className="pdf-content">
                  {/* Render Header */}
                  {page.isFirst ? (
                    <div className="pdf-header">
                      <div className="header-main">
                        <h1 className="pdf-title">{config.gridTitle || 'Personal Habit Tracker'}</h1>
                        <div className="pdf-subtitle">{getTimeframeSubtitleText(config)}</div>
                      </div>
                      <div className="header-right-side">
                        {config.showStartDateBox && (
                          <div className="header-start-date-box">
                            <span className="start-date-label">start<br />date</span>
                            <div className="start-date-rectangle" style={{ borderColor: 'var(--pdf-page-text)' }}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="pdf-header mini-header">
                      <div className="header-main">
                        <span className="pdf-title-mini">{config.gridTitle || 'Personal Habit Tracker'}</span>
                      </div>
                      <div className="header-right-side">
                        <span className="page-num-badge">Page {pageNum} of {pages.length}</span>
                      </div>
                    </div>
                  )}

                  {/* Render Habit Tables */}
                  <div className="grid-table-container">
                    {page.items.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5, fontStyle: 'italic' }}>
                        No habits or questions added yet. Create one in the sidebar!
                      </div>
                    ) : (
                      page.items.map((item, itemIdx) => {
                        const totalRowsInGroup = item.segments.length * 2;
                        return (
                          <div key={itemIdx} className="habit-segmented-table-wrapper">
                            <table className="grid-table" style={{ color: 'var(--pdf-page-text)', borderColor: 'var(--pdf-page-text)' }}>
                              <tbody>
                                {item.segments.map((segmentDates, segIndex) => {
                                  return (
                                    <>
                                      <tr key={`h-${segIndex}`} className="header-row">
                                        {segIndex === 0 && (
                                          <td
                                            className="habit-label-cell"
                                            rowSpan={totalRowsInGroup}
                                            style={{ width: '150px', maxWidth: '150px' }}
                                          >
                                            <div className="habit-label-content">
                                              <span className="habit-label-emoji">
                                                <LucideIcon name={item.habit.icon} size={14} className="habit-icon-svg" />
                                              </span>
                                              <span className="habit-label-text" title={item.habit.name}>
                                                {item.habit.name}
                                                {item.isContinued && <span className="cont-label"> (cont.)</span>}
                                              </span>
                                            </div>
                                          </td>
                                        )}
                                        {segmentDates.map((d: any, dIdx: number) => {
                                          const dayDisplay = config.periodMode === 'days' ? d.absoluteIndex : d.dayNumber;
                                          const weekendClass = d.isWeekend ? 'weekday-header weekend' : 'weekday-header';
                                          return (
                                            <th
                                              key={dIdx}
                                              className={weekendClass}
                                              style={{ width: `${idealCellSize}px`, maxWidth: `${idealCellSize}px` }}
                                            >
                                              {config.showDayNumbers && config.showWeekdays ? (
                                                <>
                                                  <div style={{ fontSize: '7px', fontWeight: 500, opacity: 0.8, textTransform: 'uppercase' }}>
                                                    {d.weekdayLabel}
                                                  </div>
                                                  <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '1px' }}>
                                                    {dayDisplay}
                                                  </div>
                                                </>
                                              ) : config.showDayNumbers ? (
                                                <div style={{ fontSize: '10px', fontWeight: 700 }}>{dayDisplay}</div>
                                              ) : config.showWeekdays ? (
                                                <div style={{ fontSize: '8px', fontWeight: 600, opacity: 0.8, textTransform: 'uppercase' }}>
                                                  {d.weekdayLabel}
                                                </div>
                                              ) : null}
                                            </th>
                                          );
                                        })}
                                      </tr>
                                      <tr
                                        key={`b-${segIndex}`}
                                        className="checkboxes-row"
                                        style={{ height: `${idealCellSize + 6}px` }}
                                      >
                                        {segmentDates.map((d: any, dIdx: number) => {
                                          const cellKey = `${item.habit.id}-${d.dateString}`;
                                          const isChecked = checkedCells.get(cellKey) === true;
                                          const cellShapeClass = `cell-shape-${config.cellShape}`;

                                          return (
                                            <td key={dIdx} className="grid-cell-td">
                                              <div
                                                className={`grid-cell-box ${cellShapeClass} ${isChecked ? 'checked' : ''}`}
                                                style={{
                                                  width: `${idealCellSize}px`,
                                                  height: `${idealCellSize}px`,
                                                  maxWidth: `${idealCellSize}px`,
                                                  maxHeight: `${idealCellSize}px`,
                                                  borderColor: 'var(--pdf-page-text)',
                                                  // @ts-ignore
                                                  '--habit-color': isChecked ? themeAccent : undefined,
                                                }}
                                                onClick={() => onCellClick(item.habit.id, d.dateString)}
                                              ></div>
                                            </td>
                                          );
                                        })}
                                      </tr>
                                    </>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Render Footer */}
                  {(config.showNotesSection || config.showStatusLegend) && (
                    <div className="pdf-footer" style={{ borderTopColor: 'var(--pdf-page-text)' }}>
                      {config.showNotesSection && (
                        <div className="pdf-notes-box">
                          <h3>Notes & Reflections</h3>
                          <div className="notes-lines">
                            {Array.from({ length: notesLines[pageIdx] || 0 }).map((_, lineIdx) => (
                              <div
                                key={lineIdx}
                                className="note-line"
                                style={{ borderBottomColor: 'var(--pdf-page-text)' }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      )}

                      {config.showStatusLegend && (
                        <div className="pdf-legend-box">
                          <h3>Legend</h3>
                          <div className="legend-items">
                            {habits.map((habit) => (
                              <div key={habit.id} className="legend-item">
                                <span
                                  className="legend-color"
                                  style={{
                                    backgroundColor: themeAccent,
                                    borderColor: 'var(--pdf-page-text)',
                                  }}
                                ></span>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  <LucideIcon name={habit.icon} size={12} className="habit-icon-svg" />
                                  {habit.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
