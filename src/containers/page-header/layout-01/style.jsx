import styled, { device } from "@styled";

export const PageHeaderWrap = styled.div`
    position: relative;
    isolation: isolate;
    padding-block-start: 20px;
    padding-block-end: 20px;
    ${device.medium} {
        padding-block-start: 75px;
        padding-block-end: 75px;
    }
    ${device.large} {
        padding-block-start: 75px;
        padding-block-end: 75px;
    }
`;

export const StyledBG = styled.div`
    position: absolute;
    inset: 0;
    z-index: -1;
    & > div {
        height: 100%;
        width: 100%;
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

export const StyledHeaderDiv = styled.div`
    background-image: radial-gradient(ellipse, black, transparent 90%);
`;
