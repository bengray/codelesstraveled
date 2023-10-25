import styled, { themeGet, device } from "@styled";
import BackgroundImage from "gatsby-background-image";

export const StyledSection = styled(BackgroundImage)`
    background-color: #454545;
    background-position: top 35% right -68px;
    background-size: auto;
    padding-block-end: 40px;
    padding-block-start: 40px;
    &:before,
    &:after {
        background-position: top 35% right -68px;
        background-size: auto;
    }
    ${device.medium} {
        padding-block-end: 60px;
        padding-block-start: 60px;
    }
    ${device.large} {
        padding-block-start: 80px;
        padding-block-end: 80px;
    }
`;

export const StyledHeading = styled.h3`
    margin-block-end: 10px;
    color: #fff;
    span {
        color: ${themeGet("colors.secondary")};
    }
    ${device.large} {
        margin-block-end: 0;
    }
`;

export const StyledBG = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
`;
