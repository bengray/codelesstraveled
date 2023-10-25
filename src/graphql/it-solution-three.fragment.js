import { graphql } from "gatsby";

export const query = graphql`
    fragment ItSolutionThree on ItSolution {
        id
        title
        slug
        excerpt
        featured_image {
            src {
                childImageSharp {
                    gatsbyImageData(
                        quality: 100
                        formats: WEBP
                        placeholder: TRACED_SVG
                        layout: CONSTRAINED
                        width: 480
                        height: 298
                    )
                }
            }
        }
    }
`;
