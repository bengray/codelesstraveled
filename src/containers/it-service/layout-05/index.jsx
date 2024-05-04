import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "@ui/wrapper";
import SectionTitle from "@ui/section-title";
import Button from "@ui/button";
import BoxIcon from "@components/box-icon/layout-06";
import { SectionTitleType, ButtonType, ItemType } from "@utils/types";
import { ServicesWrapper, SectionRight } from "./style";

const ServiceArea = ({ data, ...rest }) => {
    return (
        <ServicesWrapper {...rest}>
            <Container>
                <Row>
                    <Col lg={8} md={7} sm={12}>
                        {data?.section_title && (
                            <SectionTitle
                                textAlign="left"
                                mb={["30px", null, "40px"]}
                                subtitle={data.section_title?.subtitle}
                                title={data.section_title?.title}
                            />
                        )}
                    </Col>
                    <Col lg={4} md={5} sm={12}>
                        {data?.buttons && (
                            <SectionRight>
                                {data.buttons?.map(
                                    ({ id, content, ...restProps }) => (
                                        <Button
                                            key={id}
                                            m="10px"
                                            {...restProps}
                                        >
                                            {content}
                                        </Button>
                                    )
                                )}
                            </SectionRight>
                        )}
                    </Col>
                </Row>
                {data?.items && (
                    <Row>
                        {data.items?.map((feature) => {
                            return (
                                <Col lg={3} md={6} key={feature.id}>
                                    <BoxIcon
                                        id={feature.id}
                                        title={feature.title}
                                        icon={feature.icon.images[0]}
                                        path={`/it-service/${feature.slug}`}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </Container>
        </ServicesWrapper>
    );
};

ServiceArea.propTypes = {
    data: PropTypes.shape({
        section_title: PropTypes.shape(SectionTitleType),
        buttons: PropTypes.arrayOf(PropTypes.shape(ButtonType)),
        items: PropTypes.arrayOf(PropTypes.shape(ItemType)),
    }),
};

export default ServiceArea;
