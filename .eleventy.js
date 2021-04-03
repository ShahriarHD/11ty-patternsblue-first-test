const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');

const filterDateDisplay = require('./src/filters/date-display');
const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(pluginNavigation);

    eleventyConfig.addFilter('dateDisplay', filterDateDisplay);

    eleventyConfig.addPassthroughCopy({ public: './' });
    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addCollection('postsWithoutDrafts', (collection) =>
        [...collection.getFilteredByGlob('src/posts/*.md')].filter((post) => !post.data.draft)
    );

    /* Markdown Overrides */
    const markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
    });

    eleventyConfig.setLibrary('md', markdownLibrary);

    eleventyConfig.setBrowserSyncConfig({
        watch: true,
    });

    return {
        templateFormats: ['md', 'njk', 'html', 'liquid'],

        markdownTemplateEngine: 'liquid',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',

        // These are all optional, defaults are shown:
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'includes/layouts',
            data: 'data',
        },
    };
};
