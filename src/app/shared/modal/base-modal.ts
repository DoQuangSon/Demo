import { Subject } from "rxjs/internal/Subject";

export class BaseModal {
    public eventChange:  Subject<any> = new Subject<any>();
}