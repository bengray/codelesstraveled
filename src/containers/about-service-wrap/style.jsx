import styled, { device } from "@styled";
import BackgroundImage from "gatsby-background-image";

export const AboutServiceWrapStyle = styled.div`
    padding-block: 60px;
    background: rgb(255, 255, 255); /* Old browsers */
    background: -moz-linear-gradient(
        top,
        rgba(255, 255, 255, 1) 0%,
        rgba(245, 245, 245, 1) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
        top,
        rgba(255, 255, 255, 1) 0%,
        rgba(245, 245, 245, 1) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1) 0%,
        rgba(245, 245, 245, 1) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f5f5f5',GradientType=0 ); /* IE6-9 */
    position: relative;

    ${device.medium} {
        padding-block: 80px;
    }
    ${device.large} {
        padding-block: 100px;
    }
`;

export const AboutServiceInner = styled(BackgroundImage)`
    position: absolute !important;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-position: top 140px left !important;
    background-size: auto !important;
`;
