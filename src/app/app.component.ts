import { Component, OnInit, HostListener } from "@angular/core";

type ICellType = "empty" | "enemy" | "player";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ng-maze-game";
  totalRows = 4;
  totalColumns = 4;
  mazeObj: Array<Array<ICellType>> = [];
  EMPTY: ICellType = "empty";
  ENEMY: ICellType = "enemy";
  PLAYER: ICellType = "player";
  enemyCount = 0;
  playerRowIndex = 0;
  playerColumnIndex = 0;
  stepsCount = 0;

  @HostListener("document:keyup", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.handlePlayerNavigation(event.key);
  }

  ngOnInit() {
    this.initApp();
  }

  initApp() {
    this.totalRows = this.getRowsFromUser();
    this.totalColumns = this.getColumnsFromUser();
    this.enemyCount = Math.trunc((this.totalRows + this.totalColumns) / 2);
    this.generateMaze();
    this.placeEnemy();
    this.placePlayer();
  }

  resetProp() {
    this.totalRows = 4;
    this.totalColumns = 4;
    this.stepsCount = 0;
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

  getMazeCellsData() {
    let mazeObj = [];
    for (let r = 0; r < this.totalRows; r++) {
      mazeObj[r] = [];
      for (let c = 0; c < this.totalColumns; c++) {
        mazeObj[r][c] = this.EMPTY;
      }
    }
    return mazeObj;
  }

  placeEnemy() {
    let enemyAdded = 0;
    while (enemyAdded < this.enemyCount) {
      let row = this.getRandomNumberInRange(0, this.totalRows - 1);
      let column = this.getRandomNumberInRange(0, this.totalColumns - 1);
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
      // rowCenter = rowCenter === 1 ? rowCenter + 1 : rowCenter;
      // columnCenter = columnCenter === 1 ? columnCenter + 1 : columnCenter;
      let rowIndex = this.getRandomNumberInRange(rowCenter - 1, rowCenter + 1);
      let columnIndex = this.getRandomNumberInRange(
        columnCenter - 1,
        columnCenter + 1
      );
      let row = rowIndex;
      let column = columnIndex;
      if (this.mazeObj[row][column] === this.ENEMY) {
        continue;
      } else {
        this.mazeObj[row][column] = this.PLAYER;
        this.playerRowIndex = rowIndex;
        this.playerColumnIndex = columnIndex;
        playerAdded = true;
      }
    }
  }

  handlePlayerNavigation(key: string) {
    let newRowIndex = this.playerRowIndex;
    let newColumnIndex = this.playerColumnIndex;
    switch (key) {
      case "ArrowUp": {
        newRowIndex = newRowIndex === 0 ? 0 : newRowIndex - 1;
        break;
      }
      case "ArrowDown": {
        newRowIndex =
          newRowIndex === this.totalRows - 1
            ? this.totalRows - 1
            : newRowIndex + 1;
        break;
      }
      case "ArrowLeft": {
        newColumnIndex = newColumnIndex === 0 ? 0 : newColumnIndex - 1;
        break;
      }
      case "ArrowRight": {
        newColumnIndex =
          newColumnIndex === this.totalColumns - 1
            ? this.totalColumns - 1
            : newColumnIndex + 1;
        break;
      }
      default: {
        console.info("Use left, right, up & down arrow for navigation!");
        break;
      }
    }
    if (
      newRowIndex !== this.playerRowIndex ||
      newColumnIndex !== this.playerColumnIndex
    ) {
      this.stepsCount++;
      this.checkAndUpdateEnemyCount(newRowIndex, newColumnIndex);
      this.updatePlayerLocation(newRowIndex, newColumnIndex);
      if (this.enemyCount === 0) {
        this.displayPlayerWonMessage();
      }
    }
  }

  checkAndUpdateEnemyCount(newRowIndex: number, newColumnIndex: number) {
    if (this.mazeObj[newRowIndex][newColumnIndex] === this.ENEMY) {
      this.enemyCount--;
    }
  }

  updatePlayerLocation(newRowIndex: number, newColumnIndex: number) {
    this.mazeObj[this.playerRowIndex][this.playerColumnIndex] = this.EMPTY;
    this.mazeObj[newRowIndex][newColumnIndex] = this.PLAYER;
    this.playerRowIndex = newRowIndex;
    this.playerColumnIndex = newColumnIndex;
  }

  displayPlayerWonMessage() {
    alert(`Game over. Total moves to save Princess : ${this.stepsCount}`);
    this.resetProp();
    setTimeout(() => this.initApp(), 1000);
  }

  getRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
