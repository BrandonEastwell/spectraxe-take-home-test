import type {ReactElement} from "react";

export function RFQCardRow({ children } : {children: ReactElement[]}) {
    return (
        <div className="grid grid-cols-2">
            {children}
        </div>
    )
}