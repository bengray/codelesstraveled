import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { normalizedData } from "@utils";
import Seo from "@components/seo";
import Layout from "@layout";
import Header from "@layout/header/layout-01";
import Footer from "@layout/footer/layout-01";
import PageHeader from "@containers/page-header/layout-01";
import AboutArea from "@containers/about/layout-04";

const AboutPage = ({ location, data }) => {
  const content = normalizedData(data?.page.content || []);
  const globalContent = normalizedData(data?.allGeneral.nodes || []);

  return (
    <Layout location={location}>
      <Seo title="About Us" />
      <Header
        data={{
          ...globalContent["header"],
          ...globalContent["menu"],
        }}
      />
      <main className="site-wrapper-reveal">
        <PageHeader data={content["page-header-section"]} />
        <AboutArea data={content["about-section"]} />
      </main>
      <Footer data={{ ...data.site.siteMetadata }} />
    </Layout>
  );
};

export const query = graphql`
  query AboutPageQuery {
    allGeneral {
      nodes {
        section
        ...HeaderOne
      }
    }
    site {
      ...Site
    }
    page(title: { eq: "about-us" }, pageType: { eq: "innerpage" }) {
      content {
        ...PageContent
      }
    }
    allItSolution(limit: 3) {
      nodes {
        ...ItSolutionThree
      }
    }
  }
`;

AboutPage.propTypes = {
  location: PropTypes.shape({}),
  data: PropTypes.shape({
    allGeneral: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        contact: PropTypes.shape({}),
      }),
    }),
    page: PropTypes.shape({
      content: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    allItSolution: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

export default AboutPage;
