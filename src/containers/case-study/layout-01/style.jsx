import styled, { device } from "@styled";
import BackgroundImage from "gatsby-background-image";

export const CaseStudyWrapper = styled(BackgroundImage)`
    padding-block-start: 60px;
    padding-block-end: 60px;
    padding-inline: 15px;
    background-position: bottom left;
    background-size: auto;
    ${device.medium} {
        padding-block-start: 80px;
        padding-block-end: 80px;
    }
    ${device.large} {
        padding-block-start: 100px;
        padding-block-end: 100px;
    }
`;
