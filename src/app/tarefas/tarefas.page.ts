import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})


export class TarefasPage {
  tarefas: { descricao: string; concluida: boolean }[] = [];
  novaTarefa: string = '';

  constructor() {
    this.carregarTarefas();
  }

  async adicionarTarefa() {
    if (this.novaTarefa.trim().length > 0) {
      this.tarefas.push({ descricao: this.novaTarefa, concluida: false });
      this.novaTarefa = '';
      await this.salvarTarefas();
    }
  }

  async removerTarefa(index: number) {
    this.tarefas.splice(index, 1);
    await this.salvarTarefas();
  }

  async alternarConclusao(tarefa: { descricao: string; concluida: boolean }) {
    tarefa.concluida = !tarefa.concluida;
    await this.salvarTarefas();
  }

  async salvarTarefas() {
    await Preferences.set({
      key: 'tarefas',
      value: JSON.stringify(this.tarefas),
    });
  }

  async carregarTarefas() {
    const { value } = await Preferences.get({ key: 'tarefas' });
    if (value) {
      this.tarefas = JSON.parse(value);
    }
  }
  
}
