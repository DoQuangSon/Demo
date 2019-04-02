export class Alert {
    type: AlertType;
    message: string;
    duration: number;
    visible: string;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
