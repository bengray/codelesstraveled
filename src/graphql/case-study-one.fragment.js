import { graphql } from "gatsby";

export const query = graphql`
    fragment CaseStudyOne on CaseStudy {
        id
        title
        slug
        category
        excerpt
        featured_image {
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
`;
