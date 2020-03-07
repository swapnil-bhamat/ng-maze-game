import { Component, AfterViewInit, OnInit } from "@angular/core";

type ICellType = "empty" | "enemy" | "player";

interface IRows {
  [key: string]: ICellType;
}

interface IMaze {
  [key: string]: IRows;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ng-maze-game";
  totalRows = 4;
  totalColumns = 4;
  mazeObj: IMaze = {};
  EMPTY: ICellType = "empty";
  ENEMY: ICellType = "enemy";
  PLAYER: ICellType = "player";
  activeCellRowNumber = 0;
  activeCellColumnNumber = 0;
  rowChar = "R";
  columnChar = "C";
  enemyCount = 0;
  constructor() {}

  ngOnInit() {
    this.totalRows = this.getRowsFromUser();
    this.totalColumns = this.getColumnsFromUser();
    this.enemyCount = Math.trunc((this.totalRows + this.totalColumns) / 2);
    this.generateMaze();
    this.placeEnemy();
    this.placePlayer();
    console.log(this.mazeObj);
  }

  getRowsFromUser() {
    let rows = parseInt(prompt("Please enter board width", ""));
    if (isNaN(rows)) {
      rows = this.totalRows;
    }
    return rows;
  }

  getColumnsFromUser() {
    let column = parseInt(prompt("Please enter board height", ""));
    if (isNaN(column)) {
      column = this.totalColumns;
    }
    return column;
  }

  generateMaze() {
    this.mazeObj = this.getMazeCellsData();
  }

  getMazeCellsData(): IMaze {
    let mazeObj = {};
    for (let r = 1; r <= this.totalRows; r++) {
      mazeObj[this.rowChar + r] = {};
      for (let c = 1; c <= this.totalColumns; c++) {
        mazeObj[this.rowChar + r][this.columnChar + c] = this.EMPTY;
      }
    }
    return mazeObj;
  }

  placeEnemy() {
    let enemyAdded = 0;
    while (enemyAdded < this.enemyCount) {
      let row = this.rowChar + this.getRandomNumberInRange(1, this.totalRows);
      let column =
        this.columnChar + this.getRandomNumberInRange(1, this.totalColumns);
      if (this.mazeObj[row][column] === this.ENEMY) {
        continue;
      } else {
        this.mazeObj[row][column] = this.ENEMY;
        enemyAdded++;
      }
    }
  }

  placePlayer() {
    let playerAdded = false;
    while (!playerAdded) {
      let rowCenter = Math.trunc(this.totalRows / 2);
      let columnCenter = Math.trunc(this.totalColumns / 2);
      let row =
        this.rowChar +
        this.getRandomNumberInRange(rowCenter - 1, rowCenter + 1);
      let column =
        this.columnChar +
        this.getRandomNumberInRange(columnCenter - 1, columnCenter + 1);
      if (this.mazeObj[row][column] === this.ENEMY) {
        continue;
      } else {
        this.mazeObj[row][column] = this.PLAYER;
        playerAdded = true;
      }
    }
  }

  getRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
