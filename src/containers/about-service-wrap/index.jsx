import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import { AboutServiceWrapStyle, AboutServiceInner } from "./style";

const AboutServiceWrap = ({ children }) => {
    const imageData = useStaticQuery(graphql`
        query ABoutServiceImageQuery {
            file(
                relativePath: {
                    eq: "bg/mitech-home-infotechno-section-company-bg.png"
                }
            ) {
                childImageSharp {
                    gatsbyImageData(
                        layout: CONSTRAINED
                        width: 428
                        height: 680
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
        <AboutServiceWrapStyle>
            <AboutServiceInner {...bgImage} />
            {children}
        </AboutServiceWrapStyle>
    );
};

AboutServiceWrap.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AboutServiceWrap;
