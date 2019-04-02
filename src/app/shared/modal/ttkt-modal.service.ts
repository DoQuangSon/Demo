import { Injectable } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal/bs-modal.service";
import { ModalConfirmComponent } from "./confirm/confirm.component";
import { Observable } from "rxjs/internal/Observable";

@Injectable({   providedIn: 'root' })
export class TtktModalService {
    constructor(
        private modalService: BsModalService
    ) {

    }

    openConfirm(title: string, msg: string, btn: string = 'Lưu'): Observable<any> {
        let modal = this.modalService.show(ModalConfirmComponent);
        modal.content.init(title, msg, btn);

        return modal.content.eventChange;
    }
}