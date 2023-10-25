import { graphql } from "gatsby";

export const query = graphql`
    fragment ItSolutionTwo on ItSolution {
        id
        title
        slug
        excerpt
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
