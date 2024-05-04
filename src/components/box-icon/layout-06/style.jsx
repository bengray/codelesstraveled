import styled, { device, themeGet } from "@styled";

export const BoxIconInner = styled.div`
    box-shadow: 0 18px 40px rgba(51, 51, 51, 0.1);
    background: #ffffff;
    border-radius: 5px;
    transition: all 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
    border-radius: ${themeGet("radii.md")};
    transition: all 0.3s ease-in-out;
    ${device.large} {
        padding: 50px 30px 63px;
    }
`;

export const BoxIconTop = styled.div``;

export const IconWrap = styled.div`
    position: relative;
    margin-bottom: 41px;
    height: 100px;
    flex-shrink: 0;
    font-size: 48px;
    margin-inline-end: 10px;
    color: ${themeGet("colors.secondary")};
    display: inherit;
`;

export const Heading = styled.h5`
    font-weight: 500;
    line-height: 1.25;
    margin-bottom: 12px;
`;

export const BoxIconBottom = styled.div``;

export const Text = styled.p``;

export const BoxIconWrap = styled.div`
    &:hover {
        ${BoxIconInner} {
            transform: translateY(-5px);
            background: #fff;
            box-shadow: ${themeGet("shadows.default")};
        }
    }
`;
export const BoxIconBtn = styled.div`
    margin-block-start: 20px;
`;
