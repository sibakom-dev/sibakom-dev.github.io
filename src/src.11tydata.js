module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      // If the page already has a hardcoded permalink, honor it
      if (data.permalink) return data.permalink;
      
      const filePath = data.page.filePathStem;
      
      // Match pattern: /locale/hash12/folder/slug
      // e.g. /en/8b9eb9678905/projects/cccccccccccccc
      const match = filePath.match(/^\/([a-z]{2})\/([a-f0-9]{12})\/(services|projects|newsroom)\/(.*)$/);
      
      if (match) {
        const locale = match[1];
        const folder = match[3];
        const slug = match[4];
        
        if (slug === 'index') {
            return `/${locale}/${folder}/index.html`;
        }
        return `/${locale}/${folder}/${slug}/index.html`;
      }
      
      return data.permalink; // fallback to undefined (Eleventy default behavior)
    }
  }
};
