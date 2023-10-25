import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {
    ItemWrap,
    ItemAnchor,
    Marker,
    TitleWrap,
    TitleInner,
    Title,
    IconWrap,
} from "./style";

export const NumberedListItem = ({ path, number, children, className }) => {
    let numb = number < 10 ? `0${number}` : number;
    return (
        <ItemWrap className={cn(className, "numbered-list-item")}>
            <ItemAnchor path={path}>
                {number && <Marker>{numb}</Marker>}
                <TitleWrap>
                    <TitleInner>
                        <Title>{children}</Title>
                        <IconWrap>
                            <i className="icon icon-1 fa fa-arrow-right"></i>
                            <i className="icon icon-2 fa fa-arrow-right"></i>
                        </IconWrap>
                    </TitleInner>
                </TitleWrap>
            </ItemAnchor>
        </ItemWrap>
    );
};

NumberedListItem.propTypes = {
    path: PropTypes.string,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
};

NumberedListItem.defautProps = {
    path: "/",
};
