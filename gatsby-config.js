/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    pathPrefix: `/`,
    siteMetadata: {
        title: "Code Less Traveled",
        titleTemplate: `Code Less Traveled`,
        description: `Code Less Traveled develops custom web-based software applications.`,
        author: `Ben Gray`,
        twitterUsername: `@bgray`,
        image: "landing.png",
        siteUrl: "https://codelesstraveled.com",
        canonical: "https://codelesstraveled.com",
        getform: "https://getform.io/f/nbdoxkra",
        copyright:
            "Code Less Traveled LLC. All Rights Reserved.",
        siteLanguage: "en",
        socials: [
            {
                id: 1,
                icon: "fab fa-facebook-f",
                link: "https://www.facebook.com",
                title: "Facebook",
            }
        ],
        contact: {
            phone: "404.775.4539",
            email: "ben@codelesstraveled.com",
            website: "https://codelesstraveled.com/",
            customers: "700",
            clients: "3200",
            address: "Newnan, GA 30265"
        },
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-styled-components`,
        "gatsby-transformer-json",
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                excerpt_separator: `<!-- endexcerpt -->`,
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `fonts`,
                path: `${__dirname}/src/assets/fonts`,
                ignore: [`**/\.*`],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/assets/images`,
                ignore: [`**/\.*`],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/src/data`,
                ignore: [`**/\.*`],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "Code Less Traveled",
                short_name: "CLT",
                theme_color: "#086ad8",
                background_color: "#ffffff",
                display: "standalone",
                scope: "/",
                start_url: "/",
                icon: "src/assets/images/favicon.png",
                icons: [
                    {
                        src: "/icons/icon-72x72.png",
                        sizes: "72x72",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-96x96.png",
                        sizes: "96x96",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-128x128.png",
                        sizes: "128x128",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-144x144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-152x152.png",
                        sizes: "152x152",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-384x384.png",
                        sizes: "384x384",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-breadcrumb`,
            options: {
                useAutoGen: true,
                autoGenHomeLabel: `Home`,
                exclude: [`/dev-404-page`, `/404`, `/404.html`],
                useClassNames: true,
            },
        },
        "gatsby-plugin-offline",
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // The property ID; the tracking code won't be generated without it
                trackingId: "G-1309704R5Z",
                // Defines where to place the tracking script - `true` in the head and `false` in the body
                head: true,
                // Delays sending pageview hits on route update (in milliseconds)
                pageTransitionDelay: 0,
                // Defers execution of google analytics script after page load
                defer: false,
                // Any additional optional fields
                sampleRate: 5,
                siteSpeedSampleRate: 10,
                cookieDomain: "codelesstraveled.com",
                // defaults to false
                enableWebVitalsTracking: true,
            },
        },
    ],
};
