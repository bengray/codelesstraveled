import styled, { device } from "@styled";
import BackgroundImage from "gatsby-background-image";

export const SectionWrap = styled(BackgroundImage)`
    padding-block: 100px;
    ${device.large} {
        padding-block: 150px;
    }
`;

export const StyledTitle = styled.h2`
    font-weight: 600;
    color: rgb(255, 255, 255);
    line-height: 1.34;
    margin-block-end: 65px;
`;
