# Blog Posts

This directory contains the blog posts and articles for the portfolio website. Each post is structured as a JSON object with comprehensive metadata and content.

## Post Structure

Each blog post in `posts.json` follows this structure:

```json
{
  "id": "unique-identifier",
  "title": "Post Title",
  "slug": "url-friendly-slug",
  "excerpt": "Brief description for previews",
  "category": "AI/ML | Development | Technology",
  "date": "YYYY-MM-DD",
  "readTime": "X min read",
  "featured": true/false,
  "order": 1
}
```

## Categories

- **AI/ML**: Artificial Intelligence and Machine Learning topics
- **Development**: Software development practices and tutorials
- **Technology**: General technology trends and insights

## Featured Posts

Featured posts are highlighted on the main blog page and represent the most important or recent content. Currently featuring:

1. **LangChain for Beginners** - Introduction to LangChain framework
2. **Local LLMs Guide** - Running AI models locally
3. **NLP Fundamentals** - Natural Language Processing basics
4. **AI Automation** - Building automated AI workflows

## Content Guidelines

### Writing Style
- Technical but accessible language
- Clear explanations with practical examples
- Include code snippets where relevant
- Focus on real-world applications

### SEO Optimization
- Descriptive titles and excerpts
- Relevant category classification
- Proper slug formatting
- Keyword-rich but natural content

### Content Quality
- Original research and insights
- Up-to-date information
- Practical value for readers
- Proper citations and references

## Dynamic Routing

Posts are accessible via `/blog/[slug]` routes, with:
- Server-side static generation for performance
- Client-side interactivity for animations
- Responsive design across all devices
- Consistent theming with portfolio design

## Future Enhancements

- [ ] Markdown support for rich content
- [ ] Comment system integration
- [ ] Social sharing functionality
- [ ] Related posts recommendations
- [ ] Search functionality
- [ ] RSS feed generation