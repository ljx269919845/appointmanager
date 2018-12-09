import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  public search = {searchWord: '', date: null};
  public pageInfo = {pageIndex: 1, pageSize: 20};
  public users;
  public userCount = 0;

  constructor(private userServ: UserService) { }

  ngOnInit() {
    this.loadData();
  }

  handleSearch() {
    this.pageInfo.pageIndex = 1;
    this.loadData();
  }

  handlePageChange(page) {
    this.pageInfo.pageIndex = page;
    this.loadData();
  }

  private loadData() {
    this.userServ.getUserList(this.search.searchWord, this.search.date && this.search.date.beginDate,
      this.search.date && this.search.date.endDate, this.pageInfo.pageIndex, this.pageInfo.pageSize)
      .success(res => {
        this.userCount = res.data.count;
        this.users = res.data.users || [];
    }).error(() => {
      this.userCount = 0;
      this.users = [];
    });
  }
}
