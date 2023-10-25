import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import { Container, Row, Col } from "@ui/wrapper";
import Heading from "@ui/heading";
import Text from "@ui/text";
import Ratings from "@components/ratings";
import BoxIcon from "@components/box-icon/layout-04";
import Anchor from "@ui/anchor";
import ContactFrom from "@components/forms/contact-form";
import { HeadingType, TextType } from "@utils/types";
import {
    SectionWrap,
    ContactInfoBox,
    ContactFormBox,
    ContactFormTitle,
} from "./style";

const ContactArea = ({ data }) => {
    const contactData = useStaticQuery(graphql`
        query ContactFourQuery {
            file(relativePath: { eq: "bg/contact-section-bg-3.png" }) {
                childImageSharp {
                    gatsbyImageData(
                        layout: CONSTRAINED
                        width: 626
                        height: 982
                        placeholder: TRACED_SVG
                        formats: WEBP
                        quality: 100
                    )
                }
            }
        }
    `);
    const bgImage = convertToBgImage(getImage(contactData.file));

    return (
        <SectionWrap {...bgImage}>
            <Container>
                <Row alignItems="center">
                    <Col lg={4}>
                        <ContactInfoBox>
                            {data?.headings?.[0] && (
                                <Heading
                                    as={data.headings[0]?.level}
                                    color="#fff"
                                >
                                    {data.headings[0]?.content}
                                </Heading>
                            )}
                            <Ratings my="10px" rating={5} />
                            {data?.texts?.[0] && (
                                <Text fontSize="18px" color="#fff">
                                    {data.texts[0].content}
                                </Text>
                            )}

                            {data?.contact && (
                                <>
                                    {data.contact?.phone && (
                                        <Anchor
                                            display="block"
                                            path={`tel:${data.contact.phone}`}
                                        >
                                            <BoxIcon
                                                alignItems="center"
                                                mt="55px"
                                                layout={2}
                                                icon="fas fa-phone"
                                                heading="Call for advice now!"
                                                title={data.contact.phone}
                                            />
                                        </Anchor>
                                    )}
                                    {data.contact?.email && (
                                        <Anchor
                                            display="block"
                                            path={`mailto:${data.contact.email}`}
                                        >
                                            <BoxIcon
                                                alignItems="center"
                                                mt="55px"
                                                layout={2}
                                                icon="far fa-envelope"
                                                heading="Say hello"
                                                title={data.contact.email}
                                            />
                                        </Anchor>
                                    )}
                                </>
                            )}
                        </ContactInfoBox>
                    </Col>
                    <Col lg={7} ml="auto">
                        <ContactFormBox>
                            <ContactFormTitle>
                                <Heading as="h3" mb="10px">
                                    Need a hand?
                                </Heading>
                                <Text>
                                    Reach out to the world’s most reliable IT
                                    services.
                                </Text>
                            </ContactFormTitle>
                            <ContactFrom />
                        </ContactFormBox>
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
        contact: PropTypes.shape({
            phone: PropTypes.string,
            email: PropTypes.string,
        }),
    }),
};

export default ContactArea;
