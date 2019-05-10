import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Arquivo} from '../../models/arquivo';
import {TranslateService} from '@ngx-translate/core';
import {FiltroPipe} from '../../../../shared/pipes/filtro.pipe';
import {ArquivosService} from '../../services/arquivos.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.scss']
})
export class ArquivosComponent implements OnInit {

  @ViewChild('pesquisarInput') pesquisarInput: ElementRef;

  public qtdRegistros = 0;
  public isLoading = false;
  public pesquisar = false;
  public arquivos: Arquivo[] = [];
  public listaArquivos: Arquivo[] = [];
  public auxListaArquivos: Arquivo[] = [];
  public fimInfiniteScroll: boolean;

  constructor(public titulo: Title,
              private filtroPipe: FiltroPipe,
              private translate: TranslateService,
              private arquivosService: ArquivosService) {
    titulo.setTitle(this.translate.instant('arquivos.titulo'));
  }

  ngOnInit(): void {
    this.get();
  }

  public infiniteScroll(): void {
    this.addItens(this.qtdRegistros, this.qtdRegistros += 10);
  }

  public download(item: string): void {
    this.arquivosService.download(item).subscribe(res => {
      this.salvarArquivo(res.base64, res.nome);
    });
  }

  public abrirPesquisa(): void {
    this.pesquisar = !this.pesquisar;
    setTimeout(() => {
      this.pesquisarInput.nativeElement.focus();
    }, 0);
  }

  public fazerPesquisa(busca: string): void {
    this.arquivos = [];
    this.qtdRegistros = 0;
    if (busca.length > 0) {
      this.auxListaArquivos = this.filtroPipe.transform(this.listaArquivos, busca, 'nome');
      this.infiniteScroll();
    } else if (busca.length === 0) {
      this.auxListaArquivos = this.listaArquivos;
      this.infiniteScroll();
    }
  }

  public isMobile(): boolean {
    return window.outerWidth <= 767;
  }

  private get(): void {
    this.isLoading = true;
    this.arquivosService.get().subscribe((res: Arquivo[]) => {
      this.listaArquivos = res;
      this.auxListaArquivos = res;
      this.infiniteScroll();
      this.isLoading = false;
    });
  }

  private salvarArquivo(base64: string, nomeArquivo: string) {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: 'application/octet-stream'});
    saveAs(blob, nomeArquivo);
  }

  private addItens(inicio: number, fim: number): void {
    for (let cont = inicio; cont < fim; cont++) {
      if (this.auxListaArquivos.hasOwnProperty(cont)) {
        this.arquivos.push(this.auxListaArquivos[cont]);
      } else {
        this.fimInfiniteScroll = true;
      }
    }
  }

}
