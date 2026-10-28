# ANUSMITA — Fashion · Jewellery · Beauty

> **Tagline:** FASHION · JEWELLERY · BEAUTY  
> **Brand:** ANUSMITA (Bangladesh)  
> **Aesthetic:** Luxury blush-pink, ivory, muted-rose, and restrained charcoal  

ANUSMITA is a production-grade e-commerce platform and business ERP ecosystem for Bangladesh, specializing in 100% authentic Asian skincare, apparel (Mulberry silk), 18K anti-tarnish jewellery, watches, designer bags, and lifestyle collections sourced directly from Korea, Japan, and China.

---

## 🌟 Key Features

### 🛍️ Storefront & Customer Experience
- **Home (`/`)**: Hero carousel, category discovery, real-time flash deals countdown, new arrivals, bestsellers, skincare routine quiz banner, customer stories, and journal guides.
- **Catalog & Shop (`/shop`)**: Multi-faceted sidebar and mobile filter drawer:
  - Country of Origin (Korea 🇰🇷, Japan 🇯🇵, China 🇨🇳)
  - Categories (Skincare, Makeup, Fashion, Jewellery, Watches, Mobile Accessories, Bedsheets, Perfumes, Bags)
  - Interactive price range slider
  - Skin concerns & skin type filters
  - Stock availability and sorting (Newest, Price, Popularity)
- **Dynamic Product Detail (`/product/:id`)**:
  - Image gallery with **360° Studio View** and **Macro Texture Inspection** lens
  - Category-aware attributes (Volume in ml/g, fashion color swatches with live image sync, sizes S/M/L/XL, EU shoe sizes, 18K PVD anti-tarnish specifications)
  - Scarcity and stock urgency indicator (*"Only X left in stock"* or *Pre-Order mode*)
  - Live customer viewer counter
  - Interactive **Smart Fit & Size Calculator** modal
  - **Complete the Routine / Outfit** bundle companion addon with live savings calculator
  - Direct WhatsApp inquiry button pre-filled with product title and price
- **Flash Deals (`/deals`)**: Genuine server-authoritative countdown timer with deal allocation progress.
- **Curated Bundles (`/bundles`)**: Step-by-step routine sets (e.g., *Korean Glass Skin 4-Step Regimen*) with item breakdown and BDT savings.
- **Overseas Pre-Orders (`/pre-orders`)**: Freight batches from Seoul (KE-631), Tokyo (JL-741), and Guangzhou (CZ-3057) with flight tracking status and 30% advance deposit terms.
- **Interactive Routine Quiz (`/routine-quiz`)**: 4-step skin diagnostic engine generating tailored AM/PM steps with 1-click cart addition.
- **Customer Moments Gallery (`/customer-stories`)**: Verified unboxing reviews and story submission modal with publishing consent.
- **Digital Gift Cards (`/gift-cards`)**: Visual styles (Classic, Blush, Celebration) with 500, 1000, 2000, 5000 BDT denominations, live visual preview, and scheduler.
- **Beauty Journal (`/journal`)**: Evidence-based skincare routines and lifestyle articles.
- **Shopping Bag & Checkout (`/cart`, `/checkout`)**:
  - Item adjustments, promo voucher engine (`ANUSMITA10` for 10% discount)
  - District shipping selector (Inside Dhaka ৳80, Outside Dhaka ৳150)
  - Payment methods (Cash on Delivery, bKash, Nagad)
  - **1-Click WhatsApp Quick Checkout** (encodes items, address, and total into WhatsApp payload)
- **Tax Invoices (`/invoice/:id`)**: Printable invoice supporting **A4 Standard**, **80mm POS Thermal Receipt**, and **58mm POS Thermal Receipt** with barcodes.
- **Consignment Tracking (`/track-order`)**: Order ID + Phone lookup with live timeline (*Confirmed → Processing → Packed → Shipped → Out for Delivery → Delivered*).

### 🤖 ANUSMITA Assistant (Chatbot)
- Embedded in the Contact page and as a floating widget.
- 100% free, code-based engine (no paid external AI tokens required).
- Bengali and English support, soft notification chime toggle, catalog stock queries, order status lookup, skin recommendations, and anti-spam 11-digit Bangladesh phone validation.

### 📊 Business ERP & Admin Management (`/admin`)
- **Financial Intelligence**: Gross Sales, Net Sales, Cost of Goods Sold (COGS), Gross Profit, Operating Margin %, collected cash vs. outstanding COD receivables.
- **Order Pipeline & COD Risk Guard**: Risk scoring (High/Medium/Low) based on mobile format, address depth, and duplicate prevention.
- **Inventory Control (1,000+ items ready)**: SKU, Barcode, stock alert levels, product publishing, and CSV export.
- **Suppliers & Purchase Orders**: Supplier balances (Korea, Japan, China) and purchase order tracking.

---

## 🎨 Design Tokens & Branding

```css
--background: #FFFAF7;
--surface: #FFFFFF;
--surface-warm: #FFF7F3;
--blush: #F9E9ED;
--blush-soft: #FDF1F3;
--primary: #B74764;
--primary-hover: #9F3652;
--primary-soft: #F4DCE3;
--heading: #211D20;
--body: #514950;
--muted: #746B70;
--border: #EADDE0;
--footer: #252525;
--footer-text: #F8F3F0;
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/Anusmita.git

# Navigate to project folder
cd Anusmita

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📞 Official Contacts
- **Hotline:** [+880 1310-339192](tel:+8801310339192)
- **WhatsApp:** [https://wa.me/8801310339192](https://wa.me/8801310339192)
- **Messenger:** [https://m.me/AnusmitaBD](https://m.me/AnusmitaBD)
- **Email:** [anusmitashopbd@gmail.com](mailto:anusmitashopbd@gmail.com)
