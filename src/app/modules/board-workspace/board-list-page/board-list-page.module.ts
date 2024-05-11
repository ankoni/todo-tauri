import { NgModule } from "@angular/core";
import { BoardListComponent } from "./components/board-list.component";
import { BoardCardComponent } from "./components/board-card/board-card.component";
import { BoardApiService } from "./services/board-api.service";
import { BoardListService } from "./services/board-list.service";

@NgModule({
    declarations: [
        BoardListComponent,
        BoardCardComponent
    ],
    providers: [
        BoardApiService,
        BoardListService,
    ]
})
export class BoardListPageModule {}