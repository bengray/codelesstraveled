import { graphql } from "gatsby";

export const query = graphql`
    fragment ItSolutionOne on ItSolution {
        id
        title
        slug
        icon {
            images {
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
            }
        }
    }
`;
