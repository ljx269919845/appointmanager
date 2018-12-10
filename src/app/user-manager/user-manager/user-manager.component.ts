import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { PagingBoxObj } from '../../shared';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  public search = {searchWord: '', date: null};
  public pageInfo = new PagingBoxObj(1, 0, 20);
  public users;
  public userCount = 0;

  constructor(private userServ: UserService) { }

  ngOnInit() {
    this.loadData();
  }

  handleSearch() {
    this.pageInfo = new PagingBoxObj(1, 0, 20);
    this.loadData();
  }

  handlePageChange(page) {
    this.pageInfo.page = page.page;
    this.loadData();
  }

  private loadData() {
    this.userServ.getUserList(this.search.searchWord, this.search.date && this.search.date.beginDate,
      this.search.date && this.search.date.endDate, this.pageInfo.page, this.pageInfo.rows)
      .success(res => {
        this.pageInfo.totalRecords = res.data.count;
        this.users = res.data.users || [];
    }).error(() => {
      this.pageInfo.totalRecords = 0;
      this.users = [];
    });
  }
}
