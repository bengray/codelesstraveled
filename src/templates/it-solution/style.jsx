import styled, { device } from "@styled";
import BackgroundImage from "gatsby-background-image";

export const BannerArea = styled(BackgroundImage)`
    padding-block-start: 100px;
    padding-block-end: 104px;

    ${device.large} {
        padding-block-start: 195px;
        padding-block-end: 204px;
    }
`;

export const StyledBannerTextWrap = styled.div`
    text-align: center;
    max-width: 750px;
    margin-inline: auto;
`;

export const StyledTitle = styled.h1`
    color: #fff;
    margin-block-end: 15px;
`;

export const StyledTagline = styled.h5`
    color: #fff;
    font-weight: 400;
`;
