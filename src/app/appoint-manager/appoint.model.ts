import { AppointSet } from '../model/appointment.model';
import { CommonFuncService } from '../core/common-func.service';

export class AppointItem {
  constructor(
    public timeFrame: String,
    public total = 0,
    public realyTotal = 0,
    public totalSurplus = 0,
    public appointSets = []
  ) {}

  public addAppointSet(appointSet: AppointSet) {
    const index = this.appointSets.findIndex(elem => elem.id === appointSet.id);
    if (index >= 0 && appointSet.id) {
      return;
    }
    this.total += appointSet.userNum;
    if (appointSet.doctor.status === 1) {
      this.realyTotal += appointSet.userNum;
      this.totalSurplus += (appointSet.userNum - appointSet.surplusNum);
    }
    this.appointSets.push(appointSet);
  }

  public clone() {
    return new AppointItem(this.timeFrame, this.total, this.realyTotal, this.totalSurplus, CommonFuncService.clone(this.appointSets));
  }
}
