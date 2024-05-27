import styled, { space, flexbox, device } from "@styled";

export const LogoMiniWrapper = styled.div`
    display: flex;
    ${flexbox};
    ${space};
    ${device.xsmall} {
        a {
            img {
                width: 50px;
                padding-top: 0px;
            }
        }
    }
    ${device.small} {
        a {
            img {
                width: 50px;
                padding-top: 0px;
            }
        }
    }
`;
