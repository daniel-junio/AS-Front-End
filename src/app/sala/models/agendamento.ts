import { Sala } from './sala';

export interface Agendamento{
    id: string;
    salaId: Sala;
    titulo: string;
    datahorainicio: TimeRanges;
    datahorafim: TimeRanges;    
}