"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var token_manager_1 = require('../service/token.manager');
var note_manager_1 = require('../service/note.manager');
var WorkoutSchedule = (function () {
    function WorkoutSchedule(router, noteService, authToken) {
        var _this = this;
        this.router = router;
        this.noteService = noteService;
        this.authToken = authToken;
        this.duration = "0";
        this.distance = 1;
        this.calories = 0;
        this.showEdit = false;
        this.titleNote = "";
        this.editNote = "";
        this.user = this.authToken.getToken();
        this.noteService.getNotes(this.user.email).subscribe(function (theNotes) {
            _this.notes = theNotes;
        });
    }
    WorkoutSchedule.prototype.over = function (ifButtons, note) {
        note.showButtons = ifButtons;
    };
    WorkoutSchedule.prototype.addNote = function (title, note) {
        var _this = this;
        if (title != "" && note != "" && title != undefined && note != undefined) {
            var oneNote = {
                email: this.user.email,
                title: title,
                note: note,
                showButtons: false
            };
            this.noteService.add(oneNote).subscribe(function (returnedNote) {
                if (returnedNote != null && returnedNote != undefined && returnedNote !== { err: "Email already exists" }) {
                    _this.notes.push(returnedNote);
                }
                _this.addTitle = "";
                _this.adDNote = "";
            });
        }
    };
    WorkoutSchedule.prototype.edit = function (note) {
        this.showEdit = true;
        this.passNote = note;
        this.titleNote = note.title;
        this.editNote = note.note;
    };
    WorkoutSchedule.prototype.updateNote = function () {
        var _this = this;
        this.passNote.title = this.titleNote;
        this.passNote.note = this.editNote;
        this.noteService.edit(this.passNote).subscribe(function (thenote) {
            var note = {
                email: _this.user.email,
                title: thenote.title,
                note: thenote.note,
                showButtons: false,
                _id: thenote._id
            };
            _this.passNote = note;
        });
        this.showEdit = false;
    };
    WorkoutSchedule.prototype.removeEdit = function () {
        this.showEdit = false;
        this.titleNote = "";
        this.editNote = "";
    };
    WorkoutSchedule.prototype.delete = function (note, i) {
        var _this = this;
        this.noteService.delete(note).subscribe(function (isdelete) {
            if (isdelete) {
                _this.notes.splice(i, 1);
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WorkoutSchedule.prototype, "duration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WorkoutSchedule.prototype, "distance", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WorkoutSchedule.prototype, "calories", void 0);
    WorkoutSchedule = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'workout-schedule',
            templateUrl: './workout-schedule.component.html',
            styleUrls: ['workout-schedule.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.Router, note_manager_1.NoteService, token_manager_1.TokenManager])
    ], WorkoutSchedule);
    return WorkoutSchedule;
}());
exports.WorkoutSchedule = WorkoutSchedule;
//# sourceMappingURL=workout-schedule.component.js.map