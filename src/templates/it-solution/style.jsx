import styled, { device } from "@styled";

export const BannerArea = styled.section`
    position: relative;
    isolation: isolate;
    padding-block-start: 60px;
    padding-block-end: 60px;

    ${device.large} {
        padding-block-start: 60px;
        padding-block-end: 60px;
    }
`;

export const StyledBG = styled.div`
    position: absolute;
    inset: 0;
    z-index: -1;
    & > div {
        width: 100%;
        height: 100%;
    }
`;

export const StyledBannerTextWrap = styled.div`
    text-align: center;
    max-width: 1000px;
    margin-inline: auto;
`;

export const StyledTitle = styled.h1`
    color: #fff;
    margin-block-end: 15px;
`;

export const StyledTagline = styled.h5`
    color: #fff;
    font-weight: 400;
`;
