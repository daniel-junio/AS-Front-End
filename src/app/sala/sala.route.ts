import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ListaComponent } from './lista/lista.component';
import { SalaAppComponent } from './sala.app.component';

const  salaRouterConfig: Routes  = [
    {
        path: '', component: SalaAppComponent,
        children: [
            {path: 'lista', component: ListaComponent },
            {path: 'agendamento', component: AgendamentoComponent}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(salaRouterConfig)
    ],
    exports: [RouterModule]
})

export class SalaRoutingModule {}