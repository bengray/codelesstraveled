import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { NumberedListWrap } from "./style";
import { NumberedListItem } from "./numbered-list-item";

const NumberedList = ({ children, className }) => {
    return (
        <NumberedListWrap className={cn(className, "numbered-list")}>
            {children}
        </NumberedListWrap>
    );
};

NumberedList.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export { NumberedListItem };

export default NumberedList;
