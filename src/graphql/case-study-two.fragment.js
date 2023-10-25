import { graphql } from "gatsby";

export const query = graphql`
    fragment CaseStudyTwo on CaseStudy {
        id
        title
        slug
        category
        excerpt
        slide_image {
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
