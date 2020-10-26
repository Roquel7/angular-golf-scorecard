import { Observable } from 'rxjs';
import { Player } from './../model/player';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  constructor(
    private db: AngularFirestore
  ) { }

  savePlayerScore(player: Player): any {
    this.db.collection('player-scores').add(player);
  }


  getPlayerHours(): Observable<Player[]> {
    const playerList = this.db.collection('player-scores');
    return playerList.snapshotChanges().pipe(
        map((items: DocumentChangeAction<Player>[]): Player[] => {
            return items.map((item: DocumentChangeAction<Player>): Player => {
                return {
                    id: item.payload.doc.id,
                    name: item.payload.doc.data().name,
                    1: item.payload.doc.data()[1],
                    2: item.payload.doc.data()[2],
                    3: item.payload.doc.data()[3],
                    4: item.payload.doc.data()[4],
                    5: item.payload.doc.data()[5],
                    6: item.payload.doc.data()[6],
                    7: item.payload.doc.data()[7],
                    8: item.payload.doc.data()[8],
                    9: item.payload.doc.data()[9],
                    10: item.payload.doc.data()[10],
                    11: item.payload.doc.data()[11],
                    12: item.payload.doc.data()[12],
                    13: item.payload.doc.data()[13],
                    14: item.payload.doc.data()[14],
                    15: item.payload.doc.data()[15],
                    16: item.payload.doc.data()[16],
                    17: item.payload.doc.data()[17],
                    18: item.payload.doc.data()[18],
                };
            });
        })
    );
  }

  updatePlayerScore(player: Player): any {
    this.db.collection('player-scores').doc(player.id).set(player);
  }

  deletePlayer(player: Player): any {
    this.db.collection('player-scores').doc(player.id).delete();
  }

}
