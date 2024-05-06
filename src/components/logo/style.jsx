import styled, { css, space, flexbox, device } from "@styled";

export const LogoWrapper = styled.div`
    display: flex;
    ${flexbox};
    ${space};
    ${device.xsmall} {
        a {
            img {
                width: 200px;
                padding-top: 0px;
            }
        }
    }
    ${device.small} {
        a {
            img {
                width: 200px;
                padding-top: 0px;
            }
        }
    }
    ${device.xlarge} {
        a {
            img {
                width: 300px;
                padding-top: 12px;
            }
        }
    }
    ${device.xxlarge} {
        a {
            img {
                width: 300px;
                padding-top: 12px;
            }
        }
    }
    ${device.xxxlarge} {
        a {
            img {
                width: 300px;
                padding-top: 12px;
            }
        }
    }


    ${({ $variant }) =>
        $variant === "white" &&
        css`
            .dark-logo {
                display: none !important;
            }
            .light-logo {
                display: inherit;
            }
        `}
    ${({ $variant }) =>
        $variant === "dark" &&
        css`
            .dark-logo {
                display: inherit;
            }
            .light-logo {
                display: none !important;
            }
        `}
`;
