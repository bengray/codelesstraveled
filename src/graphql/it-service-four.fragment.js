import { graphql } from "gatsby";

export const query = graphql`
    fragment ItServiceFour on ItService {
        title
        tagline
        banner_image {
            alt
            src {
                childImageSharp {
                    gatsbyImageData(
                        width: 100
                        formats: WEBP
                        layout: FULL_WIDTH
                        placeholder: DOMINANT_COLOR
                    )
                }
            }
        }
        content {
            ...ServiceContent
        }
    }
`;
