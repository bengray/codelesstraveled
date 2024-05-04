import styled, { themeGet, device } from "@styled";
import { animateUpDown } from "@assets/css/animations";
// console.log("animateUpDown", animateUpDown);

export const HeroWrapper = styled.section`
    background-color: #fff;
`;

export const HeroTextBox = styled.div`
    max-width: 605px;
    width: 100%;
    padding-inline-start: 0;
    margin-block-start: 50px;
    margin-block-end: 20px;
    margin-inline: auto;
    text-align: center;

    ${device.medium} {
        padding-inline-start: 30px;
        margin-inline-start: auto;
        margin-inline-end: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        text-align: left;
    }
`;

export const ImageBoxWrap = styled.div`
    position: relative;
    margin-inline: auto;
    max-width: 370px;
    ${device.medium} {
        padding-block-start: 160px;
        max-width: 100%;
        margin-inline: 0;
    }
    ${device.large} {
        margin-block-start: 20px;
        padding-block-start: 0;
    }
`;

export const ImageBoxOne = styled.div`
    position: relative;
    z-index: 1;
    margin-right: 0px;
    margin-left: -230px;

    animation-timing-function: cubic-bezier(0.54, 0.085, 0.5, 0.92);
    animation-name: ${animateUpDown};
    animation-iteration-count: infinite;

    img {
        width: 100%;
    }
`;

export const StyledSubtitle = styled.h6`
    font-weight: 500;
    color: #c2c2c2;
    margin-block-end: 20px;
`;

export const StyledTitle = styled.h1`
    font-weight: 500;
    margin-block-end: 15px;
    color: ${themeGet("colors.primary")};
    line-height: 40px;
    font-weight: 700;
    font-size: 40px;
    span {
        display: block;
        line-height: 60px;
        font-weight: 700;
        font-size: 60px;
        ${device.medium} {
            line-height: 70px;
            font-size: 70px;
        }
        ${device.large} {
            line-height: 130px;
            font-size: 120px;
        }
    }
`;
