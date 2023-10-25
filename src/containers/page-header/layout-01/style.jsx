import styled, { device } from "@styled";
import BackgroundImage from "gatsby-background-image";

export const PageHeaderWrap = styled(BackgroundImage)`
    padding-block-start: 60px;
    padding-block-end: 60px;
    ${device.medium} {
        padding-block-start: 100px;
        padding-block-end: 100px;
    }
    ${device.large} {
        padding-block-start: 192px;
        padding-block-end: 165px;
    }
`;

export const StyledTitle = styled.h1`
    color: #fff;
    margin-block-end: 15px;
`;

export const StyledDesc = styled.h5`
    color: #fff;
    font-weight: 400;
`;
