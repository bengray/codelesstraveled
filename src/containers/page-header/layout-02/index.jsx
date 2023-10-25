import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "gatsby-plugin-breadcrumb";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import { PageHeaderWrap } from "./style";

const PageHeader = ({ pageContext, location, title }) => {
    const {
        breadcrumb: { crumbs },
    } = pageContext;
    const disableLinks = [
        "/elements",
        "/category",
        "/profile",
        "/date",
        "/tag",
        "/page",
        "/blog",
        "/blog/page",
        "/blogs",
        "/services",
    ];
    const customCrumbLabel = location.pathname.toLowerCase();
    const crumbLabelArr = customCrumbLabel.split("/");
    const label = crumbLabelArr[crumbLabelArr.length - 1];
    const labelArr = label.split("-");
    const imageData = useStaticQuery(graphql`
        query breadCrumbImgQuery {
            file(relativePath: { eq: "bg/title-bar-01-bg.jpg" }) {
                childImageSharp {
                    gatsbyImageData(
                        layout: FULL_WIDTH
                        placeholder: TRACED_SVG
                        formats: WEBP
                        quality: 100
                    )
                }
            }
        }
    `);
    const bgImage = convertToBgImage(getImage(imageData.file));
    return (
        <PageHeaderWrap {...bgImage}>
            <Breadcrumb
                title={title}
                crumbs={crumbs}
                crumbLabel={labelArr.join(" ")}
                disableLinks={disableLinks}
            />
        </PageHeaderWrap>
    );
};

PageHeader.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
    pageContext: PropTypes.shape({
        breadcrumb: PropTypes.shape({
            crumbs: PropTypes.arrayOf(PropTypes.shape({})),
        }),
    }),
    title: PropTypes.string,
};

export default PageHeader;
