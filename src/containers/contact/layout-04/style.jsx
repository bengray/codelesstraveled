import styled, { themeGet, device } from "@styled";
import BackgroundImage from "gatsby-background-image";

export const SectionWrap = styled(BackgroundImage)`
    padding-block: 60px;
    background-color: rgb(0, 47, 166);
    background-position: left bottom !important;
    background-size: auto !important;
    ${device.medium} {
        padding-block: 80px;
    }
    ${device.large} {
        padding-block: 100px;
    }
`;

export const ContactInfoBox = styled.div`
    margin-block-end: 45px;
    ${device.large} {
        margin-block-end: 0;
    }
`;

export const ContactFormBox = styled.div`
    background: #fff;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1);
    border-radius: ${themeGet("radii.md")};
    text-align: center;
    padding-inline: 20px;
    padding-block-start: 32px;
    padding-block-end: 40px;

    ${device.medium} {
        padding-inline: 50px;
        padding-block-start: 42px;
        padding-block-end: 50px;
    }
`;

export const ContactFormTitle = styled.div`
    margin-block-end: 40px;
`;
