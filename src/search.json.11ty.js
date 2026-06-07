class SearchIndex {
  data() {
    return {
      permalink: "/search.json",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const pages = data.collections.all.map(page => {
      // Basic strip tags and cleanup
      let content = page.templateContent || "";
      content = content.replace(/(<([^>]+)>)/gi, " ");
      content = content.replace(/\s+/g, " ").trim();
      
      return {
        title: page.data.title || "SIBAKOM Page",
        url: page.url,
        content: content.substring(0, 1500)
      };
    });

    return JSON.stringify(pages);
  }
}

module.exports = SearchIndex;
