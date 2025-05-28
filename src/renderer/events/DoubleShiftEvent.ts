import { EventHandler } from '@renderer/events/core/types';

class DoubleShiftEvent extends EventHandler {
  private lastShiftTime = 0;
  private readonly DOUBLE_SHIFT_DELAY = 300;
  private boundKeyDownHandler = this.onKeyDown.bind(this);

  getEventName(): string {
    return 'keydown:DoubleShiftEvent';
  }

  on(cb: (data: any) => void): () => void {
    const remove = super.on(cb);
    this.enableDoubleShiftDetection();
    return () => {
      remove();
      this.disableDoubleShiftDetection();
    };
  }

  private enableDoubleShiftDetection() {
    window.addEventListener('keydown', this.boundKeyDownHandler);
  }

  private disableDoubleShiftDetection() {
    window.removeEventListener('keydown', this.boundKeyDownHandler);
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Shift') {
      const now = Date.now();
      if (now - this.lastShiftTime < this.DOUBLE_SHIFT_DELAY) {
        // 🔥 Double Shift detected!
        this.dispatch();
      }
      this.lastShiftTime = now;
    }
  }
}

export default new DoubleShiftEvent();
