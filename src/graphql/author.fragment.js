import { graphql } from "gatsby";

export const query = graphql`
    fragment Author on Author {
        name
        slug
        image {
            src {
                childImageSharp {
                    gatsbyImageData(
                        layout: FIXED
                        width: 32
                        height: 32
                        placeholder: TRACED_SVG
                        formats: WEBP
                        quality: 100
                    )
                }
            }
            alt
        }
    }
`;
