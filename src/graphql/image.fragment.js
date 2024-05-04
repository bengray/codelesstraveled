import { graphql } from "gatsby";

export const query = graphql`
    fragment Image on Image {
        src {
            name
            childImageSharp {
                gatsbyImageData(
                    formats: WEBP
                    quality: 100
                    breakpoints: 5
                    placeholder: DOMINANT_COLOR
                    transformOptions: { cropFocus: CENTER }
                    outputPixelDensities: [0.5, 1]
                )
            }
        }
        alt
    }
`;
