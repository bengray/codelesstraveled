import styled, { device, color } from "@styled";

export const ServicesWrapper = styled.section`
    padding-block-start: 60px;
    padding-block-end: 50px;
    ${device.medium} {
        padding-block-start: 80px;
        padding-block-end: 70px;
    }
    ${device.large} {
        padding-block-start: 100px;
        padding-block-end: 90px;
    }
    ${color}
`;

export const SectionRight = styled.div`
    display: flex;
    align-items: enter;
    justify-content: flex-start;
    flex-direction: column;
    ${device.medium} {
        flex-direction: row;
        justify-content: flex-end;
    }
`;
