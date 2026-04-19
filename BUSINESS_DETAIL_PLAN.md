# Business Detail Page UI & UX Plan
*(Inspired by premium local directories like BizKerala)*

## 1. Overall Layout Strategy
- **Two-Column Layout (Desktop)**: 
  - **Left Column (70%)**: Core content (Description, Services, Photos, FAQs, Reviews).
  - **Right Column (30%)**: Sticky contact sidebar with rapid CTA buttons (Call, WhatsApp, Email, Enquire) and an interactive Map/Location block.
- **Single Column (Mobile)**: 
  - Stacked vertically. Contact CTAs will be pinned to the bottom of the mobile screen (`fixed bottom-0`) for immediate conversion.

## 2. Hero Section (Top)
- **Cover Image Slider**: A sleek, wide image carousel or a single high-quality cover photo.
- **Business Identity Box**: 
  - Overlapping the cover image slightly or sitting right below it.
  - Contains the Business Logo (circle/square profile picture).
  - **Business Name** (e.g., "Easy Kuri").
  - **Verification Badges** (Verified, Premium Crown).
  - **Quick Stats**: Rating (Star icon + number), Review Count, "Open Now" / "Closed" pulse indicator.

## 3. Left Column: Main Content Details
### A. About & Description
- A clean text block describing the business.
- **Categories/Breadcrumbs**: "Banking & Finance > Loans > Chit Funds".
- **Operating Hours**: A clean, collapsible dropdown showing weekly hours (e.g., Mon: 9AM-6PM).

### B. Quick Contact Strip (Visible on Mobile)
- Icon-based rapid contact options (Phone, WhatsApp, Email, Website) styled as rounded chips.

### C. Services Offered / Features
- A grid of checkmarks or icons detailing what the business provides.

### D. Photo Gallery & Socials
- A grid of images.
- An "Instagram Integration" block if they have a social link. Example: *"Get the latest updates, photos, and behind-the-scenes content from [Business Name] - Follow @username"*

### E. Dynamic SEO FAQ Section
- Just like BizKerala, we automatically generate accordion FAQs to capture Google rich snippets.
  - *What is the contact details of [Business]?*
  - *Where is [Business] located?*
  - *What does [Business] offer?*
  - *What type of business is [Business]?*

### F. Reviews & Ratings
- A summary of the average rating.
- "Write a Review" button (requires login).
- List of recent reviews with user avatars.

## 4. Right Column: Conversion Sidebar (Sticky)
- **Primary CTA Block**:
  - Huge "Call Now" Button.
  - Huge "WhatsApp" Button.
  - "Send an Enquiry" modal trigger.
- **Location & Map**:
  - Embedded map showing the exact pin.
  - Full address text.
  - "Get Directions" button (opens Google Maps).
- **Utility Actions**:
  - "Share this page".
  - "Save/Bookmark".
  - "Report Error / Suggestion" (opens WhatsApp to admin).

## 5. Implementation Steps
1. **Refactor `BusinessProfilePage.tsx`**: Shift from its current design to this new, conversion-optimized 2-column structure.
2. **Build the Sticky Sidebar Component**: Ensure it sticks on scroll and collapses correctly on mobile into a bottom-fixed action bar.
3. **Enhance the Dynamic FAQs**: Feed business-specific data (`business.name`, `business.location`, `business.category`) into an Accordion component.
4. **Implement Image Lightbox/Gallery**: Allow users to click photos and view them in a full-screen carousel.
