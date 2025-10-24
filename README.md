# 🌾 Ask Stardew Wiki

> **Finally, stop searching, start asking the wiki your questions!**

Ask Stardew Wiki is a [RAG](https://developers.cloudflare.com/ai-search/concepts/what-is-rag/)-based search engine designed specifically for the Stardew Valley Wiki. It goes beyond simple keyword matching to understand the meaning and context of your questions, helping you find the most relevant wiki sections quickly and precisely.

## 🎯 What Makes This Different?

#### Searches are not the same. To be clear:

| Traditional Wiki Search | Ask Stardew Wiki ✅ | AI Chatbot |
|------------------------|---------------------|------------|
| Simple keyword matching in page titles and content | Finds deeply relevant wiki sections by semantic comparison | Writes new, original text |
| Provides links to pages | Provides sources & links to wiki sections | May hallucinate or provide incorrect facts |
| Best for finding specific pages by name (e.g., "Starfruit") | Best for asking questions and finding sources (e.g., "How do I get iridium ore?") | Best for summaries and calculations |

### Key Features

- **🧠 Semantic Understanding**: Understands the meaning behind your questions, not just keywords
- **🎮 Gameplay Focused**: Only searches gameplay-related content (no admin/community pages)
- **📖 Source-Verified**: All results come directly from the wiki - no AI-generated content
- **🎨 Stardew Valley Themed**: Beautiful pixel-art inspired interface that matches the game's aesthetic
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **👍 Feedback System**: Help us improve by rating search results

## 🚀 How It Works

Ask Stardew Wiki uses **Retrieval-Augmented Generation (RAG)** technology without generative AI:

1. **Your Question**: Ask anything about Stardew Valley gameplay
2. **Semantic Search**: The engine finds the most conceptually relevant wiki sections
3. **Source Results**: You get exact quotes from the wiki with direct links to sections
4. **No Hallucinations**: Everything comes from the official wiki - guaranteed accuracy

### Example Queries

- "Where can I find Louis's shorts?"
- "What does Sebastian like as gifts?"
- "How do I get iridium ore?"
- "What's the best crop for summer?"
- "How do I unlock the greenhouse?"

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite by [@Lovable](https://lovable.dev/)
- **UI Framework**: Tailwind CSS + shadcn/ui components by [@Lovable](https://lovable.dev/)
- **Styling**: Custom Stardew Valley themed design system by [@Lovable](https://lovable.dev/)
- **Search Engine**: Vector-based semantic search
- **Backend**: Cloudflare Workers with vector database and KV integration


## 📋 Current Version (v1.0.0)

- ✅ Semantic search engine integration
- ✅ Direct links to wiki sections
- ✅ Responsive design with Stardew Valley theming
- ✅ About page with comprehensive documentation
- ✅ Query-retrieval feedback gathering system

## 🔮 Roadmap

- 🔄**1.1.0**: Automated wiki content updates via cron jobs

### 
- 🔄**v2.0.0**: Multi-language support for international wiki versions

## 🎮 Why This Exists

Stardew Valley is a complex game with hundreds of items, characters, recipes, and mechanics. The official wiki is comprehensive but can be overwhelming to navigate. Traditional search often requires you to know exactly what you're looking for.

Ask Stardew Wiki bridges this gap by understanding what you're trying to accomplish, not just what you're searching for. Whether you're a new player wondering how to get started or a veteran looking for specific optimization strategies, this tool helps you find the information you need faster.

## 🚫 What This Is NOT

- **Not an AI Chatbot**: It doesn't generate new content or provide opinions
- **Not a Wiki Replacement**: It's a search tool that helps you navigate the existing wiki
- **Not Comprehensive**: Only covers gameplay content (excludes admin/community pages)
- **Not Real-time**: Content is periodically updated from the wiki

## 🎯 Perfect For

- **New Players**: Get answers to common questions without navigating complex wiki pages
- **Experienced Players**: Quickly find specific information for optimization and planning
- **Content Creators**: Efficiently research game mechanics for guides and videos
- **Community Helpers**: Provide accurate, source-backed answers to community questions

---

*Ask Stardew Wiki - Making the Stardew Valley Wiki more accessible, one question at a time.* 🌾
