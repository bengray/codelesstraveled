import React from "react";
import PropTypes from "prop-types";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import { Container, Row, Col } from "@ui/wrapper";
import { PageHeaderWrap, StyledTitle, StyledDesc } from "./style";
import { HeadingType, TextType, ImageType } from "@utils/types";

const PageHeader = ({ data }) => {
    const bgImage = convertToBgImage(getImage(data?.images?.[0]?.src));
    return (
        <PageHeaderWrap {...bgImage}>
            <Container>
                <Row textAlign="center">
                    <Col lg={8} mx="auto">
                        {data?.headings?.[0] && (
                            <StyledTitle as={data.headings[0]?.level}>
                                {data.headings[0]?.content}
                            </StyledTitle>
                        )}
                        {data?.texts?.[0] && (
                            <StyledDesc>{data.texts[0]?.content}</StyledDesc>
                        )}
                    </Col>
                </Row>
            </Container>
        </PageHeaderWrap>
    );
};

PageHeader.propTypes = {
    data: PropTypes.shape({
        headings: PropTypes.arrayOf(PropTypes.shape(HeadingType)),
        texts: PropTypes.arrayOf(PropTypes.shape(TextType)),
        images: PropTypes.arrayOf(PropTypes.shape(ImageType)),
    }),
};

export default PageHeader;
