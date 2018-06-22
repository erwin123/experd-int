import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../models/client.model';
import { Lob } from '../models/lob.model';
import { ClientService } from '../services/client.service';
import { LobService } from '../services/lob.service';
import { AlertComponent } from '../alert/alert.component';
import { NgForm } from '@angular/forms';
import { ClrDatagridStringFilterInterface } from "@clr/angular";


class ClientFilter implements ClrDatagridStringFilterInterface<Client> {
  accepts(cln: Client, search: string): boolean {
    return cln.klien_code.toLowerCase().indexOf(search) >= 0
      || cln.klien_name.toLowerCase().indexOf(search) >= 0;
  }
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clientFilter;
  clientList;
  lobList;
  showInput = false;
  disableInput = false;

  mode = "";

  model: Client = new Client();
  @ViewChild('alertCom') alert: AlertComponent;
  constructor(private clientService: ClientService, private lobService: LobService) { }

  ngOnInit() {
    this.reloadGrid();
    this.lobService.getlob()
      .subscribe(res =>
        this.lobList = res
      );
    this.clientFilter = new ClientFilter();
  }

  reloadGrid() {
    this.clientList = [];
    this.clientService.getAllClient()
      .subscribe(res =>
        this.clientList = res
      );
  }

  toggleInput() {
    this.model = new Client();
    this.mode = "create";
    this.disableInput = false;
    this.showInput = !this.showInput;
  }

  onSubmit(form: NgForm) {
    if (this.mode === "create") {
      this.clientService.postClient(this.model).subscribe(res => {
        if (res) {
          this.alert.openMessageBox("Client Saved!", "Client No " + res);
          this.model.klien_code = res.klien_code;
          this.reloadGrid();
          setTimeout(() => {
            form.resetForm();
          }, 2000);
        }
      },
        err => {
          this.alert.openMessageBox("Error!", "We are sorry, somethin error on my service");
        }
      );
    }

    if (this.mode === "edit") {
      this.clientService.putClient(this.model).subscribe(res => {
        if (res) {
          this.alert.openMessageBox("Client Saved!", "Client No " + res + " updated!");
          this.model.klien_code = res.klien_code;
          this.reloadGrid();
          setTimeout(() => {
            form.resetForm();
            this.mode = "create";
          }, 2000);
        }
      },
        err => {
          this.alert.openMessageBox("Error!", "We are sorry, somethin error on my service");
        }
      );
    }
  }

  onViewData(client: Client) {
    this.clientService.getClient(client.klien_code)
      .subscribe(res => {
        console.log(res);
        this.model = res[0];
        this.showInput = true;
        this.disableInput = true;
      });
  }

  onEditData(client: Client) {
    this.clientService.getClient(client.klien_code)
      .subscribe(res => {
        console.log(res);
        this.model = res[0];
        this.showInput = true;
        this.mode = "edit";
      });
  }

  onDeleteData(client: Client) {
    this.model = client;
    this.showInput = false;
    this.disableInput = true;
    this.alert.openConfirm("Warning!", "You sure want to delete this data forever?", true);
  }

  acceptAnswer(answer){
    if(answer)
    {
      this.clientService.deleteClient(this.model)
      .subscribe(res => {
        if (res) {
          //this.alert.openMessageBox("Client Deleted!", "Client No " + res + " has been deleted!");
          this.reloadGrid();
        }
      });
    }
  }
}
