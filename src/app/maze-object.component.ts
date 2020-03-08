import { Component, OnInit, Input } from "@angular/core";
import { ICellType } from "./app.types";

@Component({
  selector: "maze-object",
  template: `
    <img
      class="maze-item"
      *ngIf="objectType === PLAYER"
      src="../assets/img/mario.png"
    />
    <img
      class="maze-item"
      *ngIf="objectType === ENEMY"
      src="../assets/img/enemy.png"
    />
  `,
  styles: [
    `
      .maze-item {
        width: 25px;
        height: 25px;
      }
    `
  ]
})
export class MazeObjectComponent {
  @Input() objectType: ICellType;
  ENEMY: ICellType = "enemy";
  PLAYER: ICellType = "player";
}
