import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import { Container, Row, Col } from "@ui/wrapper";
import Button from "@ui/button";
import VideoButton from "@ui/video-button";
import Image from "@ui/image";
import {
    HeadingType,
    ButtonType,
    VideoButtonType,
    ImageType,
    TextType,
} from "@utils/types";
import {
    HeroWrapper,
    HeroBtnGroup,
    HeroTextBox,
    ImageBox,
    StyledTitle,
    StyledSubtitle,
    StyledText,
} from "./style";

const HeroArea = ({ data }) => {
    const herBg = useStaticQuery(graphql`
        query heroThreeQuery {
            file(relativePath: { eq: "bg/slider-processing-slide-01-bg.jpg" }) {
                childImageSharp {
                    gatsbyImageData(
                        layout: CONSTRAINED
                        width: 711
                        height: 280
                        placeholder: TRACED_SVG
                        formats: WEBP
                        quality: 100
                    )
                }
            }
        }
    `);

    const bgImage = convertToBgImage(getImage(herBg.file));

    return (
        <HeroWrapper {...bgImage}>
            <Container>
                <Row alignItems="center">
                    <Col lg={8} md={7}>
                        <HeroTextBox>
                            {data?.headings?.[0] && (
                                <StyledSubtitle as={data.headings[0]?.level}>
                                    {data.headings[0].content}
                                </StyledSubtitle>
                            )}
                            {data?.headings?.[1] && (
                                <StyledTitle
                                    as={data.headings[1]?.level}
                                    dangerouslySetInnerHTML={{
                                        __html: data.headings[1].content,
                                    }}
                                />
                            )}
                            {data?.texts?.[0] && (
                                <StyledText>{data.texts[0].content}</StyledText>
                            )}
                            <HeroBtnGroup>
                                {data?.buttons?.map(
                                    ({ id, path, content, ...rest }) => (
                                        <Button
                                            key={id}
                                            path={path}
                                            m={["10px", 0]}
                                            mr={[null, "20px"]}
                                            {...rest}
                                        >
                                            {content}
                                        </Button>
                                    )
                                )}
                                {data?.video_button && (
                                    <VideoButton
                                        wave="false"
                                        size="small"
                                        color="light"
                                        variant="outlined"
                                        icon={{ color: "#fff" }}
                                        link={data.video_button?.link}
                                        content={data.video_button?.content}
                                    />
                                )}
                            </HeroBtnGroup>
                        </HeroTextBox>
                    </Col>
                    <Col lg={4} md={5}>
                        <ImageBox>
                            {data?.images?.[0].src && (
                                <Image
                                    src={data.images[0].src}
                                    alt={data.images[0]?.alt || "Hero"}
                                />
                            )}
                        </ImageBox>
                    </Col>
                </Row>
            </Container>
        </HeroWrapper>
    );
};

HeroArea.propTypes = {
    data: PropTypes.shape({
        headings: PropTypes.arrayOf(PropTypes.shape(HeadingType)),
        buttons: PropTypes.arrayOf(PropTypes.shape(ButtonType)),
        video_button: PropTypes.shape(VideoButtonType),
        images: PropTypes.arrayOf(PropTypes.shape(ImageType)),
        texts: PropTypes.arrayOf(PropTypes.shape(TextType)),
    }),
};

export default HeroArea;
