# Cassly Jane & Mark Florence - Wedding Website

A beautiful, fully responsive wedding website built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with full responsiveness across all devices
- **Live Countdown Timer**: Real-time countdown to the wedding date
- **Image Gallery**: Masonry grid with lightbox modal for viewing photos
- **Guestbook**: Visitors can post congratulatory messages
- **RSVP Form**: Comprehensive form with validation for guest responses
- **Event Details**: Ceremony and reception information with embedded maps
- **Wedding Party**: Display of entourage with photos and roles
- **Registry**: Links to gift registries and honeymoon fund
- **FAQ**: Accessible accordion with common questions
- **SEO Optimized**: Metadata, Open Graph tags, and semantic HTML

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Images**: Next.js Image component
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd wedding-website
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
\`\`\`

3. Run the development server:
\`\`\`bash
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

\`\`\`bash
pnpm build
pnpm start
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── globals.css          # Global styles and Tailwind config
│   ├── page.tsx             # Main page with all sections
│   └── api/
│       ├── messages/        # Guestbook API
│       └── rsvp/            # RSVP form API
├── components/
│   ├── navbar.tsx           # Navigation bar with mobile menu
│   ├── hero.tsx             # Hero section
│   ├── countdown.tsx        # Countdown timer
│   ├── love-story.tsx       # Love story with carousel
│   ├── gallery.tsx          # Photo gallery with lightbox
│   ├── messages.tsx         # Guestbook section
│   ├── details.tsx          # Event details
│   ├── entourage.tsx        # Wedding party
│   ├── rsvp.tsx             # RSVP form
│   ├── registry.tsx         # Gift registry
│   ├── faq.tsx              # FAQ accordion
│   ├── footer.tsx           # Footer
│   ├── section.tsx          # Section wrapper component
│   ├── heading.tsx          # Heading component
│   └── ui/
│       └── button.tsx       # Button component
├── lib/
│   ├── content.ts           # Site content and configuration
│   ├── messages-store.ts    # In-memory message storage
│   ├── rsvp-store.ts        # In-memory RSVP storage
│   └── utils.ts             # Utility functions
└── public/
    └── images/              # Image assets
\`\`\`

## Customization

### Editing Content

All site content is centralized in `lib/content.ts`. Update:
- Couple names and wedding date
- Hero section text and venue details
- Navigation links
- Event details

### Updating Colors

The wedding color palette is defined in `app/globals.css`:
- **Cream**: #FAF8F1
- **Sand**: #FAEAB1
- **Teal**: #34656D
- **Ink**: #334443

### Adding Images

1. Place images in the `public/images/` directory
2. Update image paths in components
3. Use Next.js Image component for optimization

### Database Integration

Currently, messages and RSVPs are stored in memory. To persist data:

1. **Messages**: Update `lib/messages-store.ts` to use a database
2. **RSVPs**: Update `lib/rsvp-store.ts` to use a database

Recommended databases:
- Supabase (PostgreSQL)
- Neon (PostgreSQL)
- MongoDB

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your site will be live!

\`\`\`bash
# Or use Vercel CLI
vercel
\`\`\`

### Environment Variables

No environment variables are required for the basic setup. If you add a database, add the connection string to your `.env.local` file.

## Performance & SEO

- Optimized images with Next.js Image component
- Semantic HTML structure
- ARIA labels and keyboard navigation
- Meta tags and Open Graph support
- Mobile-first responsive design
- Smooth scroll behavior

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management in modals
- Sufficient color contrast
- Screen reader friendly

## License

This project is created for personal use. Feel free to customize and deploy!

## Support

For questions or issues, please contact the couple or refer to the FAQ section on the website.

---

Made with ❤️ for Cassly Jane & Mark Florence
\`\`\`

```json file="" isHidden
