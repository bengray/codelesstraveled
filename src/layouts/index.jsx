import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@styled";
import { theme } from "@styled/theme";
import "@assets/fonts/font-awesome/font-awesome.css";
import "@assets/css/fonts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "@assets/css/main-style";
import ScrollToTop from "@ui/scroll-to-top";
import Transition from "@components/transition";
import ComingSoon from "./coming-soon";

const Layout = ({ children, location }) => {
    return (
        <ThemeProvider theme={theme}>
            <Transition location={location}>
                <div className="wrapper">
                    <GlobalStyle />
                    {children}
                    {/* <ComingSoon /> */}
                    <ScrollToTop />
                </div>
            </Transition>
        </ThemeProvider>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.shape({}),
};

export default Layout;
