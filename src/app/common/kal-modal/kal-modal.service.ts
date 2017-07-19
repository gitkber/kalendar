import { Injectable } from '@angular/core';
import { KalModalComponent } from './kal-modal.component';

@Injectable()
export class KalModalService {
  private modals: Array<KalModalComponent>;

  constructor() {
    this.modals = [];
  }

  registerModal(newModal: KalModalComponent): void {
    const modal = this.findModal(newModal.modalId);

    // Delete existing to replace the modal
    if (modal) {
      this.modals.splice(this.modals.indexOf(modal));
    }
console.log("push", newModal);
    this.modals.push(newModal);
  }

  open(modalId: string): void {
    const modal = this.findModal(modalId);
    console.log("open", modal);
    
    if (modal) {
      modal.isOpen = true;
    }
  }

  close(modalId: string, checkBlocking = false): void {
    const modal = this.findModal(modalId);

    if (modal) {
      if (checkBlocking && modal.blocking) {
        return;
      }

      modal.isOpen = false;
    }
  }

  private findModal(modalId: string): KalModalComponent {
    for (const modal of this.modals) {
      if (modal.modalId === modalId) {
        return modal;
      }
    }
    return null;
  }
}