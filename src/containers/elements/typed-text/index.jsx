import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Container } from "@ui/wrapper";
import { SectionWrap, TypedTextWrap } from "./style";

const TypedText = () => {
    const { text } = useTypewriter({
        words: ["graphic", "web", "interactive"],
        loop: true,
    });
    return (
        <SectionWrap>
            <Container>
                <TypedTextWrap>
                    <span className="not-typical">
                        We are a creative studio <br /> focused on{" "}
                    </span>
                    <span>{text}</span>
                    <Cursor />
                    <span className="not-typical">design</span>
                </TypedTextWrap>
            </Container>
        </SectionWrap>
    );
};

export default TypedText;
