import React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";
import cn from "clsx";
import { Container, Row, Col } from "@ui/wrapper";
import Text from "@ui/text";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import Heading from "@ui/heading";
import Social, { SocialLink } from "@ui/social";
import { SocialType } from "@utils/types";
import {
  FooterWrap,
  FooterTop,
  FooterWidget,
  LogoWidget,
  TextWidget,
  FooterWidgetList,
  FooterBottom,
  StyledWidgetTitle,
} from "./style";

const Footer = ({ data }) => {
  return (
    <FooterWrap>
      <FooterTop>
        <Container>
          <Row>
            <Col lg={4} sm={6}>
              <FooterWidget mb={["31px", null, null, 0]}>
                <LogoWidget>
                  {/* <StaticImage
                                        src="../../../assets/images/logo/clt-logo-v3.png"
                                        alt="logo"
                                        height={18}
                                    /> */}
                  <StyledWidgetTitle>Code Less Traveled</StyledWidgetTitle>
                </LogoWidget>
                {data?.contact && (
                  <TextWidget>
                    {data.contact?.address && (
                      <Text mb="10px">{data.contact.address}</Text>
                    )}
                    {/* {data.contact?.email && (
                                            <Text mb="10px">
                                                <Anchor
                                                    path={`mailto:hello@codelesstraveled.com`}
                                                    color="text"
                                                    $hover={{ layout: 2 }}
                                                >
                                                    hello@codelesstraveled.com
                                                </Anchor>
                                            </Text>
                                        )} */}
                    {/* {data.contact?.phone && (
                                            <Text mb="10px">
                                                <Anchor
                                                    path={`tel:${data.contact.phone}`}
                                                    color="heading"
                                                    $hover={{ layout: 2 }}
                                                >
                                                    {data.contact.phone}
                                                </Anchor>
                                            </Text>
                                        )} */}
                    {data.contact?.website && (
                      <Text mb="10px">
                        <Anchor
                          path={data.contact.website}
                          $hover={{ layout: 2 }}
                        >
                          {data.contact.website}
                        </Anchor>
                      </Text>
                    )}
                  </TextWidget>
                )}
              </FooterWidget>
            </Col>
            <Col lg={3} md={5} sm={6}>
              <FooterWidget mb={["31px", null, null, 0]}>
                <Heading as="h6" mt="-3px" mb="20px">
                  IT Solutions
                </Heading>
                <FooterWidgetList>
                  <li>
                    <Anchor
                      path="/it-solution/custom-website-development/"
                      color="text"
                      $hover={{ layout: 2 }}
                    >
                      Website Development
                    </Anchor>
                  </li>
                  <li>
                    <Anchor
                      path="/it-solution/graphic-design/"
                      color="text"
                      $hover={{ layout: 2 }}
                    >
                      Graphic Design
                    </Anchor>
                  </li>
                  <li>
                    <Anchor
                      path="/it-solution/website-problem-resolution/"
                      color="text"
                      $hover={{ layout: 2 }}
                    >
                      Website Problem Resolution
                    </Anchor>
                  </li>
                  <li>
                    <Anchor
                      path="/it-solution/web-application-development/"
                      color="text"
                      $hover={{ layout: 2 }}
                    >
                      Web Application Development
                    </Anchor>
                  </li>
                  <li>
                    <Anchor
                      path="/it-solution/logo-creation/"
                      color="text"
                      $hover={{ layout: 2 }}
                    >
                      Logo Creation
                    </Anchor>
                  </li>
                  <li>
                    <Anchor
                      path="/it-solution/website-optimization/"
                      color="text"
                      $hover={{ layout: 2 }}
                    >
                      Website Optimization
                    </Anchor>
                  </li>
                </FooterWidgetList>
              </FooterWidget>
            </Col>
            <Col lg={3} md={5} sm={6}>
              <FooterWidget mb={["27px", null, 0]}>
                <Heading as="h6" mt="-3px" mb="20px">
                  Quick links
                </Heading>
                <FooterWidgetList>
                  <li>
                    <a
                      href="/privacy-policy.html"
                      target="_blank"
                      color="text"
                      $hover={{ layout: 2 }}
                    >
                      Privacy Policy
                    </a>
                  </li>
                </FooterWidgetList>
              </FooterWidget>
            </Col>
            <Col lg={2} md={4} sm={6}>
              <FooterWidget>
                <Heading as="h6" mt="-3px" mb="20px">
                  Support
                </Heading>
                <FooterWidgetList>
                  <li>
                    <Anchor path="/faq" color="text" $hover={{ layout: 2 }}>
                      Help &amp; FAQ
                    </Anchor>
                  </li>
                  <li>
                    <Anchor
                      path="/contact-us"
                      color="text"
                      $hover={{ layout: 2 }}
                    >
                      Contact Us
                    </Anchor>
                  </li>
                  <li>
                    <Anchor path="/" color="text" $hover={{ layout: 2 }}>
                      Cookies Policy
                    </Anchor>
                  </li>
                </FooterWidgetList>
              </FooterWidget>
            </Col>
          </Row>
        </Container>
      </FooterTop>
      <FooterBottom>
        <Container>
          <Row alignItems="center">
            <Col md={6} textAlign={["center", null, "left"]}>
              {data?.copyright && (
                <Text pb={["15px", 0]}>
                  &copy; 2023 - {new Date().getFullYear()}{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: data.copyright,
                    }}
                  />
                </Text>
              )}
            </Col>
            <Col md={6} textAlign={["center", null, "right"]}>
              {data?.socials && (
                <Social
                  space="16px"
                  tooltip={true}
                  shape="rounded"
                  variant="outlined"
                >
                  {data.socials.map((social) => (
                    <SocialLink
                      key={social.id}
                      path={social.link}
                      title={social.title}
                      ariaLabel={social.ariaLabel}
                    >
                      {<i className={cn(social.icon, "link-icon")}></i>}
                    </SocialLink>
                  ))}
                </Social>
              )}
            </Col>
          </Row>
        </Container>
      </FooterBottom>
    </FooterWrap>
  );
};

Footer.propTypes = {
  data: PropTypes.shape({
    // socials: PropTypes.arrayOf(PropTypes.shape(SocialType)),
    copyright: PropTypes.string,
    contact: PropTypes.shape({
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      website: PropTypes.string,
    }),
  }),
};

export default Footer;
