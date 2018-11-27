export class Doctor {
  constructor(
    public id?: string,
    public doctorName?: string,
    public professional?: string,
    public doctorBref?: string,
    public doctorImg?: string,
    public doctorAge?: number,
    public doctorSex?: number,
    public doctorPhone?: string,
    public departId?: string,
    public status?: number,
    public updateTime?: string,
    public createTime?: string
  ) {}
}
