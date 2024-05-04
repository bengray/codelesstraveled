import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "clsx";
import { useMount } from "@hooks";
import {
    VideoButtonWrap,
    VideoButtonInner,
    VideoMark,
    VideoPlay,
    VideoPlayIcon,
    VideoText,
} from "./style";
const ModalVideo = React.lazy(() => import("../modal-video"));

const VideoButton = ({
    content,
    link,
    className,
    color,
    size,
    variant,
    textStyle,
    icon,
    border,
    ...restProps
}) => {
    const isSSR = typeof window === "undefined";
    const [videoOpen, setVideoOpen] = useState(false);
    const mounted = useMount();
    if (!mounted) return null;

    return (
        <>
            <VideoButtonWrap
                onClick={() => setVideoOpen(true)}
                className={cn(className, "video-btn")}
                $color={color}
                $size={size}
                $variant={variant}
                $textStyle={textStyle}
                $icon={icon}
                $border={border}
                {...restProps}
            >
                <VideoButtonInner>
                    <VideoPlay>
                        <VideoPlayIcon></VideoPlayIcon>
                    </VideoPlay>
                </VideoButtonInner>
                {content && (
                    <VideoText dangerouslySetInnerHTML={{ __html: content }} />
                )}
            </VideoButtonWrap>
            {!isSSR && (
                <React.Suspense fallback={<div />}>
                    <ModalVideo
                        video_link={link}
                        isOpen={videoOpen}
                        onClose={() => setVideoOpen(false)}
                    />
                </React.Suspense>
            )}
        </>
    );
};

VideoButton.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
        "gradient",
        "transparent",
    ]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    variant: PropTypes.oneOf(["outlined", "contained", "texted"]),
    textStyle: PropTypes.oneOf([1, 2]),
    icon: PropTypes.shape({}),
    content: PropTypes.string,
    className: PropTypes.string,
    link: PropTypes.string,
    border: PropTypes.string,
};

VideoButton.defaultProps = {
    color: "light",
};

export default VideoButton;
