import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import PropTypes from "prop-types";
import { Container, Row, Col } from "@ui/wrapper";
import Button from "@ui/button";
import { HeadingType, ButtonType } from "@utils/types";
import { StyledSection, StyledHeading } from "./style";

const CTAArea = ({ data }) => {
    const ctaData = useStaticQuery(graphql`
        query CtaImgQuery {
            file(relativePath: { eq: "bg/cta-bg.png" }) {
                childImageSharp {
                    gatsbyImageData(
                        layout: CONSTRAINED
                        width: 779
                        height: 746
                        placeholder: TRACED_SVG
                        formats: WEBP
                        quality: 100
                    )
                }
            }
        }
    `);
    const bgImage = convertToBgImage(getImage(ctaData.file));
    return (
        <StyledSection {...bgImage}>
            <Container>
                <Row
                    alignItems="center"
                    textAlign={["center", null, null, "left"]}
                >
                    <Col xl={8} lg={7}>
                        {data?.headings?.[0] && (
                            <StyledHeading
                                as={data.headings[0]?.level}
                                dangerouslySetInnerHTML={{
                                    __html: data.headings[0]?.content,
                                }}
                            />
                        )}
                    </Col>
                    <Col xl={4} lg={5} className="text-center">
                        {data?.buttons?.map(({ id, content, ...rest }) => (
                            <Button key={id} m="7px" {...rest}>
                                {content}
                            </Button>
                        ))}
                    </Col>
                </Row>
            </Container>
        </StyledSection>
    );
};

CTAArea.propTypes = {
    data: PropTypes.shape({
        headings: PropTypes.arrayOf(PropTypes.shape(HeadingType)),
        buttons: PropTypes.arrayOf(PropTypes.shape(ButtonType)),
    }),
};

export default CTAArea;
