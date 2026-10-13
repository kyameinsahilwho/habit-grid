import { useState, useRef, useEffect } from 'react';
import Sortable from 'sortablejs';
import { LucideIcon } from './LucideIcon';
import { IconPicker } from './IconPicker';
import { SiteLogoIcon } from './SiteLogoIcon';
import { parseLocalDate, formatDateStr, calculateDaysBetween } from '../lib/gridUtils';

interface SidebarProps {
  habits: any[];
  config: any;
  onChangeConfig: (newConfig: any) => void;
  onAddHabit: (name: string, icon: string) => void;
  onDeleteHabit: (id: string) => void;
  onReorder: (newHabits: any[]) => void;
  onEditHabitName: (id: string, newName: string) => void;
  onEditHabitIcon: (id: string, newIcon: string) => void;
  onExportPdf: () => void;
  isExporting: boolean;
  width?: number;
}

export function Sidebar({
  habits,
  config,
  onChangeConfig,
  onAddHabit,
  onDeleteHabit,
  onReorder,
  onEditHabitName,
  onEditHabitIcon,
  onExportPdf,
  isExporting,
  width,
}: SidebarProps) {
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Droplet');
  const [activePickerId, setActivePickerId] = useState<string | null>(null); // 'new' or habitId

  const habitListRef = useRef<HTMLDivElement>(null);
  const iconTriggerRef = useRef<HTMLButtonElement>(null);
  const habitIconRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  // Setup SortableJS for drag-and-drop reordering
  useEffect(() => {
    if (!habitListRef.current) return;
    const sortable = new Sortable(habitListRef.current, {
      handle: '.drag-handle',
      animation: 150,
      ghostClass: 'habit-item-drag-fallback',
      onEnd: () => {
        if (!habitListRef.current) return;
        const reorderedIds = Array.from(habitListRef.current.children).map(
          (item: any) => item.dataset.id
        );
        const newHabits = reorderedIds
          .map((id) => habits.find((h) => h.id === id))
          .filter(Boolean);
        onReorder(newHabits);
      },
    });
    return () => {
      sortable.destroy();
    };
  }, [habits, onReorder]);

  const handleAddClick = () => {
    if (!newHabitName.trim()) return;
    onAddHabit(newHabitName.trim(), selectedIcon);
    setNewHabitName('');
  };

  const handleConfigChange = (key: string, value: any) => {
    onChangeConfig({ ...config, [key]: value });
  };

  return (
    <aside
      className="sidebar"
      style={width ? { width: `${width}px`, minWidth: `${width}px` } : undefined}
    >
      <header className="sidebar-header">
        <div className="logo">
          <SiteLogoIcon size={28} className="logo-svg-icon" />
          <h1>Habit<span>Grid</span></h1>
        </div>
        <p className="tagline">Create print-ready beautiful habit sheets</p>
      </header>

      <div className="sidebar-scroll">
        {/* 1. Habits & Questions Section */}
        <div className="settings-section">
          <h2 className="section-title">
            <LucideIcon name="ListChecks" size={13} className="section-title-icon" />
            Habits & Questions
          </h2>
          <div className="add-habit-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Workout, Drink water, Did I feel happy?..."
                maxLength={30}
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddClick();
                }}
              />
              <button
                type="button"
                ref={iconTriggerRef}
                className="picker-btn"
                style={{ marginRight: '6px' }}
                onClick={() => setActivePickerId(activePickerId === 'new' ? null : 'new')}
                title="Choose icon"
              >
                <LucideIcon name={selectedIcon} size={18} />
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddClick}
              disabled={!newHabitName.trim()}
            >
              <LucideIcon name="Plus" size={15} /> Add Item
            </button>
          </div>

          <div className="habit-list-container">
            <h3>
              Your Habits & Questions <span className="badge">{habits.length}</span>
            </h3>
            <div ref={habitListRef} className="habit-list">
              {habits.length === 0 ? (
                <p className="text-muted" style={{ textAlign: 'center', padding: '20px 0', fontSize: '12px' }}>
                  No habits or questions added yet. Create one above!
                </p>
              ) : (
                habits.map((habit) => (
                  <div key={habit.id} className="habit-item" data-id={habit.id}>
                    <div className="habit-item-info">
                      <span className="drag-handle">☰</span>
                      <span
                        ref={(el) => { habitIconRefs.current[habit.id] = el; }}
                        className="habit-item-emoji"
                        title="Click to change icon"
                        onClick={() => setActivePickerId(activePickerId === habit.id ? null : habit.id)}
                      >
                        <LucideIcon name={habit.icon} className="habit-icon-svg" />
                      </span>
                      <span
                        className="habit-item-name"
                        contentEditable
                        suppressContentEditableWarning
                        spellCheck={false}
                        title="Click to edit name"
                        onBlur={(e) => {
                          const val = e.currentTarget.innerText.trim();
                          if (val && val !== habit.name) {
                            onEditHabitName(habit.id, val);
                          } else {
                            e.currentTarget.innerText = habit.name;
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            e.currentTarget.blur();
                          }
                        }}
                      >
                        {habit.name}
                      </span>
                    </div>
                    <div className="habit-item-actions">
                      <button
                        type="button"
                        className="delete-habit-btn"
                        title="Delete habit"
                        onClick={() => onDeleteHabit(habit.id)}
                      >
                        <LucideIcon name="X" size={14} style={{ stroke: 'var(--text-muted)' }} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {habits.length > 0 && <p className="drag-hint">Drag to reorder items</p>}
          </div>
        </div>

        {/* 2. Design & Typography Section */}
        <div className="settings-section">
          <h2 className="section-title">
            <LucideIcon name="Palette" size={13} className="section-title-icon" />
            Design & Typography
          </h2>

          <div className="form-group">
            <label htmlFor="grid-title">Tracker Title</label>
            <input
              type="text"
              id="grid-title"
              value={config.gridTitle}
              onChange={(e) => handleConfigChange('gridTitle', e.target.value)}
              placeholder="e.g., 75 HARD, June Tracker..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title-font">Title Font Style</label>
              <select
                id="title-font"
                value={config.titleFont}
                onChange={(e) => handleConfigChange('titleFont', e.target.value)}
              >
                <option value="outfit">Outfit (Modern)</option>
                <option value="playfair">Playfair (Elegant)</option>
                <option value="abril">Abril Fatface (Bold)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cell-shape">Checkbox Style</label>
              <select
                id="cell-shape"
                value={config.cellShape}
                onChange={(e) => handleConfigChange('cellShape', e.target.value)}
              >
                <option value="square">Square</option>
                <option value="rounded">Rounded Square</option>
                <option value="circle">Circle</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="select-period-mode">Timeframe Mode</label>
              <select
                id="select-period-mode"
                value={config.periodMode}
                onChange={(e) => handleConfigChange('periodMode', e.target.value)}
              >
                <option value="days">Specific Days Count</option>
                <option value="month">Full Calendar Month</option>
                <option value="weeks">Consecutive Weeks</option>
                <option value="range">Custom Date Range</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="theme-preset">Color Palette Theme</label>
              <select
                id="theme-preset"
                value={config.themePreset}
                onChange={(e) => handleConfigChange('themePreset', e.target.value)}
              >
                <option value="monochrome">Minimal Monochrome</option>
                <option value="sand-navy">Warm Sand & Navy</option>
                <option value="violet">Royal Violet</option>
                <option value="emerald">Mint Emerald</option>
                <option value="sunset">Bright Sunset</option>
                <option value="ocean">Cool Ocean Blue</option>
                <option value="lavender">Wild Lavender</option>
                <option value="custom">Custom Color Palette...</option>
              </select>
            </div>
          </div>

          {/* Timeframe Subconfigurations */}
          {config.periodMode === 'month' && (
            <div className="form-row" style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid var(--sidebar-border)' }}>
              <div className="form-group">
                <label>Month</label>
                <select
                  value={config.month}
                  onChange={(e) => handleConfigChange('month', parseInt(e.target.value))}
                >
                  <option value={0}>January</option>
                  <option value={1}>February</option>
                  <option value={2}>March</option>
                  <option value={3}>April</option>
                  <option value={4}>May</option>
                  <option value={5}>June</option>
                  <option value={6}>July</option>
                  <option value={7}>August</option>
                  <option value={8}>September</option>
                  <option value={9}>October</option>
                  <option value={10}>November</option>
                  <option value={11}>December</option>
                </select>
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  value={config.year}
                  onChange={(e) => handleConfigChange('year', parseInt(e.target.value))}
                  min={2020}
                  max={2040}
                />
              </div>
            </div>
          )}

          {config.periodMode === 'weeks' && (
            <div className="form-row" style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid var(--sidebar-border)' }}>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={config.startWeekDate}
                  onChange={(e) => handleConfigChange('startWeekDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Weeks</label>
                <input
                  type="number"
                  value={config.weeksCount}
                  onChange={(e) => handleConfigChange('weeksCount', parseInt(e.target.value))}
                  min={1}
                  max={20}
                />
              </div>
            </div>
          )}

          {config.periodMode === 'days' && (
            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid var(--sidebar-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="form-group">
                <label htmlFor="days-calc-mode">Duration Method</label>
                <select
                  id="days-calc-mode"
                  value={config.daysCalculationMode || 'count'}
                  onChange={(e) => handleConfigChange('daysCalculationMode', e.target.value)}
                >
                  <option value="count">I know total days count</option>
                  <option value="endDate">I know start & end date</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={config.startDaysDate}
                    onChange={(e) => {
                      const newDate = e.target.value;
                      const todayStr = formatDateStr(new Date());
                      onChangeConfig({
                        ...config,
                        startDaysDate: newDate,
                        includeToday: newDate === todayStr,
                      });
                    }}
                  />
                </div>

                {(config.daysCalculationMode || 'count') === 'count' ? (
                  <div className="form-group">
                    <label>Total Days</label>
                    <input
                      type="number"
                      value={config.daysCount}
                      onChange={(e) => handleConfigChange('daysCount', parseInt(e.target.value) || 1)}
                      min={1}
                      max={150}
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={config.endDaysDate || config.startDaysDate}
                      onChange={(e) => handleConfigChange('endDaysDate', e.target.value)}
                    />
                  </div>
                )}
              </div>

              <label className="checkbox-container" style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                Include Today ({formatDateStr(new Date())})
                <input
                  type="checkbox"
                  checked={config.includeToday || config.startDaysDate === formatDateStr(new Date())}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const todayStr = formatDateStr(new Date());
                    if (isChecked) {
                      onChangeConfig({
                        ...config,
                        includeToday: true,
                        startDaysDate: todayStr,
                      });
                    } else {
                      onChangeConfig({
                        ...config,
                        includeToday: false,
                      });
                    }
                  }}
                />
                <span className="checkmark"></span>
              </label>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {(config.daysCalculationMode || 'count') === 'count' ? (
                  (() => {
                    const start = parseLocalDate(config.startDaysDate);
                    const days = parseInt(config.daysCount) || 1;
                    const end = new Date(start);
                    end.setDate(start.getDate() + days - 1);
                    return `Calculated End Date: ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
                  })()
                ) : (
                  (() => {
                    const days = calculateDaysBetween(config.startDaysDate, config.endDaysDate || config.startDaysDate);
                    return `Calculated Duration: ${days} day${days === 1 ? '' : 's'}`;
                  })()
                )}
              </div>
            </div>
          )}

          {config.periodMode === 'range' && (
            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid var(--sidebar-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={config.startRangeDate}
                    onChange={(e) => {
                      const newDate = e.target.value;
                      const todayStr = formatDateStr(new Date());
                      onChangeConfig({
                        ...config,
                        startRangeDate: newDate,
                        includeToday: newDate === todayStr,
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={config.endRangeDate}
                    onChange={(e) => handleConfigChange('endRangeDate', e.target.value)}
                  />
                </div>
              </div>

              <label className="checkbox-container" style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                Include Today ({formatDateStr(new Date())})
                <input
                  type="checkbox"
                  checked={config.includeToday || config.startRangeDate === formatDateStr(new Date())}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const todayStr = formatDateStr(new Date());
                    if (isChecked) {
                      onChangeConfig({
                        ...config,
                        includeToday: true,
                        startRangeDate: todayStr,
                      });
                    } else {
                      onChangeConfig({
                        ...config,
                        includeToday: false,
                      });
                    }
                  }}
                />
                <span className="checkmark"></span>
              </label>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {(() => {
                  const days = calculateDaysBetween(config.startRangeDate, config.endRangeDate);
                  return `Calculated Duration: ${days} day${days === 1 ? '' : 's'}`;
                })()}
              </div>
            </div>
          )}

          {/* Custom Palette Override Controls */}
          {config.themePreset === 'custom' && (
            <div id="custom-palette-controls">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pdf-bg-color">Background Color</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      id="pdf-bg-color"
                      value={config.pdfBgColor}
                      onChange={(e) => handleConfigChange('pdfBgColor', e.target.value)}
                    />
                    <span style={{ fontSize: '11px', fontFamily: 'monospace' }}>{config.pdfBgColor}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="pdf-text-color">Accent/Text Color</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      id="pdf-text-color"
                      value={config.pdfTextColor}
                      onChange={(e) => handleConfigChange('pdfTextColor', e.target.value)}
                    />
                    <span style={{ fontSize: '11px', fontFamily: 'monospace' }}>{config.pdfTextColor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="columns-per-row">Columns Layout Split</label>
            <select
              id="columns-per-row"
              value={config.columnsPerRow}
              onChange={(e) => handleConfigChange('columnsPerRow', parseInt(e.target.value))}
            >
              <option value={0}>Single continuous row (No split)</option>
              <option value={10}>Split row every 10 days</option>
              <option value={15}>Split row every 15 days</option>
              <option value={25}>Split row every 25 days</option>
              <option value={31}>Split row every 31 days (Calendar Month)</option>
            </select>
          </div>

          {/* 3. Sheet Elements & Metadata */}
          <div className="settings-section" style={{ marginTop: '12px' }}>
            <h2 className="section-title">
              <LucideIcon name="LayoutTemplate" size={13} className="section-title-icon" />
              Layout Details
            </h2>
            <div className="checkbox-options">
              <label className="checkbox-container">
                Include Start Date Box
                <input
                  type="checkbox"
                  checked={config.showStartDateBox}
                  onChange={(e) => handleConfigChange('showStartDateBox', e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>

              <label className="checkbox-container">
                Show Weekday Letters (Su, Mo, Tu...)
                <input
                  type="checkbox"
                  checked={config.showWeekdays}
                  onChange={(e) => handleConfigChange('showWeekdays', e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>

              <label className="checkbox-container">
                Show Day Numbers
                <input
                  type="checkbox"
                  checked={config.showDayNumbers}
                  onChange={(e) => handleConfigChange('showDayNumbers', e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>

              <label className="checkbox-container">
                Include Notes & Reflections Area
                <input
                  type="checkbox"
                  checked={config.showNotesSection}
                  onChange={(e) => handleConfigChange('showNotesSection', e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>

              <label className="checkbox-container">
                Show Legend on Bottom
                <input
                  type="checkbox"
                  checked={config.showStatusLegend}
                  onChange={(e) => handleConfigChange('showStatusLegend', e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>

          {/* 4. Page Size & Orientation */}
          <div className="settings-section" style={{ marginTop: '12px' }}>
            <h2 className="section-title">
              <LucideIcon name="FileText" size={13} className="section-title-icon" />
              Printable Page Options
            </h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="page-size">Page Size</label>
                <select
                  id="page-size"
                  value={config.pageSize}
                  onChange={(e) => handleConfigChange('pageSize', e.target.value)}
                >
                  <option value="a4">A4 Standard</option>
                  <option value="letter">US Letter</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="page-orientation">Orientation</label>
                <select
                  id="page-orientation"
                  value={config.pageOrientation}
                  onChange={(e) => handleConfigChange('pageOrientation', e.target.value)}
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-actions">
        <button
          type="button"
          id="export-pdf-btn"
          className="btn btn-accent btn-large"
          onClick={onExportPdf}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <LucideIcon name="Loader" size={16} style={{ animation: 'spin 1s linear infinite' }} />
              Generating PDF...
            </>
          ) : (
            <>
              <LucideIcon name="Download" size={16} /> Export to PDF
            </>
          )}
        </button>
      </div>

      {activePickerId === 'new' && (
        <IconPicker
          onSelect={(icon) => setSelectedIcon(icon)}
          onClose={() => setActivePickerId(null)}
          triggerRef={iconTriggerRef}
        />
      )}

      {activePickerId && activePickerId !== 'new' && (
        <IconPicker
          onSelect={(icon) => onEditHabitIcon(activePickerId, icon)}
          onClose={() => setActivePickerId(null)}
          triggerRef={{
            current: habitIconRefs.current[activePickerId] || null,
          }}
        />
      )}
    </aside>
  );
}
