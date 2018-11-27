import { Injectable } from '@angular/core';

@Injectable()
export class MultOptionsService {
  private data: Array<any>;
  private levelData: any = {};
  private selected = [];
  private key: string;
  private parentKey: string;

  constructor() { }
  /**
   * 初始化下拉选择框的所有数据
   * @param data
   * @param key 下拉选择框的关键字段
   */
  public registerData(data, key, parentKey) {
    this.data = data;
    this.key = key;
    this.parentKey = parentKey;
    this.formatLevelData();
    this.setDefaultSelected();
  }

  getNextLevel(parentId = null) {
    return this.levelData[parentId] || [];
  }

  getSelected(level: number, parentId?) {
    if (this.selected[level]) {
      return this.selected[level][this.key];
    }
    return undefined;
  }

  setSelected(level: number, value, parentId?) {
    if (level <= 0 && parentId === undefined) {
      parentId = this.getFirstLevelParentId();
    } else if (parentId === undefined) {
      parentId = this.selected[level - 1][this.key];
    }
    let valueId = value;
    if (value && typeof value === 'object') {
      valueId = value[this.key];
    }
    if (!this.levelData[parentId]) {
      for (let m = level; m < this.selected.length; ++m) {
        this.selected[m] = undefined;
      }
      return;
    }
    const index = this.levelData[parentId].findIndex(elem => elem[this.key] == valueId);
    if (index === -1) {
      this.selected[level] = this.levelData[parentId][0];
    } else {
      this.selected[level] = this.levelData[parentId][index];
    }
    if (this.levelData[this.selected[level][this.key]]) {
      this.setSelected(level + 1, this.selected[level + 1] || this.levelData[this.selected[level][this.key]][0], this.selected[level][this.key]);
    }
  }


  setSelectValue(value) {
    if(!this.data){
      this.selected = value;
      return;
    }
    if (value instanceof Array) {
      for (let i = 0; i < value.length; i++) {
        this.setSelected(i, value[i]);
      }
    }
  }

  getSelectValue() {
    if (!this.selected || !this.selected.length) {
      return null;
    }
    const selectVal = this.selected.filter(elem => {
      return elem !== undefined;
    });
    return selectVal;
  }

  /**
   * 获取第一级的parentId 如-999
   */
  public getFirstLevelParentId() {
    for (const parentId in this.levelData) {
      if (this.data.findIndex(elem => elem[this.key] == parentId) == -1) {
        return parentId;
      }
    }
    throw new Error('not find first level parentid');
  }

  private formatLevelData() {
    for (const elem of this.data) {
      if (this.levelData[elem[this.parentKey]]) {
        this.levelData[elem[this.parentKey]].push(elem);
      } else {
        this.levelData[elem[this.parentKey]] = [elem];
      }
    }
  }

  private setDefaultSelected() {
    const firstParentId = this.getFirstLevelParentId();
    if (!this.selected || !this.selected.length) {
      this.setSelected(0, this.levelData[firstParentId][0]);
    } else {
      const index = this.levelData[firstParentId].findIndex(elem => elem[this.key] == this.selected[0][this.key]);
      if (index === -1) {
        this.setSelected(0, this.levelData[firstParentId][0]); // 重新设置默认值
      }else{
        this.setSelectValue(this.selected); // 拿到数据后补充完整selected的值
      }
    }
  }
}
