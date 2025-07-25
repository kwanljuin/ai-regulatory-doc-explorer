# AI-Enhanced Regulatory Document Explorer

A Next.js application that provides AI-powered analysis of SEC regulatory filings using Google's Gemini AI.

## Features

- **Document Discovery**: Browse SEC EDGAR filings with filtering capabilities
- **AI Analysis**: Detailed compliance analysis using Gemini AI
- **Smart Bookmarking**: Save important documents with localStorage persistence
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Core Framework & Language
- **Next.js 15**: Latest features with built-in optimization and excellent developer experience
- **React**: Component-based UI library
- **TypeScript**: Type-safe development

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Accessible and customizable component library
- **Radix UI**: Headless UI primitives

### State & Data Management
- **React Query**: Server state management with superior caching and error handling
- **Zustand**: Lightweight client state management (lighter alternative to Redux)

### External Services
- **Google Gemini Pro**: AI integration for document analysis (more cost-effective option)
- **SEC EDGAR API**:

## Quick Start

### 1. Clone and Install

```bash
git clone ai-regulatory-doc-explorer
cd ai-regulatory-doc-explorer
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
# Add your Gemini API key to .env.local
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## Architecture Decisions

### State Management Strategy

- **React Query**: Server state management, caching, and error handling for API calls
- **Zustand**: Client state (bookmarks, UI state, filters)
- **localStorage**: Persists bookmarks across sessions

### API Integration Strategy

- **SEC EDGAR**: Primary data source for regulatory documents
- **Rate Limiting**: Implements SEC's required 10 requests per second limit
- **Error Handling**: Comprehensive error boundaries and fallback states

### AI Integration Strategy

- **Gemini Pro**: Chosen for cost-effectiveness and document analysis capabilities
- **Request Optimization**: Truncates documents to 30K characters to fit context window
- **Caching**: 30-minute cache for expensive AI analysis results ($1.25 per million input tokens)

---

## Deployment

### Environment Variables

```bash
# Required
GEMINI_API_KEY=your_gemini_api_key_here
```

### Production Build

```bash
npm run build
npm start
```

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.


