import React from "react";
import PropTypes from "prop-types";
// import NavBar, {
//     NavItem,
//     NavLink,
//     Submenu,
//     Megamenu,
//     ExpandButton,
// } from "@ui/navbar";
// import Heading from "@ui/heading";
import { getClosest, getSiblings } from "@utils";
import {
    StyledMobileMenu,
    StyledNavbar,
    StyledNavitem,
    StyledNavlink,
    StyledButton,
    StyledSubmenu,
} from "./style";

const MobileMenu = ({ menuData }) => {
    const removeClassFromChildren = (parent) => {
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i].tagName === "UL") {
                let child = parent.children[i].children;
                for (let j = 0; j < child.length; j++) {
                    child[j].classList.remove("submenu-open");
                }
            }
        }
    };

    const onClickHandler = (e, selector) => {

        const target = e.target;
        const parentEl = target.parentElement;
        if (
            parentEl.classList.contains("menu-expand") ||
            target.classList.contains("menu-expand")
        ) {
            let element = target.classList.contains("icon") ? parentEl : target;
            const parent = getClosest(element, selector);
            const parentSiblings = getSiblings(parent);
            parentSiblings.forEach((sibling) => {
                sibling.classList.remove("submenu-open");
                removeClassFromChildren(sibling);
            });
            removeClassFromChildren(parent);
            parent.classList.toggle("submenu-open");
        }
    };

    return (
        <StyledMobileMenu>
            <StyledNavbar>
                {menuData.map((menu, i) => {
                    const submenu = menu?.submenu;
                    const menuIndex = i;
                    return (
                        <StyledNavitem
                            key={`mainmenu-${menu.id}`}
                            hasSubmenu={submenu}
                            className="menu-item"
                            id={`menu-item-${menuIndex}`}
                        >
                            <StyledNavlink path={menu.link}>
                                {menu.text}
                            </StyledNavlink>
                            {submenu && (
                                <StyledButton
                                    className="menu-expand"
                                    onClick={(e) =>
                                        onClickHandler(
                                            e,
                                            `#menu-item-${menuIndex}`
                                        )
                                    }
                                >
                                    <i className="icon fa fa-angle-down"></i>
                                </StyledButton>
                            )}

                            {submenu && (
                                <StyledSubmenu className="submenu">
                                    {submenu.map((subitem, j) => {
                                        const submenuIndex = j;
                                        return (
                                            <StyledNavitem
                                                key={`submenu-${menu.id}-${submenuIndex}`}
                                                className="menu-item"
                                                id={`submenu-item-${menuIndex}${submenuIndex}`}
                                                $inSubmenu={true}
                                            >
                                                <StyledNavlink
                                                    path={subitem.link}
                                                    $inSubmenu={true}
                                                >
                                                    {subitem.text}
                                                </StyledNavlink>
                                            </StyledNavitem>
                                        );
                                    })}
                                </StyledSubmenu>
                            )}
                        </StyledNavitem>
                    );
                })}
            </StyledNavbar>
        </StyledMobileMenu>
    );
};

MobileMenu.propTypes = {
    menuData: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MobileMenu;
