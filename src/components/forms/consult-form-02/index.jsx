import { useForm } from "react-hook-form";
import { Row, Col } from "@ui/wrapper";
import { FormGroup, Input, Select } from "@ui/form-elements";
import Button from "@ui/button";
import axios from "axios";
import { hasKey } from "@utils";

const ConsultForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        axios
            .post("https://getform.io/f/nbdoxkra", {
                name: data.con_email,
                email: data.con_email,
                subject: data.message,
                message: data.message,
            },
            { headers: {'Accept': 'application/json'}})
            .then(response => console.log(response))
            .catch(error => console.log(error))
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col lg={6}>
                    <FormGroup mb={20}>
                        <Input
                            id="con_email"
                            type="email"
                            placeholder="Email *"
                            feedbackText={errors?.con_email?.message}
                            state={
                                hasKey(errors, "con_email")
                                    ? "error"
                                    : "success"
                            }
                            showState={!!hasKey(errors, "con_email")}
                            {...register("con_email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "invalid email address",
                                },
                            })}
                        />
                    </FormGroup>
                </Col>
                <Col lg={6}>
                    <FormGroup mb={20}>
                        <Select
                            aria-label="Select contact reason"
                            id="message"
                            defaultValue=""
                            feedbackText={errors?.message?.message}
                            state={
                                hasKey(errors, "message") ? "error" : "success"
                            }
                            showState={!!hasKey(errors, "message")}
                            {...register("message", {
                                required: "Select a field",
                            })}
                        >
                            <option value="">How can we help you?</option>
                            <option value="Improve Your Existing Website">
                                Improve Your Existing Website
                            </option>
                            <option value="Build A New Website">
                                Build A New Website
                            </option>
                            <option value="Build A Custom Software Application">
                                Build A Custom Software Application
                            </option>
                            <option value="Work For Code Less Traveled">
                                Work For Code Less Traveled
                            </option>
                        </Select>
                    </FormGroup>
                </Col>
            </Row>
            <Button fullwidth type="submit">
                Get a free consultation
            </Button>
        </form>
    );
};

export default ConsultForm;
