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
  hidden: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  public showResult():void {

    if (this.hableToCalculate(
          this.daysDiff(),
          this.dateParts()[2],
          this.dateParts()[1]) === true){
      this.resultField = this.getResult();
      this.hidden = false
    } else {
      this.resultField =`Calculo não pôde ser realizado...Por favor, verifique se os valores estão corretos.`
   }
}

  private paperToPay():string{
    let conditionalString = ''
    if(parseInt(this.paper) > 0){
      conditionalString = '+ cancelamento de boletos registrados';
    }

    return conditionalString
  }

  private paperToCancel():number{
    let paperToCancel = 0;
    let paper = this.paper;

    if (paper !== "" && paper !== "e" ){
      paperToCancel = parseInt(paper)
    }

    return paperToCancel
  }

  //return an array [0 = year, 1 = month, 2 = day]
  private dateParts():number[]{
    let dateArr = this.date.split('-').map(Number);
    return dateArr
  }

  //return the new date of payment - NEED FIX
  private newDate(addMonth?:number):string{
    let day = parseInt(this.Rdate);
    let month = (this.dateParts()[1]);
    if (this.nextMonth() === false){
        month = month -1
    };
    if (addMonth){
      month = month + addMonth
    };
    if (
      month === 1 && day === 30 ||
      month === 13 && day === 30)
      {
        month = month +1;
        day = 0;
    }

    return new Date(this.dateParts()[0], month, day).toLocaleDateString('pt-BR');
  }

  //Says if the date can be only in the next month or not
  private nextMonth():boolean{
    let nextMonth = false
    const todayDate = new Date()
    const today = todayDate.getDate()
     if (parseInt(this.Rdate) < today) { nextMonth = true }

    return nextMonth
  }

  private daysValue():number{
    const fullValue = this.daysDiff() * (parseInt(this.plan)/30);

    return Math.round(fullValue);
  }

  private daysDiff():number{
    const oldDate = this.dateParts()[2];
    const requestDate = parseInt(this.Rdate);

    const todayDate = new Date();
    const currentlyDay = todayDate.getDate();
    const monthLastDay = new Date( todayDate.getFullYear(), todayDate.getMonth() +1, 0)
    const lastDay = monthLastDay.getDate()

    let daysDiff = 0;

    if (oldDate != requestDate) {
      if (this.dateParts()[1] === 2){
        if(
          oldDate === 10 || oldDate === 20 &&
          requestDate === 20 || requestDate === 30
          ){
            if (requestDate === 30){
              daysDiff = lastDay - oldDate
            } else {
              daysDiff = 10
              }
            } else if(oldDate === 30){
              daysDiff = requestDate;
              } else {
                daysDiff = (lastDay - oldDate) + requestDate;
                }
      } else if(
          oldDate === 10 || oldDate === 20 &&
          requestDate === 20 || requestDate === 30
          ){
            daysDiff = requestDate - oldDate;
            } else if(oldDate === 30){
              daysDiff = (lastDay - oldDate) + requestDate;
              } else {
                daysDiff = 20;
                }
    }

    return Math.abs(daysDiff);
  }

  private dateValidator(day:number, month:number):boolean{
    let validDate = false;
    if(day === 10 || day === 20 || day === 30
      ){
        validDate = true
      } else if(day === 29 && month === 2){
        validDate = true
      }
      return validDate
  }

  private hableToCalculate(
    daysDiff:number,
    currentDate:number,
    currentMonth:number):boolean{

    let permission = false;

    if(
      daysDiff > 0 &&
      this.dateValidator(currentDate,currentMonth) &&
      parseInt(this.plan) >= 70 &&
      parseInt(this.plan) <= 250
      )
    {
      return permission = true
    }

    return permission
  }

  private getResult():string{
    const plan = this.plan;
    const daysValue = this.daysValue();
    const paperValue = this.paperToCancel();
    let result:string = '';
    if (this.nextMonth() === false){
      result =
      `Sobre possível mudança de vencimento, terá duas opções para a sua situação financeira:

Primeira opção:
${this.newDate()} – R$${daysValue+paperValue
},00 referente aos dias de acesso ${this.paperToPay()
} (caso deseje receber um carnê impresso atualizado, a taxa de reimpressão custa R$5,00).
${this.newDate(1)} – R$${plan},00

Segunda opção:
${this.newDate(1)} – R$${daysValue+paperValue+parseInt(plan)
},00 referente aos dias de acesso + mensalidade ${this.paperToPay()
} (caso deseje receber um carnê impresso atualizado, a taxa de reimpressão custa R$5,00)
${this.newDate(2)} – R$${plan},00`
    } else {
      result =
      `Sobre possível mudança de vencimento, podemos fazer da seguinte forma:

${this.newDate()} – R$${daysValue+paperValue
},00 referente aos dias de acesso + mensalidade ${this.paperToPay()
} (caso deseje receber um carnê impresso atualizado, a taxa de reimpressão custa R$5,00)
${this.newDate(1)} – R$${plan},00`
    }
    return result
  }

  public copyResult():void{
    const textareaElement: HTMLTextAreaElement = this.resultTextarea.nativeElement;
    textareaElement.select();

    try {
      document.execCommand('copy');
      console.log('Texto copiado com sucesso!');
    } catch (err) {
      console.error('Erro ao copiar o texto:', err);
    }

    textareaElement.setSelectionRange(0, 0);
  }

  public fieldClenear():void{
    this.plan = "";
    this.date = "";
    this.Rdate = "";
    this.paper = "";
    this.resultField = "";
    this.hidden = true;
  }

  public formatDate():string{
    const day = this.dateParts()[2]
    let month = `${this.dateParts()[1]}`
    const year = this.dateParts()[0]

    if (parseInt(month) < 10){
      month = `0${month}`
    }
    let fullDate = `${day}/${month}/${year}`

    return fullDate
  }

}


