import React from "react";
import PropTypes from "prop-types";
import ClientLogo from "@ui/client-logo";
import { Container } from "@ui/wrapper";
import SwiperSlider, { SwiperSlide } from "@ui/swiper";
import { ItemType } from "@utils/types";
import { SectionWrap } from "./style";

const slider = {
    slidesPerView: 6,
    loop: true,
    speed: 1000,
    breakpoints: {
        320: {
            slidesPerView: 2,
        },
        575: {
            slidesPerView: 3,
        },
        767: {
            slidesPerView: 4,
        },
        991: {
            slidesPerView: 5,
        },
        1499: {
            slidesPerView: 6,
        },
    },
};

const PartnerArea = ({ data }) => {
    return (
        <SectionWrap>
            <Container>
                {data?.items && (
                    <SwiperSlider options={slider} vAlign="center">
                        {data.items?.map((item) => {
                            return (
                                <SwiperSlide key={item.id}>
                                    <ClientLogo
                                        layout={1}
                                        title={item.id}
                                        path={item.path}
                                        image={item.images?.[0]}
                                        hoverImage={item.images?.[1]}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </SwiperSlider>
                )}
            </Container>
        </SectionWrap>
    );
};

PartnerArea.propTypes = {
    data: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape(ItemType)),
    }),
};

export default PartnerArea;
