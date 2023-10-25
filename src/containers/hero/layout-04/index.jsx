import React from "react";
import PropTypes from "prop-types";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import { Container } from "@ui/wrapper";
import Button from "@ui/button";
import {
    HeadingType,
    ButtonType,
    VideoButtonType,
    ImageType,
    TextType,
} from "@utils/types";
import { HeroWrapper, StyledSubtitle, StyledTitle, StyledDesc } from "./style";

const HeroArea = ({ data }) => {
    const bgImage = convertToBgImage(getImage(data?.images?.[0]?.src));

    return (
        <HeroWrapper {...bgImage}>
            <Container>
                {data?.headings?.[0] && (
                    <StyledSubtitle as={data.headings[0]?.level}>
                        {data.headings[0]?.content}
                    </StyledSubtitle>
                )}
                {data?.headings?.[1] && (
                    <StyledTitle as={data.headings[1]?.level}>
                        {data.headings[1]?.content}
                    </StyledTitle>
                )}
                {data?.buttons?.map(({ id, path, content, ...rest }) => (
                    <Button key={id} path={path} {...rest}>
                        {content}
                    </Button>
                ))}
                {data?.texts?.[0] && (
                    <StyledDesc as={data.texts[0]?.level}>
                        {data.texts[0]?.content}
                    </StyledDesc>
                )}
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
