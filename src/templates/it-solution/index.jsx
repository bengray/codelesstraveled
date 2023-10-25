import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import { normalizedData } from "@utils";
import Seo from "@components/seo";
import Layout from "@layout";
import Header from "@layout/header/layout-02";
import Footer from "@layout/footer/layout-01";
import IntroArea from "@containers/intro/layout-01";
import FaqArea from "@containers/faq/layout-02";
import WhatsNewArea from "@containers/whats-new/layout-01";
import CtaArea from "@containers/cta/layout-04";
import { ImageType } from "@utils/types";
import {
    BannerArea,
    StyledBannerTextWrap,
    StyledTitle,
    StyledTagline,
} from "./style";

const ITSolutionTemplate = ({ location, data }) => {
    const globalContent = normalizedData(data?.allGeneral.nodes || []);
    const content = normalizedData(data?.itSolution?.content || []);
    const pageData = data.itSolution;

    let bannerImg;
    if (pageData?.banner_image?.src) {
        bannerImg = convertToBgImage(getImage(pageData.banner_image.src));
    }
    return (
        <Layout location={location}>
            <Seo title={pageData?.title} />
            <Header
                data={{
                    ...globalContent["header"],
                    ...globalContent["menu"],
                    socials: data.site.siteMetadata.socials,
                }}
            />
            <main className="site-wrapper-reveal">
                <BannerArea {...bannerImg}>
                    <StyledBannerTextWrap>
                        {pageData?.title && (
                            <StyledTitle>{pageData.title}</StyledTitle>
                        )}
                        {pageData?.tagline && (
                            <StyledTagline>{pageData.tagline}</StyledTagline>
                        )}
                    </StyledBannerTextWrap>
                </BannerArea>
                <IntroArea data={content["intro-section"]} />
                <FaqArea space={2} data={content["faq-section"]} />
                <WhatsNewArea space={2} data={content["whats-new-section"]} />
                <CtaArea data={content["cta-section"]} />
            </main>
            <Footer data={{ ...data.site.siteMetadata }} />
        </Layout>
    );
};

export const query = graphql`
    query ItSolutionDetailsQuery($slug: String!) {
        allGeneral {
            nodes {
                section
                ...HeaderTwo
            }
        }
        site {
            ...Site
        }
        itSolution(slug: { eq: $slug }) {
            title
            tagline
            banner_image {
                alt
                src {
                    childImageSharp {
                        gatsbyImageData(
                            width: 100
                            formats: WEBP
                            placeholder: TRACED_SVG
                            layout: FULL_WIDTH
                        )
                    }
                }
            }
            content {
                ...SolutionContent
            }
        }
    }
`;

ITSolutionTemplate.propTypes = {
    location: PropTypes.shape({}),
    data: PropTypes.shape({
        allGeneral: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                socials: PropTypes.arrayOf(PropTypes.shape({})),
            }),
        }),
        itSolution: PropTypes.shape({
            banner_image: PropTypes.shape(ImageType),
            title: PropTypes.string,
            tagline: PropTypes.string,
            content: PropTypes.arrayOf(PropTypes.shape({})),
        }),
    }),
};

export default ITSolutionTemplate;
