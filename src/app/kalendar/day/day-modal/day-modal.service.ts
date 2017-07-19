import { Injectable } from '@angular/core';
import { DayModalComponent } from './day-modal.component';

@Injectable()
export class DayModalService {
  private modals: Array<DayModalComponent>;

  constructor() {
    this.modals = [];
  }

  registerModal(newModal: DayModalComponent): void {
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

  private findModal(modalId: string): DayModalComponent {
    for (const modal of this.modals) {
      if (modal.modalId === modalId) {
        return modal;
      }
    }
    return null;
  }
}