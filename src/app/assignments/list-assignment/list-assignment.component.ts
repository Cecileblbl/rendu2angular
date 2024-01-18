import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentService } from 'src/app/shared/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-list-assignment',
  templateUrl: './list-assignment.component.html',
  styleUrls: ['./list-assignment.component.css'],
})
export class ListAssignmentComponent {
  titre = "Formulaire d'ajout de devoir";
  color = 'green';
  id = 'monParagraphe';
  boutonDesactive = true;
  assignments?: Assignment[];
  constructor(
    private assignmentService: AssignmentService,
    public authService: AuthService,
    private router: Router
  ) {}

  formVisible = false;
  LoggedIn = false;

  selectedAssignment?: Assignment;

  ngOnInit() {
    console.log(' Page loading ');
    this.assignmentService
      .getAssignments()
      .subscribe((assignments) => (this.assignments = assignments));

    console.log(this.isLoggedin());
  }

  getAssignments() {
    this.assignmentService
      .getAssignments()
      .subscribe((assignments) => (this.assignments = assignments));
  }

  getColor(a: any) {
    if (a.submitted) return 'green';
    else return 'red';
  }

  assignmentClique(a: Assignment) {
    this.selectedAssignment = a;
  }
  isLoggedin() {
    return this.authService.isLoggedIn();
  }
  detailsAssignment(a: Assignment) {
    this.selectedAssignment = a;
    if (this.isLoggedin()) {
      console.log('detailsAssignment logged in ', a);
      this.router.navigate(['/assignment', a.id]);
    } else {
      this.router.navigate(['/login']);
      console.log('detailsAssignment not logged in ', a);
    }
    console.log('detailsAssignment', a);
  }
}
