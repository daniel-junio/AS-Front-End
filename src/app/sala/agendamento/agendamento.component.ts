import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Agendamento } from '../models/agendamento';
import { SalaService } from '../services/sala.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html'
})
export class AgendamentoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  agendamentoForm: FormGroup;
  agendamento: Agendamento;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder,
    private salaservice: SalaService,
    private router: Router,
    private toastr: ToastrService) {

     this.validationMessages = {
      datahorainicio:{
        required: 'Informe a data e hora de início'
      },
        datahorafim:{
        required: 'Informe a data e hora do fim'
      },
        titulo:{
          required: 'Informe o título do agendamento'
        }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.agendamentoForm = this.fb.group({
      titulo: [''],
      salaId: [''],
      datahorainicio: ['',[Validators.required]],
      datahorafim: [''] 
    });
  }
  ngAfterViewInit(): void{
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef)=> fromEvent(formControl.nativeElement,'blur'));

    merge(...controlBlurs).subscribe(()=>{
      this.displayMessage = this.genericValidator.processarMensagens(this.agendamentoForm);
      //this.mudancasNalSalvas =true;
    })

  }
  agendarSala(){
    if(this.agendamentoForm.dirty && this.agendamentoForm.valid){
      this.agendamento = Object.assign({}, this.agendamento, this.agendamentoForm.value);

      this.salaservice.AgendarSala(this.agendamento)
      .subscribe(
        sucesso => {this.processarSucesso(sucesso)},
        falha => {this.processarFalha(falha)}
      );
    }
  }

  processarSucesso(response: any){
    this.agendamentoForm.reset();
    this.errors =[];
    let toast = this.toastr.success('Sala Reservada com sucesso!','Deu certo!');

    if(toast){
      toast.onHidden.subscribe(()=>{
        this.router.navigate(['/lista']);
      });
    }
  }

  processarFalha(fail: any){
    this.errors = fail.error.errors; 
    this.toastr.error('Ocorreu um erro!', 'Opa :(')
  }

}
