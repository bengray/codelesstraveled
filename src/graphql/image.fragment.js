import { graphql } from "gatsby";

export const query = graphql`
    fragment Image on Image {
        src {
            name
            childImageSharp {
                gatsbyImageData(
                    formats: WEBP
                    placeholder: TRACED_SVG
                    quality: 100
                    breakpoints: 5
                )
            }
        }
        alt
    }
`;
