import { formatDate } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-changing',
  templateUrl: './date-changing.component.html',
  styleUrls: ['./date-changing.component.css']
})
export class DateChangingComponent implements OnInit {

  plan: string = "";
  date: string = "";
  Rdate:string = "";
  paper: string = "";
  @ViewChild('resultTextarea') resultTextarea!: ElementRef;
  resultField: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  mudaVencimento(): string {
    console.log(this.newDate(this.rMonth()).toLocaleDateString('pt-BR'))
    console.log(this.daysValue())
    console.log(this.accessDays())

    if (this.accessDays() > 0 &&
        parseInt(this.plan) >= 70 &&
        parseInt(this.plan) <= 250 &&
        this.rMonth() === 0 &&
        this.dateParts()[2] === 10 ||
        this.dateParts()[2] === 20 ||
        this.dateParts()[2] === 30) {
      return this.resultField =
            `Sobre possível mudança de vencimento, terá duas opções para a sua situação financeira:

Primeira opção:
${this.newDate(this.rMonth()).toLocaleDateString('pt-BR')
} – R$${this.daysValue()+this.paperToCancel()},00 referente aos dias de acesso ${this.paperToPay()
} (caso deseje receber um carnê impresso atualizado, a taxa de reimpressão custa R$5,00).
${this.newDate(this.rMonth()+1).toLocaleDateString('pt-BR')} – R$${parseInt(this.plan)},00

Segunda opção:
${this.newDate(this.rMonth()+1).toLocaleDateString('pt-BR')} – R$${this.daysValue()+this.paperToCancel()+parseInt(this.plan)
},00 referente aos dias de acesso + mensalidade ${this.paperToPay()
} (caso deseje receber um carnê impresso atualizado, a taxa de reimpressão custa R$5,00)
${this.newDate(this.rMonth()+2).toLocaleDateString('pt-BR')} – R$${parseInt(this.plan)},00`

} else if(this.accessDays() > 0 &&
          parseInt(this.plan) >= 70 &&
          parseInt(this.plan) <= 250 &&
          this.rMonth() === 1 &&
          this.dateParts()[2] === 10 ||
          this.dateParts()[2] === 20 ||
          this.dateParts()[2] === 30) {
  return this.resultField =
            `Sobre possível mudança de vencimento, podemos fazer da seguinte forma:

${this.newDate(this.rMonth()).toLocaleDateString('pt-BR')} – R$${this.daysValue()+this.paperToCancel()+parseInt(this.plan)
},00 referente aos dias de acesso + mensalidade ${this.paperToPay()
} (caso deseje receber um carnê impresso atualizado, a taxa de reimpressão custa R$5,00)
${this.newDate(this.rMonth()+1).toLocaleDateString('pt-BR')} – R$${this.plan},00`
}
else {
  return this.resultField =`Calculo não pôde ser realizado...Por favor, verifique se os valores estão corretos.`
   }
}

  paperToPay():string {
    let conditionalString = ''
    if(parseInt(this.paper) > 0){
      conditionalString = '+ cancelamento de boletos registrados';
    }

    return conditionalString
  }

  paperToCancel():number{
    let paperToCancel = 0;
    let paper = this.paper;

    if (paper !== "" && paper !== "e" ){
      paperToCancel = parseInt(paper)
    }

    return paperToCancel
  }

  dateParts(): number[]{
    let dateArr = this.date.split('-').map(Number);
    return dateArr
  }

  newDate(addMonths: number):Date {
    const data = new Date(this.dateParts()[0], this.dateParts()[1]-1, this.dateParts()[2]);
    data.setDate(parseInt(this.Rdate));
    data.setMonth(this.dateParts()[1]+(addMonths-1));

    return data
  }

  rMonth():number{
    let addMonth = 0
    let nDate = parseInt(this.Rdate)
    const todayDate = new Date()
    const today = todayDate.getDate()
    if( nDate < today ) { addMonth = 1 }

    return addMonth
  }

  daysValue():number{
    const dayValue = parseInt(this.plan)/30;
    let multiplier = 1;

    if (
      this.dateParts()[1] !== 4 &&
      this.dateParts()[1] !== 9 &&
      this.dateParts()[1] !== 11 &&
      this.dateParts()[1] !== 6) {
        if(this.dateParts()[1] === 2){
          multiplier = this.accessDays()-2;
        } else {
          multiplier = this.accessDays()+1;
        }
      } else {
        multiplier = this.accessDays();
      }

      const fullValue = multiplier * dayValue;
      let daysValue = fullValue.toFixed(2);
      const temp = daysValue.split('.').map(Number);

      if (temp[1] < 50){
        daysValue = `${temp[0]}`
      } else {
        daysValue = `${temp[0] + 1}`
        }

      return parseInt(daysValue);
  }

  accessDays():number {
    let accessDay = 0;
    const oldDate = this.dateParts()[2];
    const requestDate = parseInt(this.Rdate);

    if (oldDate != requestDate) {
        if (
          oldDate === 10 && requestDate === 20 ||
          oldDate === 20 && requestDate === 30 ||
          oldDate === 30 && requestDate === 10) {
            accessDay = 10;
        } else {
          accessDay = 20;
            }
    }

    return accessDay;
  }

  copyResult(){
    const textareaElement: HTMLTextAreaElement = this.resultTextarea.nativeElement;

    // Selecionar o texto no textarea
    textareaElement.select();

    try {
      // Tenta copiar o texto para a área de transferência
      document.execCommand('copy');
      console.log('Texto copiado com sucesso!');
    } catch (err) {
      console.error('Erro ao copiar o texto:', err);
    }

    // Deselecionar o texto
    textareaElement.setSelectionRange(0, 0);
  }

  fieldClenear() {
    this.plan = "";
    this.date = "";
    this.Rdate = "";
    this.paper = "";
    this.resultField = "";
  }
}
