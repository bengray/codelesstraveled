import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { LogoMiniWrapper } from "./style";

const LogoMini = ({ className, variant, ...restProps }) => {
    return (
        <LogoMiniWrapper className={className} $variant={variant} {...restProps}>
            <Link to="/">
                <StaticImage
                    src="../../assets/images/logo/clt-small-logo.png"
                    className="img-fluid static-img dark-logo"
                    alt="mini logo"
                />
            </Link>
        </LogoMiniWrapper>
    );
};

LogoMini.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(["white", "dark"]),
};

LogoMini.defaultProps = {
    justifyContent: "flex-start",
    variant: "dark",
};

export default LogoMini;
