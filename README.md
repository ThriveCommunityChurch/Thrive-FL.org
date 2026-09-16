# Thrive-FL.org

The official website for **Thrive Community Church** in Estero, FL — a congregation of the Lutheran Church—Missouri Synod (LCMS).

🌐 **Live Site:** [https://thrive-fl.org](https://thrive-fl.org)

---

## Project Overview

This repository contains the source code for Thrive Community Church's public website. The site serves as the primary digital presence for the church, providing visitors with information about services, sermons, events, and ways to get involved in the community.

---

## Tech Stack

| Technology                                             | Version | Purpose                         |
| ------------------------------------------------------ | ------- | ------------------------------- |
| [Next.js](https://nextjs.org/)                         | 16.x    | React framework with App Router |
| [React](https://react.dev/)                            | 18.x    | UI component library            |
| [TypeScript](https://www.typescriptlang.org/)          | 5.6.x   | Type-safe JavaScript            |
| [Howler.js](https://howlerjs.com/)                     | 2.2.x   | Audio playback for sermons      |
| [AWS Amplify Hosting](https://aws.amazon.com/amplify/) | —       | Deployment & hosting platform   |

---

## Features

### 🎧 Sermons

- Browse sermon series and individual messages
- Stream audio directly in the browser with a persistent global audio player
- View sermon details including speaker, date, and series information

### 📅 Events

- View upcoming church events
- Event details with dates, times, and locations

### 📍 Visit Information

- Service times and location details
- Directions and what to expect for first-time visitors

### 👥 About

- Church leadership and staff information
- Core beliefs and values
- Church history and mission

### 📬 Contact

- Contact form for inquiries
- Direct contact information

### 🤝 Get Involved

- Small groups information
- Ministry opportunities
- Ways to serve and connect

---

## Project Structure

```
Thrive-FL/
├── app/                    # Next.js App Router pages and components
│   ├── about/              # About pages (beliefs, leadership, values)
│   ├── components/         # Page-specific components
│   ├── contact/            # Contact page
│   ├── contexts/           # React context providers
│   ├── events/             # Events calendar
│   ├── get-involved/       # Volunteer and ministry opportunities
│   ├── im-new/             # First-time visitor information
│   ├── ministries/         # Ministry pages (kids, etc.)
│   ├── privacy/            # Privacy policy
│   ├── sermons/            # Sermon series and individual sermons
│   ├── services/           # API service functions
│   ├── small-groups/       # Small groups information
│   ├── types/              # TypeScript type definitions
│   ├── visit/              # Visit information
│   ├── layout.tsx          # Root layout with header/footer
│   └── page.tsx            # Homepage
├── components/             # Shared/reusable components
│   ├── church/             # Church-specific components
│   └── ui/                 # Base UI components
├── lib/                    # Utility libraries
├── public/                 # Static assets (images, favicon)
├── amplify.yml             # AWS Amplify build configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18.x or higher
- npm (included with Node.js)

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/ThriveCommunityChurch/Thrive-FL.org.git
   cd Thrive-FL.org/Thrive-FL
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start development server with hot reload |
| `npm run build` | Create optimized production build        |
| `npm start`     | Start production server                  |
| `npm run lint`  | Run ESLint for code quality checks       |

---

## Deployment

The site is automatically deployed via **AWS Amplify** when changes are pushed to the `master` branch.

### Build Configuration

The `amplify.yml` file configures the build process:

- Installs dependencies with `npm ci`
- Builds the Next.js application
- Outputs to `.next` directory for SSR hosting

---

## Contributing

This is a private repository for Thrive Community Church. If you're a team member looking to contribute:

1. Create a feature branch from `master`
2. Make your changes
3. Submit a pull request for review

---

## License

This project is proprietary software for Thrive Community Church. All rights reserved.

---

## Contact

**Thrive Community Church**
📍 20041 S. Tamiami Trail #1, Estero, FL 33928
📞 (239) 687-3430
📧 info@thrive-fl.org
🌐 [thrive-fl.org](https://thrive-fl.org)
