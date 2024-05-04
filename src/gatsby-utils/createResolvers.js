const { slugify } = require("../utils");

module.exports = ({ createResolvers }) => {
    const resolvers = {
        Article: {
            postedAt: {
                resolve: (source) => {
                    return {
                        date: source.postedAt,
                        slug: slugify(source.postedAt),
                    };
                },
            },
            categories: {
                resolve: (source) => {
                    return source.categories.map((cat) => ({
                        title: cat,
                        slug: slugify(cat),
                    }));
                },
            },
            tags: {
                resolve: (source) => {
                    return source.tags.map((tag) => ({
                        title: tag,
                        slug: slugify(tag),
                    }));
                },
            },
        },
    };
    createResolvers(resolvers);
};
