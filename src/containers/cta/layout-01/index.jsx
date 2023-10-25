import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import { Container, Row, Col } from "@ui/wrapper";
import VideoButton from "@ui/video-button";
import { HeadingType, VideoButtonType } from "@utils/types";
import { SectionWrap, StyledTitle } from "./style";

const CtaArea = ({ data }) => {
    const ctaData = useStaticQuery(graphql`
        query CtaOneQuery {
            file(
                relativePath: { eq: "bg/home-infotechno-video-intro-bg.jpg" }
            ) {
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
    const bgImage = convertToBgImage(getImage(ctaData.file));

    return (
        <SectionWrap {...bgImage}>
            <Container>
                <Row>
                    <Col lg={6} md={10} xs={11} ml="auto">
                        {data?.headings?.[0] && (
                            <StyledTitle
                                as={data.headings?.[0]?.level}
                                dangerouslySetInnerHTML={{
                                    __html: data.headings[0].content,
                                }}
                            />
                        )}
                        {data?.video_button && (
                            <VideoButton
                                color="primary"
                                textStyle={2}
                                content={data?.video_button?.content}
                                link={data.video_button.link}
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        </SectionWrap>
    );
};

CtaArea.propTypes = {
    data: PropTypes.shape({
        headings: PropTypes.arrayOf(PropTypes.shape(HeadingType)),
        video_button: PropTypes.shape(VideoButtonType),
    }),
};

export default CtaArea;
