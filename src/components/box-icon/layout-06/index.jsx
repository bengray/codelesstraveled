import React from "react";
import PropTypes from "prop-types";
import Image from "@ui/image";
import { ImageType } from "@utils/types";
import Button from "@ui/button";
import {
    BoxIconWrap,
    BoxIconInner,
    BoxIconTop,
    IconWrap,
    Heading,
    BoxIconBottom,
    BoxIconBtn,
    Text,
} from "./style";

const BoxIcon = ({ icon, title, desc, path, className }) => {
    return (
        <BoxIconWrap className={className}>
            <BoxIconInner>
                <BoxIconTop>
                    {icon?.src && (
                        <IconWrap>
                            <Image src={icon.src} alt={icon?.alt || title} />
                        </IconWrap>
                    )}
                    {title && <Heading>{title}</Heading>}
                </BoxIconTop>
                {desc && (
                    <BoxIconBottom>
                        <Text>{desc}</Text>
                    </BoxIconBottom>
                )}
                {path && (
                    <BoxIconBtn>
                        <Button
                            path={path}
                            variant="texted"
                            icondistance="8px"
                            fontWeight={400}
                            icon="fas fa-arrow-right"
                        >
                            Discover now
                        </Button>
                    </BoxIconBtn>
                )}
            </BoxIconInner>
        </BoxIconWrap>
    );
};

BoxIcon.defaultProps = {
    title: "",
    desc: "",
};

BoxIcon.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    path: PropTypes.string,
    icon: PropTypes.shape(ImageType),
    className: PropTypes.string,
};
BoxIcon.defaultProps = {
    path: "/",
};
export default BoxIcon;
