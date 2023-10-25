import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import { Container, Row, Col } from "@ui/wrapper";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { HeadingType, TextType, ButtonType } from "@utils/types";
import {
    SectionWrap,
    ContactInfoBox,
    StyledHeading,
    StyledText,
    StyledInfoTitle,
} from "./style";

const ContactArea = ({ data }) => {
    const contactQueryData = useStaticQuery(graphql`
        query {
            file(relativePath: { eq: "bg/contact-section-bg-2.png" }) {
                childImageSharp {
                    gatsbyImageData(
                        layout: CONSTRAINED
                        width: 1192
                        height: 630
                        placeholder: TRACED_SVG
                        formats: WEBP
                        quality: 100
                    )
                }
            }
        }
    `);
    const imageData = convertToBgImage(getImage(contactQueryData.file));
    return (
        <SectionWrap {...imageData}>
            <Container>
                <Row alignItems="center">
                    <Col lg={6}>
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
                    </Col>
                    <Col lg={6}>
                        <ContactInfoBox>
                            <i className="icon fas fa-phone"></i>
                            {data?.headings?.[1] && (
                                <StyledInfoTitle as={data.headings[1]?.level}>
                                    {data.headings[1].content}
                                </StyledInfoTitle>
                            )}

                            {data?.headings?.[2] && (
                                <h2>
                                    <Anchor
                                        path="/"
                                        color="secondary"
                                        hover={{
                                            layout: 2,
                                            color: "secondary",
                                        }}
                                    >
                                        {data.headings[2].content}
                                    </Anchor>
                                </h2>
                            )}

                            {data?.buttons?.map(
                                ({ id, content, path, ...rest }) => (
                                    <Button
                                        key={id}
                                        path={path}
                                        mt="20px"
                                        minWidth="230px"
                                        {...rest}
                                    >
                                        {content}
                                    </Button>
                                )
                            )}
                        </ContactInfoBox>
                    </Col>
                </Row>
            </Container>
        </SectionWrap>
    );
};

ContactArea.propTypes = {
    data: PropTypes.shape({
        headings: PropTypes.arrayOf(PropTypes.shape(HeadingType)),
        texts: PropTypes.arrayOf(PropTypes.shape(TextType)),
        buttons: PropTypes.arrayOf(PropTypes.shape(ButtonType)),
    }),
};

export default ContactArea;
