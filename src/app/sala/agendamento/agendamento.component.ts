import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Agendamento} from '../models/agendamento';
import { SalaService } from '../services/sala.service';

import { ToastrService } from 'ngx-toastr';
import { NgbTimepickerConfig, NgbTimeStruct, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  providers:[
    NgbTimepickerConfig
  ]
})
export class AgendamentoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  agendamentoForm!: FormGroup;
  agendamento: Agendamento;

  data: any;
  
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  
  constructor(private fb: FormBuilder,
    private salaservice: SalaService,
    private router: Router,
    private toastr: ToastrService) {

     this.validationMessages = {
      data:{
        required: 'Informe a Data'
      },
      titulo:{
        required: 'Informe o título do agendamento'
      },
      horaInicio:{
        required:'Selecione o horário inicial'
      },
      horaFim:{
        required:'Selecione o horário final'
      },
      salaNumero:{
        required:'Informe o Número da Sala'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    
    this.agendamentoForm = this.fb.group({  
      data: ['',[Validators.required]],
      horaInicio: ['',[Validators.required]],
      horaFim: ['',[Validators.required]],
      salaNumero: ['',[Validators.required]],
      titulo: ['',[Validators.required]]
      });
    };

    
  ngAfterViewInit(): void{
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef)=> fromEvent(formControl.nativeElement,'blur'));

    merge(...controlBlurs).subscribe(()=>{
      this.displayMessage = this.genericValidator.processarMensagens(this.agendamentoForm);
    })
  }
  agendarSala(){
    if(this.agendamentoForm.dirty && this.agendamentoForm.valid){
      
      this.agendamento = Object.assign({}, this.agendamento, this.agendamentoForm.value);
      if(this.agendamento.horaInicio >= this.agendamento.horaFim){
        this.toastr.warning('Hora inicio deve ser menor que hora fim.','Algo deu errado!')
      }
      else{
        this.agendamento.horaFim = this.agendamento.horaFim +':00';
        this.agendamento.horaInicio = this.agendamento.horaInicio +':00';
        this.salaservice.AgendarSala(this.agendamento)
         .subscribe(
         sucesso => {this.processarSucesso(sucesso)},
         falha => {this.processarFalha(falha)}
      );
      }
    }
  }

  processarSucesso(response: any){
    this.agendamentoForm.reset();
    this.errors =[];
    let toast = this.toastr.success('Sala Reservada com sucesso!','Deu certo!');

    if(toast){
      toast.onHidden.subscribe(()=>{
        this.router.navigate(['/sala/lista']);
      });
    }
  }

  processarFalha(fail: any){
    this.errors = fail.error.errors; 
    this.toastr.error('Erro ao Agendar Sala, Verifique a lista dos horários já agendados', 'Opa :(')
  }
}