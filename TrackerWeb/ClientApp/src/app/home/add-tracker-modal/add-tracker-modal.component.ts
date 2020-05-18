import { Component, OnInit, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TrackerService } from '../../Services/tracker.service';
import { CookieService } from 'ngx-cookie-service';
import { Tracker } from '../../models/Tracker';

@Component({
  selector: 'app-add-tracker-modal',
  templateUrl: './add-tracker-modal.component.html',
  styleUrls: ['./add-tracker-modal.component.css']
})
export class AddTrackerModalComponent implements OnInit {

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private trackerService: TrackerService, private ngxUiLoaderService: NgxUiLoaderService, private cookieService: CookieService) { }

  @ViewChild('addTrackerModal', { static: false }) trackerModal: TemplateRef<any>;
  @Output() addNewTrackerComplete = new EventEmitter<boolean>();
  modalRef: BsModalRef;
  createTrackerForm: FormGroup;
  submittedTrackerForm: boolean = false;

  ngOnInit() {
    //this.createTrackerForm = this.formBuilder.group({
    //  trackerName: ['', Validators.required],
    //  trackerTotalTime: ['', Validators.required],
    //});
  }

  show() {
    this.modalRef = this.modalService.show(this.trackerModal, { class: 'modal-sm', animated: true });
    this.createTrackerForm = this.formBuilder.group({
      trackerName: ['', Validators.required],
      trackerTotalTime: ['', Validators.required],
    });
    this.createTrackerForm.reset;
  }

  get modalForm() {
    return this.createTrackerForm.controls;
  }

  addTracker() {
    this.submittedTrackerForm = true;

    // stop here if form is invalid
    if (this.createTrackerForm.invalid) {
      return;
    }

    let userName = this.cookieService.get('UserName');
    this.ngxUiLoaderService.startLoader("AddLoginLoader");
    let tracker = <Tracker>{ trackerName: this.createTrackerForm.value.trackerName, trackerTotalTime: this.createTrackerForm.value.trackerTotalTime, userName: userName };
    this.trackerService.addTracker(tracker).subscribe((res: any) => {
      this.ngxUiLoaderService.stopLoader("AddLoginLoader");
      this.submittedTrackerForm = false;
      if (res.isSucceeded) {
        this.addNewTrackerComplete.emit(res.isSucceeded);
        this.cancel();
      }
    });
  }

  cancel() {
    this.modalRef.hide();
  }
}
