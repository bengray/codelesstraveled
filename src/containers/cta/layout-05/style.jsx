import styled, { device, themeGet } from "@styled";
import BackgroundImage from "gatsby-background-image";

export const ResourcesWrapper = styled(BackgroundImage)`
    padding-block-start: 40px;
    padding-block-end: 40px;
    background-color: ${themeGet("colors.gray.100")};
    background-size: auto;
    background-position: center right 40px;
`;

export const LeftBox = styled.div`
    max-width: 600px;
    margin-inline-start: auto;
    margin-inline-end: auto;
    text-align: center;
    ${device.medium} {
        padding-inline-start: 30px;
        padding-inline-end: 30px;
    }
    ${device.large} {
        padding-inline-start: 30px;
        padding-inline-end: 30px;
        text-align: left;
    }
`;
