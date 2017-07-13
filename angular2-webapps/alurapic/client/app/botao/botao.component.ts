import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'botao',
    templateUrl: './botao.component.html'
})
export class BotaoComponent {

    @Input() estilo : string = 'btn-primary';
    @Input() confirmacao : boolean;
    @Input() tipo : string = 'button';
    @Input() desabilitado : boolean;
    @Output() acao = new EventEmitter();

    executaAcao() {
        if (this.confirmacao) {
            if (confirm("Deseja executar ação?")) {
                this.acao.emit(null);
            }
            return;
        }
        this.acao.emit(null);

    }
}