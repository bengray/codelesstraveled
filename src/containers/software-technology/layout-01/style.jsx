import styled, { themeGet, device } from "@styled";

export const StyledSection = styled.section`
    position: relative;
    padding-block-start: 56px;
    padding-block-end: 56px;
    background-color: #002fa6;
    overflow: hidden;
    ${device.medium} {
        padding-block-start: 70px;
        padding-block-end: 15px;
    }
    ${device.large} {
        padding-block-start: 100px;
        padding-block-end: 0px;
    }
`;
export const StyledBG = styled.div`
    position: absolute;
    inset: 0;
    left: 0 !important;
    right: auto !important;
    z-index: 0;
    ${device.small} {
        inset: 0 0 0 auto;
    }
    & > div {
        width: 100%;
        height: 100%;
        ${device.small} {
            width: auto;
            height: auto;
        }
    }
`;
export const StyledButtonWrap = styled.div`
    margin-block-start: 40px;
    ${device.medium} {
        margin-block-start: 30px;
    }
    .mt-btn {
        margin-right: 15px;
        margin-top: 15px;
        color: ${themeGet("colors.white")};
        &:hover {
            background-color: ${themeGet("colors.secondary")};
            border-color: ${themeGet("colors.secondary")};
        }
    }
`;

export const ContentBox = styled.div`
    padding-block-start: 30px;
    padding-block-end: 30px;
    z-index: 1;
    position: relative;
`;

export const StyledHeading = styled.h3`
    font-weight: 600;
    color: #fff;
    position: relative;
    line-height: 1.4;
    margin-block-start: 15px;
    span {
        color: ${themeGet("colors.secondary")};
    }
`;

export const StyledText = styled.p`
    margin-block-start: 10px;
    font-size: 18px;
    color: #fff;
    max-width: 470px;
`;
export const StyledInfoTitle = styled.h6`
    font-size: 15px;
    color: #fff;
    text-transform: uppercase;
    margin-block: 10px;
`;
