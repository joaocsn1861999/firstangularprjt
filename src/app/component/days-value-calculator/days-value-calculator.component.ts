import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-days-value-calculator',
  templateUrl: './days-value-calculator.component.html',
  styleUrls: ['./days-value-calculator.component.css']
})
export class DaysValueCalculatorComponent implements OnInit {
  days: string = '';
  plan: string = '';
  @ViewChild('resultTextarea') resultTextarea!: ElementRef;
  resultField: string = '';

  constructor() {}

  ngOnInit(): void {
  }

  sucessResult(result: number) {
    this.resultField =
        `O valor referente a ${
            this.days} dias de acesso do plano de R$${
            this.plan},00 fica um total de R$${result},00`;
  }

  daysValue() {
    const dayValue = parseFloat(this.plan)/30;
    const fullValue = dayValue*parseFloat(this.days);
    let daysValue = fullValue.toFixed(2);
    const temp = daysValue.split('.').map(Number);

    if (temp[1] < 50){
      daysValue = `${temp[0]}`
    } else {
      daysValue = `${temp[0] + 1}`
      }

    return parseInt(daysValue);
  }

  fieldClenear() {
    this.resultField = "";
    this.days = "";
    this.plan = "";
  }

  daysCalculator() {
    if (parseInt(this.days) > 1 && parseInt(this.plan) >= 70) {
      let caculate = true;
      if (parseInt(this.days) < 10) {
        var confirmation = confirm(
          'Menos de 10 dias não é necessário cobrança em muitos casos,'
          +' você tem certeza que deseja calcular?'
            );
            caculate = confirmation;
        }
      if (caculate === true) {
        return this.sucessResult(this.daysValue());
      } else {
        this.fieldClenear();
        return  this.resultField = `Calculo não realizado... :C`;
        }
    } else {
        this.fieldClenear();
        return this.resultField =
            `Quantidade de dias(${
            this.days}) ou plano(R$${
            this.plan},00) está invalida! Verifique e tente novamente, por favor.`;
        }
    }

    copyResult() {
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
}
