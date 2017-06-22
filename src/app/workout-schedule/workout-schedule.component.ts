import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'
import { TokenManager } from '../service/token.manager';
import { NoteService } from '../service/note.manager';

@Component({
  moduleId: module.id,
  selector: 'workout-schedule',
  templateUrl: './workout-schedule.component.html',
  styleUrls: ['workout-schedule.component.css'],

})

export class WorkoutSchedule {

  @Input() duration: any = "0";
  notes: any;
  user: any;
  passNote: any;
  @Input() distance: any = 1;
  @Input() calories: any = 0;
  showEdit: boolean = false;
  public titleNote: any = "";
  public editNote: any = "";
  public addTitle: string;
  public adDNote: string;


  constructor(private router: Router, private noteService: NoteService,
    private authToken: TokenManager) {
    this.user = this.authToken.getToken();
    this.noteService.getNotes(this.user.email).subscribe(theNotes => {
      this.notes = theNotes;

    });

  }
  over(ifButtons: boolean, note: any) {
    note.showButtons = ifButtons;

  }
  addNote(title: string, note: string) {
    if (title != "" && note != ""  && title != undefined && note != undefined) {
     
      var oneNote = {
        email: this.user.email,
        title: title,
        note: note,
        showButtons: false


      }
      this.noteService.add(oneNote).subscribe(returnedNote => {
        if(returnedNote != null&& returnedNote!= undefined&&returnedNote!== {err: "Email already exists"}){
      this.notes.push(returnedNote);
        }
        
        this.addTitle = "";
        this.adDNote = "";
      })

    }

  }
  edit(note: any) {
    this.showEdit = true;
    this.passNote = note;
    this.titleNote = note.title;
    this.editNote = note.note;

  }
  updateNote() {
    this.passNote.title = this.titleNote;
    this.passNote.note = this.editNote;
    this.noteService.edit(this.passNote).subscribe(thenote => {
      var note = {
        email: this.user.email,
        title: thenote.title,
        note: thenote.note,
        showButtons: false,
        _id: thenote._id
      }
      this.passNote = note;
    })
    this.showEdit = false;
  }
  removeEdit(){
    this.showEdit = false;
      this.titleNote = "";
    this.editNote = "";
  }
  delete(note: any, i: number) {
    this.noteService.delete(note).subscribe(isdelete => {
      if (isdelete) {
        this.notes.splice(i, 1);
        
      }

    })
  }
}

