import styled, { device } from "@styled";
import BackgroundImage from "gatsby-background-image";

export const BannerArea = styled(BackgroundImage)`
    padding-block-start: 60px;
    padding-block-end: 60px;
    ${device.medium} {
        padding-block-start: 100px;
        padding-block-end: 100px;
    }
    ${device.large} {
        padding-block-start: 120px;
        padding-block-end: 120px;
    }
    ${device.xlarge} {
        padding-block-start: 85px;
        padding-block-end: 195px;
    }
`;

export const StyledBannerTextWrap = styled.div`
    text-align: center;
    max-width: 900px;
    margin-inline: auto;
`;

export const StyledTagline = styled.h1`
    color: #fff;
    margin-top: 20px;
    margin-bottom: 15px;
`;
