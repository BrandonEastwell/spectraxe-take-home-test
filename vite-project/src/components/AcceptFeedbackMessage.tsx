import type {AcceptFeedback} from "../types/acceptFeedback.ts";

interface AcceptFeedbackMessageProps {
    feedback: AcceptFeedback;
}

export function AcceptFeedbackMessage({ feedback }: AcceptFeedbackMessageProps) {
    return (
        <p
            role={feedback.type === "error" ? "alert" : "status"}
            aria-live={feedback.type === "error" ? "assertive" : "polite"}
            className={"mb-4 rounded-md border px-3 py-2 text-sm " + (
                feedback.type === "error"
                    ? "border-danger bg-danger/10 text-text-primary"
                    : "border-success bg-success/10 text-text-primary"
            )}
        >
            {feedback.message}
        </p>
    );
}
