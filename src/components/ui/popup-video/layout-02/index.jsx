import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import cn from "clsx";
import Image from "@ui/image";
import VideoButton from "@ui/video-button";
import { ImageType, VideoButtonType } from "@utils/types";
import { useMount } from "@hooks";
import { PopupVideoWrap, VideoBtnWrap } from "./style";
const ModalVideo = React.lazy(() => import("../../modal-video"));

const PopupVideo = ({ image, video_button, className }) => {
    const isSSR = typeof window === "undefined";
    const [videoOpen, setVideoOpen] = useState(false);
    const mounted = useMount();
    if (!mounted) return null;

    return (
        <Fragment>
            <PopupVideoWrap className={cn(className, "popup-video")}>
                {image?.src && (
                    <Image
                        src={image.src}
                        alt={image?.alt || "Popup thumbnail"}
                    />
                )}
                <VideoBtnWrap>
                    <VideoButton
                        color="primary"
                        onClick={() => setVideoOpen(true)}
                    />
                </VideoBtnWrap>
            </PopupVideoWrap>
            {!isSSR && (
                <React.Suspense fallback={<div />}>
                    <ModalVideo
                        video_link={video_button?.link}
                        isOpen={videoOpen}
                        onClose={() => setVideoOpen(false)}
                    />
                </React.Suspense>
            )}
        </Fragment>
    );
};

PopupVideo.propTypes = {
    image: PropTypes.shape(ImageType),
    video_button: PropTypes.shape(VideoButtonType),
    className: PropTypes.string,
};

export default PopupVideo;
