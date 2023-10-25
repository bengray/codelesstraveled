import { graphql } from "gatsby";

export const query = graphql`
    fragment BlogThree on Article {
        title
        slug
        postedAt {
            date(formatString: "LL")
            slug
        }
        author {
            ...Author
        }
        excerpt
        format
        image {
            src {
                childImageSharp {
                    gatsbyImageData(
                        layout: CONSTRAINED
                        width: 690
                        height: 422
                        placeholder: TRACED_SVG
                        formats: WEBP
                        quality: 100
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
