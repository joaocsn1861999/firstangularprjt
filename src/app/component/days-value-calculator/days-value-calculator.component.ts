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
            this.plan} fica um total de R$${result}`;
  }

  daysValue() {
    let result = 0;
    const dayValue = parseFloat(this.plan)/30;
    return result = dayValue*parseFloat(this.days);
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
                 + ' você tem certeza que deseja calcular?'
            );
            caculate = confirmation;
        }
        if (caculate === true) {
            return this.sucessResult(this.daysValue());
    } else {
        this.fieldClenear();
        return  this.resultField =
            `Calculo não realizado... :C`;
        }
    } else {
        this.fieldClenear();
        return this.resultField =
            `Quantidade de dias(${
            this.days}) ou plano(R$${
            this.plan}) está invalida! Verifique e tente novamente, por favor.`;
        }
    }

    copyResult() {
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
}
