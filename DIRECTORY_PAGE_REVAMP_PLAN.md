# Directory Page Revamp & SEO Enhancement Plan

This document outlines the step-by-step implementation plan for modernizing the `DirectoryPage.tsx` to improve user experience, simplify the layout, and significantly boost SEO.

## 1. Layout Restructuring (2-Column Design)
The current complex layout (incorporating a map and left sidebar) will be simplified into a cleaner, content-focused 2-column layout.

*   **Left Column (Major Content - ~70% width)**:
    *   Will house the primary business listings using the `HorizontalBusinessCard`.
    *   Breadcrumbs, dynamic page title (e.g., "Best Clinics in Kasaragod"), and result count.
    *   Active filter chips.
    *   Pagination and "Can't find the business" CTA at the bottom.
*   **Right Column (Minor Context & Discovery - ~30% width)**:
    *   **Related Keywords List**: Dynamically generated contextual links based on the current context (e.g., "Best clinic in Kumbala", "Top restaurants in Mogral"). Clicking these will instantly filter the DB results on the same page.
    *   **Popular Searches Chips**: A section with pill-shaped chips for trending local searches.
    *   **Existing Filters**: Move the existing `FilterSidebar` logic into this right column (or a horizontal top bar) to maintain functionality without cluttering the left side.

## 2. Remove Map Functionality
*   Completely strip out the `KGDMap` component.
*   Remove the `viewMode` state (`list` vs `map`) and the associated toggle UI.
*   Remove map-specific mobile drawer views.

## 3. Dynamic Keyword & Filtering System
*   **Actionable Keywords**: When a user clicks a related keyword (e.g., "Best restaurant in Mogral"), the page state (`selectedCategory`, `selectedLocation`, `searchQuery`) should automatically update.
*   **URL Synchronization**: Update the browser URL parameters when keywords are clicked so that each specific search state can be shared and indexed by search engines.

## 4. Dynamic FAQ Section (SEO Focus)
*   **Location**: Placed below the main 2-column workspace, spanning the full width of the container.
*   **Content**: Dynamically loads questions and answers based on the currently `selectedCategory` (e.g., "What are the typical consultation fees for clinics in Kasaragod?").
*   **SEO Boost (Structured Data)**: Implement `FAQPage` JSON-LD schema injected into the `<head>` for the visible FAQs. This helps secure rich snippets in Google Search results.
*   **UI**: Use an accordion component (like Shadcn UI Accordion) for a clean, togglable FAQ experience.

## 5. Step-by-Step Implementation Guide

### Phase 1: Cleanup & Structural Changes
1.  Open `frontend/src/pages/DirectoryPage.tsx`.
2.  Remove `KGDMap` imports and component rendering.
3.  Remove `viewMode` state and its UI toggle buttons.
4.  Refactor the main layout wrapper from the existing 3-part layout to a `grid-cols-1 lg:grid-cols-12` or `flex` layout allocating ~8 columns to the left and ~4 columns to the right.

### Phase 2: Right Column Development
1.  Create a `DirectoryRightSidebar` component.
2.  Implement a `RelatedKeywords` section that accepts the current category/location and renders actionable text links.
3.  Implement a `PopularSearches` section rendering actionable `Badge`/chips.
4.  Wire up the `onClick` handlers of these elements to update the parent `DirectoryPage` state, triggering a re-filter of the `filteredBusinesses`.

### Phase 3: FAQ Component & SEO
1.  Create a `DirectoryFAQ` component.
2.  Set up mock data or an API route to fetch FAQ pairs based on `categoryId`.
3.  Implement the UI using an Accordion.
4.  Add a `useEffect` hook within the component to dynamically append a `<script type="application/ld+json">` tag containing the FAQ schema to the document head.

### Phase 4: Refinement & Mobile Optimization
1.  Ensure the Right Column stacks neatly below the Left Column on mobile devices (or hide secondary elements inside a bottom sheet/drawer if they take up too much vertical space).
2.  Update dynamic `<h1>` tags and page meta titles to match the selected category and location to target long-tail local keywords.
