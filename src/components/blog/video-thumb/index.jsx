import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import cn from "clsx";
import Image from "@ui/image";
import { ImageType } from "@utils/types";
import { useMount } from "@hooks";
import { VideoThumbWrapper } from "./style";
const ModalVideo = React.lazy(() => import("../../ui/modal-video"));

const VideoThumb = ({ poster, title, video_link, className, shape, size }) => {
    const isSSR = typeof window === "undefined";
    const [videoOpen, setVideoOpen] = useState(false);
    const mounted = useMount();
    if (!mounted) return null;

    return (
        <Fragment>
            <VideoThumbWrapper
                onClick={() => setVideoOpen(true)}
                className={cn(className, "video-thumb")}
                $shape={shape}
                $size={size}
            >
                {poster?.src && (
                    <div className="video-poster">
                        <Image src={poster.src} alt={title} />
                    </div>
                )}
                <div className="video-overlay">
                    <div className="video-button">
                        <div className="video-play">
                            <span className="video-play-icon"></span>
                        </div>
                    </div>
                </div>
            </VideoThumbWrapper>
            {!isSSR && (
                <React.Suspense fallback={<div />}>
                    <ModalVideo
                        video_link={video_link}
                        isOpen={videoOpen}
                        onClose={() => setVideoOpen(false)}
                    />
                </React.Suspense>
            )}
        </Fragment>
    );
};

VideoThumb.propTypes = {
    poster: PropTypes.shape(ImageType),
    title: PropTypes.string,
    video_link: PropTypes.string,
    shape: PropTypes.oneOf(["square", "rounded"]),
    size: PropTypes.oneOf(["small", "large"]),
    className: PropTypes.string,
};

VideoThumb.defaultProps = {
    shape: "square",
    size: "large",
};

export default VideoThumb;
