import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { normalizedData } from "@utils";
import Seo from "@components/seo";
import Layout from "@layout";
import Header from "@layout/header/layout-02";
import Footer from "@layout/footer/layout-01";
import HeroArea from "@containers/hero/layout-08";
import FunFactArea from "@containers/funfact/layout-02";
import CtaArea from "@containers/cta/layout-04";
import BlogArea from "@containers/blog/layout-04";
import CaseStudyArea from "@containers/case-study/layout-01";
import SoftwareTechnology from "@containers/software-technology/layout-01";
import IndistroesServeSectoion from "@containers/software-technology/layout-02";
import ItSolutionArea from "@containers/it-solution/layout-08";
import ServiceArea from "@containers/it-service/layout-05";

const SoftwareInnovationPage = ({ location, data }) => {
    const content = normalizedData(data?.page.content || []);
    const globalContent = normalizedData(data?.allGeneral.nodes || []);
    return (
        <Layout location={location}>
            <Seo title="Appointment" />
            <Header
                data={{
                    ...globalContent["header"],
                    ...globalContent["menu"],
                    socials: data.site.siteMetadata.socials,
                }}
            />
            <main className="site-wrapper-reveal">
                <HeroArea data={content["hero-section"]} />
                <ItSolutionArea
                    data={{
                        ...content["feature-section"],
                        items: data.features.nodes,
                    }}
                />
                <IndistroesServeSectoion
                    data={content["software-indistroes-serve-section"]}
                />
                <ServiceArea
                    data={{
                        ...content["service-section"],
                        items: data.allItService.nodes,
                    }}
                />
                <FunFactArea data={content["funfact-section"]} />
                <CaseStudyArea
                    data={{
                        ...content["case-study-section"],
                        items: data.allCaseStudy.nodes,
                    }}
                />
                <SoftwareTechnology
                    data={content["software-technology-section"]}
                />
                <BlogArea
                    data={{
                        ...content["blog-section"],
                        featuredBlogs: data.featuredBlogs.nodes,
                    }}
                />
                <CtaArea data={content["cta-section"]} />
            </main>
            <Footer data={{ ...data.site.siteMetadata }} />
        </Layout>
    );
};
export const query = graphql`
    query SoftwarePageQuery {
        allGeneral {
            nodes {
                section
                ...HeaderTwo
            }
        }
        site {
            ...Site
        }
        page(
            title: { eq: "software-innovation" }
            pageType: { eq: "frontpage" }
        ) {
            content {
                ...PageContent
            }
        }
        allItService(
            sort: { id: DESC }
            filter: { is_featured: { eq: true } }
            limit: 8
        ) {
            nodes {
                ...ItServiceTwo
            }
        }
        features: allItSolution(
            filter: { is_featured: { eq: true } }
            limit: 3
        ) {
            nodes {
                ...ItSolutionTwo
            }
        }
        featuredBlogs: allArticle(
            filter: { is_featured: { eq: true } }
            limit: 3
        ) {
            nodes {
                ...BlogOne
            }
        }
        allCaseStudy(filter: { is_featured: { eq: true } }, limit: 4) {
            nodes {
                ...CaseStudyOne
            }
        }
    }
`;

SoftwareInnovationPage.propTypes = {
    location: PropTypes.shape({}),
    data: PropTypes.shape({
        page: PropTypes.shape({
            content: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        allGeneral: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                socials: PropTypes.arrayOf(PropTypes.shape({})),
            }),
        }),
        allItService: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        features: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        featuredBlogs: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        allCaseStudy: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
    }),
};

export default SoftwareInnovationPage;
