import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import CloseButton from "../close-button";

const VideoModal = ({ onClose, video_link, isOpen }) => {
    let video_arr, video_id;
    if (video_link) {
        video_arr = video_link.split("=", -1);
        video_id = video_arr[1];
    }
    return (
        <Modal show={isOpen} onHide={onClose} centered size="lg">
            <CloseButton
                onClick={onClose}
                position="absolute"
                right="-40px"
                top="-40px"
                color="#fff"
            />
            <iframe
                className="modal__video-style"
                loading="lazy"
                width="800"
                height="500"
                src={`https://www.youtube.com/embed/${video_id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </Modal>
    );
};

VideoModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    video_link: PropTypes.string,
};

export default VideoModal;
