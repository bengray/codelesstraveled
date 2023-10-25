import styled, { device } from "@styled";
import BackgroundImage from "gatsby-background-image";

export const SectionWrap = styled(BackgroundImage)`
    background-color: #eff2f6;
    padding-block-start: 67px;
    padding-block-end: 75px;
    ${device.large} {
        padding-block-start: 100px;
        padding-block-end: 0;
    }
`;
