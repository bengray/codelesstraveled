import { graphql } from "gatsby";

export const query = graphql`
    fragment CaseStudyThree on CaseStudy {
        banner_image {
            alt
            src {
                childImageSharp {
                    gatsbyImageData(
                        layout: FULL_WIDTH
                        quality: 100
                        placeholder: DOMINANT_COLOR
                        formats: WEBP
                    )
                }
            }
        }
        logo {
            alt
            src {
                childImageSharp {
                    gatsbyImageData(
                        quality: 100
                        placeholder: DOMINANT_COLOR
                        formats: WEBP
                    )
                }
            }
        }
        tagline
        content {
            section
            headings {
                level
                content
            }
            texts {
                content
            }
            tags
            client {
                name
                designation
                company
            }
            section_title {
                title
                subtitle
            }
            video_button {
                link
            }
            buttons {
                id
                path
                content
                variant
                color
                shape
                size
                hoverStyle
                disableHover
                icon
                icondistance
                iconposition
                fontWeight
            }
            images {
                alt
                src {
                    childImageSharp {
                        gatsbyImageData(
                            quality: 100
                            formats: WEBP
                            placeholder: DOMINANT_COLOR
                        )
                    }
                }
            }
            items {
                id
                title
                description
                name
                designation
                rating
                images {
                    alt
                    src {
                        childImageSharp {
                            gatsbyImageData(
                                quality: 100
                                formats: WEBP
                                placeholder: DOMINANT_COLOR
                            )
                        }
                    }
                }
            }
        }
    }
`;
