# Astro Theme: Minimal Blog

Welcome to **Astro Theme: Minimal Blog**, an ideal option to start sharing your ideas. It's easy to set up and features everything you'd need for a blog.

[**Demo Website**](https://astro-theme-minimal-blog.lekoarts.de)

## ✨ Features

- MDX support
- No React, just Astro
- Styled with [Tailwind](https://tailwindcss.com/)
- RSS, Sitemap
- Code blocks powered by [Expressive Code](https://expressive-code.com/)
- Light/Dark mode
- [Pagefind](https://pagefind.app/) search

## 🚀 Getting started

1. **Important:** Ensure that [pnpm](https://pnpm.io/installation) is installed
1. Clone the [astro-theme-minimal-blog](https://github.com/LekoArts/astro-theme-minimal-blog) repository.
1. Install dependencies.
   ```shell
   pnpm install
   ```
1. Run the development server.
   ```shell
   pnpm dev
   ```

## 📝 Using & modifying this theme

### Add content

This theme features a CLI to help you scaffold new blog posts. It asks you questions to fill out the frontmatter and creates a file in the end. Run the CLI:

```shell
pnpm assistant
```

If you want to extend it, change the [`assistant.ts`](./scripts/assistant.ts) file.

### Change constants

Parts of the theme are referencing [`constants.ts`](./src/constants.ts) to e.g. set the site title or main navigation. Modify its contents to suit your site before deploying it.

## 🔍 Reference

### Blog post frontmatter

By default, these frontmatter fields are available. You need to change [`content.config.ts`](./src/content.config.ts) to adjust it.

```yaml
title: Markdown Reference Overview
slug: markdown-reference-overview
description: A post showcasing the markdown formatting of a post
date: 2025-02-18
lastUpdated: 2025-02-18
tags:
  - General
  - MDX
searchIndex: true
image: https://absolute-link.google.com/image.png
```
