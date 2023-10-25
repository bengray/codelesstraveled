import { graphql } from "gatsby";

export const query = graphql`
    fragment BlogSix on Article {
        id
        title
        slug
        format
        video_link
        quote_text
        quote_author
        categories {
            title
            slug
        }
        tags {
            title
            slug
        }
        image {
            src {
                childImageSharp {
                    gatsbyImageData(
                        placeholder: TRACED_SVG
                        formats: WEBP
                        quality: 100
                        breakpoints: 5
                    )
                }
            }
            alt
        }
        author {
            name
            slug
            bio
            socials {
                id
                title
                link
                icon
            }
            image {
                src {
                    childImageSharp {
                        gatsbyImageData(
                            quality: 100
                            formats: WEBP
                            placeholder: TRACED_SVG
                            breakpoints: 5
                        )
                    }
                }
            }
        }
        postedAt {
            date(formatString: "LL")
            slug
        }
        content
    }
`;
