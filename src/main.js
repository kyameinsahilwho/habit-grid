import './style.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Sortable from 'sortablejs';
import {
    createIcons,
    Droplet,
    Dumbbell,
    BookOpen,
    Brain,
    Apple,
    Camera,
    Bed,
    Flame,
    Smile,
    Coffee,
    DollarSign,
    Laptop,
    Heart,
    Bike,
    Sparkles,
    Music,
    Paintbrush,
    Scale,
    Ban,
    CheckSquare,
    Activity,
    Compass,
    PenTool,
    GraduationCap,
    Sun,
    Moon,
    SmilePlus,
    Utensils,
    Trees,
    X
} from 'lucide';

// ==========================================
// APP STATE & CONSTANTS
// ==========================================
let habits = [
    { id: '1', name: 'Diet Check', icon: 'Apple' },
    { id: '2', name: 'Water (1 Gal)', icon: 'Droplet' },
    { id: '3', name: 'Read 10 Pgs', icon: 'BookOpen' },
    { id: '4', name: 'Workout 1', icon: 'Dumbbell' },
    { id: '5', name: 'Workout 2 (Out)', icon: 'Trees' },
    { id: '6', name: 'Did I meditate?', icon: 'Brain' }
];

let selectedIconName = 'Droplet';

const config = {
    periodMode: 'days', // 'month' | 'weeks' | 'days'

    // Month Mode details
    month: 11, // December (0-indexed)
    year: 2026,

    // Weeks Mode details
    startWeekDate: '2026-06-29',
    weeksCount: 4,

    // Days Mode details
    startDaysDate: '2026-06-28',
    daysCount: 75,

    // General styles
    gridTitle: 'Personal Habit Tracker',
    titleFont: 'outfit', // 'outfit' | 'playfair' | 'abril'
    cellShape: 'rounded', // 'square' | 'rounded' | 'circle'
    columnsPerRow: 25, // 0 (No split) or 10, 15, 25
    themePreset: 'monochrome', // 'sand-navy' | 'violet' | 'emerald' | etc

    // Custom Palette Overrides (used if themePreset === 'custom')
    pdfBgColor: '#dfbca0',
    pdfTextColor: '#0f2d59',

    // Checkbox rules
    showStartDateBox: true,
    showWeekdays: true,
    showDayNumbers: true,
    showNotesSection: true,
    showStatusLegend: false,

    // Print size
    pageSize: 'a4', // 'a4' | 'letter'
    pageOrientation: 'portrait' // 'landscape' | 'portrait'
};

// Theme presets map (Default palette coloring styles)
const themeColorPresets = {
    'sand-navy': { bg: '#dfbca0', text: '#0f2d59' },
    'violet': { bg: '#ffffff', text: '#6366f1' },
    'emerald': { bg: '#ffffff', text: '#10b981' },
    'sunset': { bg: '#ffffff', text: '#f97316' },
    'ocean': { bg: '#ffffff', text: '#0ea5e9' },
    'lavender': { bg: '#ffffff', text: '#a855f7' },
    'monochrome': { bg: '#ffffff', text: '#27272a' }
};

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Grid interactive selection mapping to support checking off boxes in live preview
// Key: 'habitId-dateString', Value: boolean
const checkedCells = new Map();

const habitIcons = {
    Droplet, Dumbbell, BookOpen, Brain, Apple, Camera, Bed, Flame, Smile, Coffee,
    DollarSign, Laptop, Heart, Bike, Sparkles, Music, Paintbrush, Scale, Ban,
    CheckSquare, Activity, Compass, PenTool, GraduationCap, Sun, Moon, SmilePlus,
    Utensils, Trees, X
};

function refreshLucideIcons() {
    createIcons({
        icons: habitIcons
    });
}

// ==========================================
// DOM ELEMENTS
// ==========================================
const habitNameInput = document.getElementById('habit-name-input');
const iconTrigger = document.getElementById('icon-trigger');
const iconPopover = document.getElementById('icon-popover');
const selectedIconPreview = document.getElementById('selected-icon-preview');
const addHabitBtn = document.getElementById('add-habit-btn');
const habitList = document.getElementById('habit-list');
const habitCountBadge = document.getElementById('habit-count');
const dragHint = document.getElementById('drag-hint');

const periodModeToggle = document.getElementById('period-mode-toggle');
const configMonth = document.getElementById('config-month');
const configWeeks = document.getElementById('config-weeks');
const configDays = document.getElementById('config-days');

const selectMonth = document.getElementById('select-month');
const selectMonthYear = document.getElementById('select-month-year');
const selectWeekStart = document.getElementById('select-week-start');
const selectWeeksCount = document.getElementById('select-weeks-count');
const selectDaysStart = document.getElementById('select-days-start');
const selectDaysCount = document.getElementById('select-days-count');

const gridTitleInput = document.getElementById('grid-title');
const titleFontSelect = document.getElementById('title-font');
const cellShapeSelect = document.getElementById('cell-shape');
const columnsPerRowSelect = document.getElementById('columns-per-row');
const themePresetSelect = document.getElementById('theme-preset');

const customPaletteControls = document.getElementById('custom-palette-controls');
const pdfBgColorInput = document.getElementById('pdf-bg-color');
const pdfTextColorInput = document.getElementById('pdf-text-color');

const showStartDateBoxCb = document.getElementById('show-start-date-box');
const showWeekdaysCb = document.getElementById('show-weekdays');
const showDayNumbersCb = document.getElementById('show-day-numbers');
const showNotesSectionCb = document.getElementById('show-notes-section');
const showStatusLegendCb = document.getElementById('show-status-legend');



const pageSizeSelect = document.getElementById('page-size');
const pageOrientationSelect = document.getElementById('page-orientation');
const exportPdfBtn = document.getElementById('export-pdf-btn');

// Preview output targets
const pdfPagesContainer = document.getElementById('pdf-pages-container');

const STATE_LOCAL_STORAGE_KEY = 'habit_tracker_designer_state_v7';

// ==========================================
// APP INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadSavedState();
    initUIControls();
    initSortable();
    renderAll();
});

// Load state from local storage if available
function loadSavedState() {
    const saved = localStorage.getItem(STATE_LOCAL_STORAGE_KEY);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.habits && Array.isArray(data.habits)) habits = data.habits;
            if (data.config) Object.assign(config, data.config);
        } catch (e) {
            console.error('Failed parsing saved state', e);
        }
    }
}

// Save state to local storage
function saveState() {
    localStorage.setItem(STATE_LOCAL_STORAGE_KEY, JSON.stringify({ habits, config }));
}

// ==========================================
// RENDER METHODS
// ==========================================

function renderAll() {
    saveState();
    renderSidebarHabits();
    renderDocPages();
    updateCompletionStat();
    adjustViewportScaling();
    refreshLucideIcons();
}

// Update the list of habits in the sidebar
function renderSidebarHabits() {
    habitList.innerHTML = '';

    habits.forEach((habit) => {
        const item = document.createElement('div');
        item.className = 'habit-item';
        item.dataset.id = habit.id;

        item.innerHTML = `
            <div class="habit-item-info">
                <span class="drag-handle">☰</span>
                <span class="habit-item-emoji"><i data-lucide="${habit.icon}" class="habit-icon-svg"></i></span>
                <span class="habit-item-name">${escapeHTML(habit.name)}</span>
            </div>
            <div class="habit-item-actions">
                <button type="button" class="delete-habit-btn" title="Delete habit">
                    <i data-lucide="X" style="width: 14px; height: 14px;"></i>
                </button>
            </div>
        `;

        // Delete button listener
        item.querySelector('.delete-habit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteHabit(habit.id);
        });

        habitList.appendChild(item);
    });

    // Update badge & controls
    habitCountBadge.innerText = habits.length;
    if (habits.length === 0) {
        dragHint.style.display = 'none';
        habitList.innerHTML = '<p class="text-muted" style="text-align: center; padding: 20px 0; font-size:12px;">No habits or questions added yet. Create one above!</p>';
    } else {
        dragHint.style.display = 'block';
    }
}



// Initialize Drag & Drop for sorting habits
function initSortable() {
    new Sortable(habitList, {
        handle: '.drag-handle',
        animation: 150,
        ghostClass: 'habit-item-drag-fallback',
        onEnd: () => {
            const reorderedIds = Array.from(habitList.children).map(item => item.dataset.id);
            // Re-order habits array in state
            const newHabits = [];
            reorderedIds.forEach(id => {
                const found = habits.find(h => h.id === id);
                if (found) newHabits.push(found);
            });
            habits = newHabits;
            renderAll();
        }
    });
}

function getTimeframeSubtitleText() {
    if (config.periodMode === 'month') {
        return `${MONTH_NAMES[config.month]} ${config.year}`;
    } else if (config.periodMode === 'weeks') {
        const start = new Date(config.startWeekDate);
        const end = new Date(start);
        end.setDate(start.getDate() + (config.weeksCount * 7) - 1);
        const formatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
    } else if (config.periodMode === 'days') {
        if ((config.gridTitle || '').toLowerCase().includes('75') && parseInt(config.daysCount) === 75) {
            return 'Challenge Tracker';
        } else {
            const start = new Date(config.startDaysDate);
            const end = new Date(start);
            end.setDate(start.getDate() + parseInt(config.daysCount) - 1);
            const formatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
            return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
        }
    }
    return '';
}

// Build grid data list depending on Period Mode selected
function getGridDates() {
    const dates = [];

    if (config.periodMode === 'month') {
        const daysInMonth = new Date(config.year, config.month + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(config.year, config.month, d);
            dates.push({
                dateString: `${config.year}-${String(config.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
                dayNumber: d,
                absoluteIndex: d,
                weekdayLabel: WEEKDAY_NAMES[date.getDay()],
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            });
        }
    } else if (config.periodMode === 'weeks') {
        // Find Monday of startWeekDate week to align nice
        const startDate = new Date(config.startWeekDate);
        const day = startDate.getDay();
        const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
        const startMonday = new Date(startDate.setDate(diff));

        const totalDays = config.weeksCount * 7;
        for (let d = 0; d < totalDays; d++) {
            const date = new Date(startMonday);
            date.setDate(startMonday.getDate() + d);

            const weekNumber = Math.floor(d / 7) + 1;
            dates.push({
                dateString: date.toISOString().split('T')[0],
                dayNumber: date.getDate(),
                absoluteIndex: d + 1,
                weekdayLabel: WEEKDAY_NAMES[date.getDay()],
                isWeekend: date.getDay() === 0 || date.getDay() === 6,
                weekGroup: weekNumber
            });
        }
    } else if (config.periodMode === 'days') {
        const start = new Date(config.startDaysDate);
        const totalDays = parseInt(config.daysCount) || 30;
        for (let d = 0; d < totalDays; d++) {
            const date = new Date(start);
            date.setDate(start.getDate() + d);
            dates.push({
                dateString: date.toISOString().split('T')[0],
                dayNumber: date.getDate(),
                absoluteIndex: d + 1,
                weekdayLabel: WEEKDAY_NAMES[date.getDay()],
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            });
        }
    }
    return dates;
}

// Generate printable grid layouts distributed dynamically across pages
function renderDocPages() {
    if (!pdfPagesContainer) return;
    pdfPagesContainer.innerHTML = '';

    const dates = getGridDates();
    const isPortrait = config.pageOrientation === 'portrait';
    const colsPerRow = parseInt(config.columnsPerRow);

    // Group columns by columnsPerRow
    const segments = [];
    if (colsPerRow > 0 && dates.length > colsPerRow) {
        for (let i = 0; i < dates.length; i += colsPerRow) {
            segments.push(dates.slice(i, i + colsPerRow));
        }
    } else {
        segments.push(dates);
    }

    const maxCols = Math.max(...segments.map(s => s.length));

    // 1. Calculate space for cell sizing
    const containerWidth = config.pageSize === 'a4'
        ? (isPortrait ? varValue('--a4-height-px') : varValue('--a4-width-px'))
        : (isPortrait ? varValue('--letter-height-px') : varValue('--letter-width-px'));

    const horizontalMarginPadding = 100; // 50px padding * 2
    const habitLabelColumnWidth = 150;  // habit labels column width
    const availableGridWidth = containerWidth - horizontalMarginPadding - habitLabelColumnWidth;

    // Compute cell dimensions dynamically
    const idealCellSize = Math.max(14, Math.min(36, Math.floor(availableGridWidth / maxCols) - 2));

    // 2. Pagination split logic
    const pages = [];
    let currentPageHabits = [];
    let currentPageHeight = 0;

    // Page height limit limits
    const paperHeight = config.pageSize === 'a4'
        ? (isPortrait ? varValue('--a4-width-px') : varValue('--a4-height-px'))
        : (isPortrait ? varValue('--letter-width-px') : varValue('--letter-height-px'));

    const maxPageHeight = paperHeight - 100; // minus 50px padding top & bottom

    const page1HeaderHeight = 140;
    const miniHeaderHeight = 50;

    // Estimate footer height
    let estimatedFooterHeight = 0;
    if (config.showNotesSection || config.showStatusLegend) {
        estimatedFooterHeight += 30; // spacing/borders
        if (config.showNotesSection) estimatedFooterHeight += 120;
        if (config.showStatusLegend) estimatedFooterHeight += 50;
    }

    if (habits.length === 0) {
        pages.push({ habits: [], isFirst: true, isLast: true });
    } else {
        habits.forEach((habit, idx) => {
            const habitHeight = 24 + segments.length * (20 + idealCellSize + 6);

            // Limit for current page (footer is present on every page)
            let currentLimit = maxPageHeight - estimatedFooterHeight;
            if (pages.length === 0) {
                currentLimit -= page1HeaderHeight;
            } else {
                currentLimit -= miniHeaderHeight;
            }

            if (currentPageHeight + habitHeight > currentLimit && currentPageHabits.length > 0) {
                pages.push({
                    habits: currentPageHabits,
                    isFirst: pages.length === 0,
                    isLast: false
                });
                currentPageHabits = [habit];
                currentPageHeight = habitHeight;
            } else {
                currentPageHabits.push(habit);
                currentPageHeight += habitHeight;
            }
        });

        if (currentPageHabits.length > 0) {
            pages.push({
                habits: currentPageHabits,
                isFirst: pages.length === 0,
                isLast: true
            });
        }
    }

    pages[pages.length - 1].isLast = true;

    // 3. Render HTML for each page card
    pages.forEach((page, pageIdx) => {
        const pageNum = pageIdx + 1;
        const pageCard = document.createElement('div');

        // Match format & font preferences
        pageCard.className = `pdf-page-container format-${config.pageSize} layout-${config.pageOrientation} font-style-${config.titleFont}`;

        // Page theme color properties
        let pageBg = '#ffffff';
        let pageText = '#18181b';
        if (config.themePreset === 'custom') {
            pageBg = config.pdfBgColor;
            pageText = config.pdfTextColor;
        } else {
            const presetColors = themeColorPresets[config.themePreset];
            if (presetColors) {
                pageBg = presetColors.bg;
                pageText = presetColors.text;
            }
        }
        pageCard.style.setProperty('--pdf-page-bg', pageBg);
        pageCard.style.setProperty('--pdf-page-text', pageText);

        // A. Render Header
        let headerHTML = '';
        if (page.isFirst) {
            // Main page header
            const dateBoxHTML = config.showStartDateBox
                ? `
                    <div class="header-start-date-box">
                        <span class="start-date-label">start<br>date</span>
                        <div class="start-date-rectangle" style="border-color: var(--pdf-page-text)"></div>
                    </div>
                ` : '';

            headerHTML = `
                <div class="pdf-header">
                    <div class="header-main">
                        <h1 class="pdf-title">${escapeHTML(config.gridTitle || 'Personal Habit Tracker')}</h1>
                        <div class="pdf-subtitle">${getTimeframeSubtitleText()}</div>
                    </div>
                    <div class="header-right-side">
                        ${dateBoxHTML}
                    </div>
                </div>
            `;
        } else {
            // Smaller mini header for subsequent pages
            headerHTML = `
                <div class="pdf-header mini-header">
                    <div class="header-main">
                        <span class="pdf-title-mini">${escapeHTML(config.gridTitle || 'Personal Habit Tracker')}</span>
                    </div>
                    <div class="header-right-side">
                        <span class="page-num-badge">Page ${pageNum} of ${pages.length}</span>
                    </div>
                </div>
            `;
        }

        // B. Render Habit Tables
        let tablesHTML = '';
        if (page.habits.length === 0) {
            tablesHTML = `
                <div style="text-align: center; padding: 40px; opacity: 0.5; font-style: italic;">
                    No habits or questions added yet. Create one in the sidebar!
                </div>
            `;
        } else {
            page.habits.forEach(habit => {
                const totalRowsInGroup = segments.length * 2;
                let tbodyHTML = '';

                segments.forEach((segmentDates, segIndex) => {
                    // Days Header Row
                    let headerRowHTML = '';
                    if (segIndex === 0) {
                        headerRowHTML += `
                            <td class="habit-label-cell" rowspan="${totalRowsInGroup}" style="width: ${habitLabelColumnWidth}px; max-width: ${habitLabelColumnWidth}px;">
                                <div class="habit-label-content">
                                    <span class="habit-label-emoji"><i data-lucide="${habit.icon}" class="habit-icon-svg"></i></span>
                                    <span class="habit-label-text" title="${habit.name}">${escapeHTML(habit.name)}</span>
                                </div>
                            </td>
                        `;
                    }

                    segmentDates.forEach(d => {
                        let label = '';
                        const dayDisplay = config.periodMode === 'days' ? d.absoluteIndex : d.dayNumber;

                        if (config.showDayNumbers && config.showWeekdays) {
                            label = `<div style="font-size: 7px; font-weight: 500; opacity: 0.8; text-transform:uppercase;">${d.weekdayLabel}</div><div style="font-size: 10px; font-weight: 700; margin-top:1px;">${dayDisplay}</div>`;
                        } else if (config.showDayNumbers) {
                            label = `<div style="font-size: 10px; font-weight: 700;">${dayDisplay}</div>`;
                        } else if (config.showWeekdays) {
                            label = `<div style="font-size: 8px; font-weight: 600; opacity: 0.8; text-transform:uppercase;">${d.weekdayLabel}</div>`;
                        }

                        const weekendClass = d.isWeekend ? 'weekday-header weekend' : 'weekday-header';
                        headerRowHTML += `<th class="${weekendClass}" style="width: ${idealCellSize}px; max-width: ${idealCellSize}px;">${label}</th>`;
                    });

                    // Checkboxes Row
                    let boxesRowHTML = '';
                    segmentDates.forEach(d => {
                        const key = `${habit.id}-${d.dateString}`;
                        const isChecked = checkedCells.get(key) === true;
                        const cellShapeClass = `cell-shape-${config.cellShape}`;

                        const themeText = config.themePreset === 'custom' ? config.pdfTextColor : (themeColorPresets[config.themePreset]?.text || '#0f2d59');
                        const customStyle = isChecked ? `style="--habit-color: ${themeText}"` : '';

                        boxesRowHTML += `
                            <td class="grid-cell-td">
                                <div class="grid-cell-box ${cellShapeClass} ${isChecked ? 'checked' : ''}" 
                                     data-habit-id="${habit.id}" 
                                     data-date-str="${d.dateString}"
                                     ${customStyle}
                                     style="width: ${idealCellSize}px; height: ${idealCellSize}px; max-width: ${idealCellSize}px; max-height: ${idealCellSize}px; border-color: var(--pdf-page-text);">
                                </div>
                            </td>
                        `;
                    });

                    tbodyHTML += `
                        <tr class="header-row">${headerRowHTML}</tr>
                        <tr class="checkboxes-row" style="height: ${idealCellSize + 6}px;">${boxesRowHTML}</tr>
                    `;
                });

                tablesHTML += `
                    <div class="habit-segmented-table-wrapper">
                        <table class="grid-table" style="color: var(--pdf-page-text); border-color: var(--pdf-page-text);">
                            <tbody>
                                ${tbodyHTML}
                            </tbody>
                        </table>
                    </div>
                `;
            });
        }

        // C. Render Footer
        let footerHTML = '';
        if (config.showNotesSection || config.showStatusLegend) {
            let notesHTML = '';
            if (config.showNotesSection) {
                notesHTML = `
                    <div class="pdf-notes-box">
                        <h3>Notes & Reflections</h3>
                        <div class="notes-lines">
                            <div class="note-line" style="border-bottom-color: var(--pdf-page-text)"></div>
                            <div class="note-line" style="border-bottom-color: var(--pdf-page-text)"></div>
                            <div class="note-line" style="border-bottom-color: var(--pdf-page-text)"></div>
                        </div>
                    </div>
                `;
            }

            let legendHTML = '';
            if (config.showStatusLegend) {
                let legendItemsHTML = '';
                habits.forEach(habit => {
                    const color = config.themePreset === 'custom' ? config.pdfTextColor : (themeColorPresets[config.themePreset]?.text || '#0f2d59');

                    legendItemsHTML += `
                        <div class="legend-item">
                            <span class="legend-color" style="background-color: ${color}; border-color: var(--pdf-page-text);"></span>
                            <span style="display:inline-flex; align-items:center; gap:4px;"><i data-lucide="${habit.icon}" class="habit-icon-svg" style="width: 12px; height: 12px;"></i> ${escapeHTML(habit.name)}</span>
                        </div>
                    `;
                });

                legendHTML = `
                    <div class="pdf-legend-box">
                        <h3>Legend</h3>
                        <div class="legend-items">
                            ${legendItemsHTML}
                        </div>
                    </div>
                `;
            }

            footerHTML = `
                <div class="pdf-footer" style="border-top-color: var(--pdf-page-text)">
                    ${notesHTML}
                    ${legendHTML}
                </div>
            `;
        }

        pageCard.innerHTML = `
            <div class="pdf-content">
                ${headerHTML}
                <div class="grid-table-container">
                    ${tablesHTML}
                </div>
                ${footerHTML}
            </div>
        `;

        pdfPagesContainer.appendChild(pageCard);
    });

    // Set custom accent color variable
    const themeAccent = config.themePreset === 'custom' ? config.pdfTextColor : (themeColorPresets[config.themePreset]?.text || '#6366f1');
    document.documentElement.style.setProperty('--accent', themeAccent);

    // Update custom palette controls visibility in sidebar
    if (config.themePreset === 'custom') {
        customPaletteControls.classList.remove('hidden');
    } else {
        customPaletteControls.classList.add('hidden');
    }

    // Add grid check toggle listeners
    document.querySelectorAll('.grid-cell-box').forEach(box => {
        box.addEventListener('click', () => {
            const hId = box.dataset.habitId;
            const dStr = box.dataset.dateStr;
            const key = `${hId}-${dStr}`;

            if (checkedCells.get(key) === true) {
                checkedCells.delete(key);
            } else {
                checkedCells.set(key, true);
            }

            renderAll();
        });
    });
}

// Compute completion percentage based on checked cells
function updateCompletionStat() {
    const totalCells = habits.length * getGridDates().length;
    const checkedCount = checkedCells.size;
    const percentage = totalCells > 0 ? Math.round((checkedCount / totalCells) * 100) : 0;

    const progressLabel = document.getElementById('progress-val-page-1');
    if (progressLabel) {
        progressLabel.innerText = `${percentage}%`;
    }
}

// Scale down preview so it fits nicely inside standard screens
function adjustViewportScaling() {
    const isPortrait = config.pageOrientation === 'portrait';
    const paperWidth = config.pageSize === 'a4'
        ? (isPortrait ? varValue('--a4-height-px') : varValue('--a4-width-px'))
        : (isPortrait ? varValue('--letter-height-px') : varValue('--letter-width-px'));

    const viewport = document.querySelector('.preview-viewport-wrapper');
    const availableWidth = viewport.clientWidth - 40;

    const pageContainers = document.querySelectorAll('.pdf-page-container');
    pageContainers.forEach(pdfPageContainer => {
        if (availableWidth < paperWidth) {
            const scale = availableWidth / paperWidth;
            pdfPageContainer.style.transform = `scale(${scale})`;
            pdfPageContainer.style.marginBottom = `${(pdfPageContainer.clientHeight * (scale - 1))}px`;
        } else {
            pdfPageContainer.style.transform = 'scale(1)';
            pdfPageContainer.style.marginBottom = '0px';
        }
    });
}

// Get value from css root variable
function varValue(varName) {
    const rawVal = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return parseInt(rawVal) || 0;
}

// ==========================================
// EVENT LISTENERS & UI LOGIC
// ==========================================

function initUIControls() {
    // Re-adjust viewport scale when window resizes
    window.addEventListener('resize', adjustViewportScaling);

    // Icon Popover behavior
    iconTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        iconPopover.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!iconPopover.contains(e.target) && e.target !== iconTrigger) {
            iconPopover.classList.add('hidden');
        }
    });

    iconPopover.querySelectorAll('.icon-list span').forEach(span => {
        span.addEventListener('click', () => {
            const icon = span.dataset.icon;
            selectedIconName = icon;
            selectedIconPreview.setAttribute('data-lucide', icon);
            refreshLucideIcons();
            iconPopover.classList.add('hidden');
        });
    });

    // Add habit click
    addHabitBtn.addEventListener('click', () => {
        const name = habitNameInput.value.trim();
        if (!name) return;

        const newHabit = {
            id: String(Date.now()),
            name: name,
            icon: selectedIconName
        };

        habits.push(newHabit);
        habitNameInput.value = '';
        renderAll();
    });

    // Toggle Period Modes
    periodModeToggle.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            periodModeToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mode = btn.dataset.mode;
            config.periodMode = mode;

            // Toggle config menus
            configMonth.classList.add('hidden');
            configWeeks.classList.add('hidden');
            configDays.classList.add('hidden');

            if (mode === 'month') configMonth.classList.remove('hidden');
            if (mode === 'weeks') configWeeks.classList.remove('hidden');
            if (mode === 'days') configDays.classList.remove('hidden');

            renderAll();
        });
    });

    // Dynamic binding to config selectors & inputs
    bindConfigSelect(selectMonth, 'month', 'int');
    bindConfigSelect(selectMonthYear, 'year', 'int');
    bindConfigSelect(selectWeekStart, 'startWeekDate', 'str');
    bindConfigSelect(selectWeeksCount, 'weeksCount', 'int');
    bindConfigSelect(selectDaysStart, 'startDaysDate', 'str');
    bindConfigSelect(selectDaysCount, 'daysCount', 'int');

    bindConfigInput(gridTitleInput, 'gridTitle');
    bindConfigSelect(titleFontSelect, 'titleFont', 'str');
    bindConfigSelect(cellShapeSelect, 'cellShape', 'str');
    bindConfigSelect(columnsPerRowSelect, 'columnsPerRow', 'int');

    // Theme preset switcher
    themePresetSelect.addEventListener('change', (e) => {
        config.themePreset = e.target.value;
        renderAll();
    });

    // Custom color pickers overrides
    pdfBgColorInput.addEventListener('input', (e) => {
        config.pdfBgColor = e.target.value;
        renderAll();
    });

    pdfTextColorInput.addEventListener('input', (e) => {
        config.pdfTextColor = e.target.value;
        renderAll();
    });

    bindConfigCheckbox(showStartDateBoxCb, 'showStartDateBox');
    bindConfigCheckbox(showWeekdaysCb, 'showWeekdays');
    bindConfigCheckbox(showDayNumbersCb, 'showDayNumbers');
    bindConfigCheckbox(showNotesSectionCb, 'showNotesSection');
    bindConfigCheckbox(showStatusLegendCb, 'showStatusLegend');



    bindConfigSelect(pageSizeSelect, 'pageSize', 'str');
    bindConfigSelect(pageOrientationSelect, 'pageOrientation', 'str');

    // Preset dropdown configurations
    selectMonth.value = config.month;
    selectMonthYear.value = config.year;
    selectWeekStart.value = config.startWeekDate;
    selectWeeksCount.value = config.weeksCount;
    selectDaysStart.value = config.startDaysDate;
    selectDaysCount.value = config.daysCount;
    gridTitleInput.value = config.gridTitle;
    titleFontSelect.value = config.titleFont;
    cellShapeSelect.value = config.cellShape;
    columnsPerRowSelect.value = config.columnsPerRow;
    themePresetSelect.value = config.themePreset;

    pdfBgColorInput.value = config.pdfBgColor;
    pdfTextColorInput.value = config.pdfTextColor;

    showStartDateBoxCb.checked = config.showStartDateBox;
    showWeekdaysCb.checked = config.showWeekdays;
    showDayNumbersCb.checked = config.showDayNumbers;
    showNotesSectionCb.checked = config.showNotesSection;
    showStatusLegendCb.checked = config.showStatusLegend;

    pageSizeSelect.value = config.pageSize;
    pageOrientationSelect.value = config.pageOrientation;

    // Bind Export to trigger PDF rendering
    exportPdfBtn.addEventListener('click', triggerPDFExport);
}

// Utility to bind checkboxes to app config state
function bindConfigCheckbox(element, configKey) {
    element.addEventListener('change', (e) => {
        config[configKey] = e.target.checked;
        renderAll();
    });
}

// Utility to bind input elements to app config state
function bindConfigInput(element, configKey) {
    element.addEventListener('input', (e) => {
        config[configKey] = e.target.value;
        renderAll();
    });
}

// Utility to bind select fields to app config state
function bindConfigSelect(element, configKey, type) {
    element.addEventListener('change', (e) => {
        config[configKey] = type === 'int' ? parseInt(e.target.value) : e.target.value;
        renderAll();
    });
}

// Action to delete a habit
function deleteHabit(id) {
    habits = habits.filter(h => h.id !== id);
    // Delete related checked states
    for (const key of checkedCells.keys()) {
        if (key.startsWith(`${id}-`)) {
            checkedCells.delete(key);
        }
    }
    renderAll();
}

// ==========================================
// PDF GENERATION & EXPORT
// ==========================================

async function triggerPDFExport() {
    exportPdfBtn.disabled = true;
    const oldText = exportPdfBtn.innerHTML;
    exportPdfBtn.innerHTML = '<span class="btn-icon">⏳</span> Exporting...';

    try {
        const pageContainers = document.querySelectorAll('.pdf-page-container');
        if (pageContainers.length === 0) return;

        // Match PDF size configuration
        const orientation = config.pageOrientation === 'landscape' ? 'l' : 'p';
        const format = config.pageSize; // 'a4' or 'letter'

        const doc = new jsPDF({
            orientation: orientation,
            unit: 'px',
            format: format,
            hotfixes: ['px_scaling']
        });

        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        for (let i = 0; i < pageContainers.length; i++) {
            const pageEl = pageContainers[i];

            // Reset scale style before capture so html2canvas renders at exact DPI resolution
            const originalTransform = pageEl.style.transform;
            const originalMarginBottom = pageEl.style.marginBottom;
            const originalShadow = pageEl.style.boxShadow;

            pageEl.style.transform = 'scale(1)';
            pageEl.style.marginBottom = '0px';
            pageEl.style.boxShadow = 'none';

            // Render element to Canvas
            const canvas = await html2canvas(pageEl, {
                scale: 3, // Higher resolution export scaling
                useCORS: true,
                logging: false,
                allowTaint: true,
                windowWidth: pageEl.scrollWidth,
                windowHeight: pageEl.scrollHeight
            });

            // Restore styling
            pageEl.style.transform = originalTransform;
            pageEl.style.marginBottom = originalMarginBottom;
            pageEl.style.boxShadow = originalShadow;

            const imgData = canvas.toDataURL('image/png');

            if (i > 0) {
                doc.addPage(format, orientation);
            }

            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        }

        // Download document
        const formattedTitle = (config.gridTitle || 'habit-tracker').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        doc.save(`${formattedTitle}.pdf`);

    } catch (e) {
        console.error('PDF creation failed', e);
        alert('Could not generate PDF. Please try again.');
    } finally {
        exportPdfBtn.disabled = false;
        exportPdfBtn.innerHTML = oldText;
    }
}

// Helper to escape HTML tags
function escapeHTML(str) {
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
