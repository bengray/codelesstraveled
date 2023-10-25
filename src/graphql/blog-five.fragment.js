import { graphql } from "gatsby";

export const query = graphql`
    fragment BlogFive on Article {
        title
        slug
        format
        excerpt
        categories {
            title
            slug
        }
        postedAt {
            date(formatString: "LL")
            slug
        }
        author {
            ...Author
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
        quote_text
        quote_author
        video_link
    }
`;
