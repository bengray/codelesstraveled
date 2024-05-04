import React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";
import Image from "@ui/image";
import { Container, Row, Col } from "@ui/wrapper";
import Button from "@ui/button";
import {
    ButtonType,
    ItemType,
    ImageType,
    HeadingType,
    TextType,
} from "@utils/types";
import {
    StyledSection,
    StyledButtonWrap,
    StyledBG,
    StyledHeading,
    StyledText,
    StyledInfoTitle,
    ContentBox,
} from "./style";

const SoftwareTechnology = ({ data }) => {
    return (
        <StyledSection>
            <StyledBG>
                <StaticImage
                    src="../../../assets/images/bg/soft-s5-bg.webp"
                    alt="contact BG"
                />
            </StyledBG>
            <Container>
                <Row>
                    <Col lg={6} mb={["50px", null, null, 0]}>
                        <ContentBox>
                            {data?.headings?.[1] && (
                                <StyledInfoTitle as={data.headings[1]?.level}>
                                    {data.headings[1].content}
                                </StyledInfoTitle>
                            )}
                            {data?.headings?.[0] && (
                                <StyledHeading
                                    as={data.headings[0].level}
                                    dangerouslySetInnerHTML={{
                                        __html: data.headings[0].content,
                                    }}
                                />
                            )}
                            {data?.texts?.[0] && (
                                <StyledText
                                    dangerouslySetInnerHTML={{
                                        __html: data.texts[0].content,
                                    }}
                                />
                            )}

                            <StyledButtonWrap>
                                {data?.buttons?.map((button) => (
                                    <Button
                                        key={button.id}
                                        variant="outlined"
                                        color="light"
                                        path={button.path}
                                    >
                                        {button?.content}
                                    </Button>
                                ))}
                            </StyledButtonWrap>
                        </ContentBox>
                    </Col>
                    <Col lg={6}>
                        {data?.images?.[0].src && (
                            <Image
                                src={data.images[0].src}
                                alt={data.images[0]?.alt || "Hero"}
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        </StyledSection>
    );
};

SoftwareTechnology.propTypes = {
    data: PropTypes.shape({
        headings: PropTypes.arrayOf(PropTypes.shape(HeadingType)),
        texts: PropTypes.arrayOf(PropTypes.shape(TextType)),
        buttons: PropTypes.arrayOf(PropTypes.shape(ButtonType)),
        items: PropTypes.arrayOf(PropTypes.shape(ItemType)),
        images: PropTypes.arrayOf(PropTypes.shape(ImageType)),
    }),
};

export default SoftwareTechnology;
