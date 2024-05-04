import React, { useState } from "react";
import PropTypes from "prop-types";
import AnotherLightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Container, Row, Col } from "@ui/wrapper";
import Button from "@ui/button";
import Image from "@ui/image";
import SectionTitle from "@ui/section-title";
import { SectionTitleType, ImageType, ButtonType } from "@utils/types";

import {
    SectionWrap,
    GalleryWrap,
    GalleryGrid,
    GalleryItem,
    GalleryOverlay,
    GalleryOverlayIcon,
    StyledTitleWrap,
} from "./style";

const GalleryArea = ({ data }) => {
    const [index, setIndex] = useState(-1);

    const slides = data.images.map((img, i) => ({
        src: img.src.childImageSharp.gatsbyImageData.images.fallback.src,
        width: img.src.childImageSharp.gatsbyImageData.width,
        height: img.src.childImageSharp.gatsbyImageData.height,
        key: i,
    }));

    return (
        <SectionWrap>
            <Container>
                <StyledTitleWrap>
                    {data?.section_title && (
                        <SectionTitle mb="15px" {...data.section_title} />
                    )}
                    {data?.buttons?.map(({ id, content, ...rest }) => (
                        <Button key={id} {...rest}>
                            {content}
                        </Button>
                    ))}
                </StyledTitleWrap>
                <Row>
                    <Col lg={12}>
                        <GalleryWrap>
                            {data?.images?.map((image, i) => (
                                <GalleryGrid key={image?.src.name}>
                                    <GalleryItem>
                                        <Image
                                            src={image.src}
                                            alt={image?.alt || "gallery"}
                                        />
                                        <GalleryOverlay />
                                        <GalleryOverlayIcon
                                            onClick={() => setIndex(i)}
                                        >
                                            <i className="icon far fa-search"></i>
                                        </GalleryOverlayIcon>
                                    </GalleryItem>
                                </GalleryGrid>
                            ))}
                            <AnotherLightbox
                                open={index >= 0}
                                index={index}
                                close={() => setIndex(-1)}
                                slides={slides}
                            />
                        </GalleryWrap>
                    </Col>
                </Row>
            </Container>
        </SectionWrap>
    );
};

GalleryArea.propTypes = {
    data: PropTypes.shape({
        section_title: PropTypes.shape(SectionTitleType),
        images: PropTypes.arrayOf(PropTypes.shape(ImageType)),
        buttons: PropTypes.arrayOf(PropTypes.shape(ButtonType)),
    }),
};

export default GalleryArea;
