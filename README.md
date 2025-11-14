# Nama Agent

A minimalist AI chat interface powered by n8n, built with Next.js and styled with shadcn/ui.

## Features

- 🎨 Clean, minimalist UI with shadcn/ui components
- 💬 Real-time chat interface
- 🔗 n8n webhook integration
- 📱 Fully responsive design
- ⚡ Built with Next.js 14 and TypeScript
- 🎯 Markdown support in messages

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An n8n instance with a webhook configured
- Vercel account (for deployment)

### Local Development

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## n8n Chat Trigger Setup

This app connects to an n8n workflow with a **Chat Trigger** node. The workflow:

1. Uses the "When chat message received" node (Chat Trigger)
2. Connects to an AI Agent node (langchain)
3. Returns responses in the format: `{ "output": "Agent's response" }`

The chat sends requests with:
```json
{
  "action": "sendMessage",
  "sessionId": "session-123",
  "chatInput": "User's message"
}
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add your environment variable in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add `N8N_WEBHOOK_URL` with your webhook URL

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add the `N8N_WEBHOOK_URL` environment variable
4. Deploy!

## Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # n8n webhook integration
│   ├── globals.css            # Global styles with shadcn variables
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── chat.tsx               # Main chat component
│   ├── chat-input.tsx         # Message input component
│   └── chat-message.tsx       # Message bubble component
├── lib/
│   └── utils.ts               # Utility functions (cn helper)
└── public/                    # Static assets
```

## Customization

### Styling

The app uses shadcn/ui theming. You can customize colors in `app/globals.css` by modifying the CSS variables.

### API Response

If your n8n workflow returns a different response structure, update the response parsing in `app/api/chat/route.ts`:

```typescript
const assistantMessage = data.output || data.message || data.response || "No response";
```

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Markdown:** react-markdown + remark-gfm
- **Icons:** lucide-react
- **Deployment:** Vercel

## License

MIT
