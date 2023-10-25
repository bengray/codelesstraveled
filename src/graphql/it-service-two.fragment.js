import { graphql } from "gatsby";

export const query = graphql`
    fragment ItServiceTwo on ItService {
        id
        title
        slug
        excerpt
        icon {
            images {
                src {
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
        }
    }
`;
