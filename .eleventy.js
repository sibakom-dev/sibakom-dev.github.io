const { EleventyI18nPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // i18n configuration
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "en",
    errorMode: "allow-fallback"
  });

  // Passthrough copy for static assets
  eleventyConfig.addFilter("date_format", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Passthrough copy for admin CMS
  eleventyConfig.addPassthroughCopy("src/admin");

  // Passthrough copy for co-located images in markdown folders
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.gif");
  eleventyConfig.addPassthroughCopy("src/**/*.svg");

  // Output directory
  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes"
    },
  };
};
