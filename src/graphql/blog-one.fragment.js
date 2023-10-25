import { graphql } from "gatsby";

export const query = graphql`
    fragment BlogOne on Article {
        title
        slug
        postedAt {
            date(formatString: "LL")
            slug
        }
        excerpt
        format
        image {
            src {
                childImageSharp {
                    gatsbyImageData(
                        layout: CONSTRAINED
                        width: 550
                        height: 340
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
