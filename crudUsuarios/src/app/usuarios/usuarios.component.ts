import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { UsuariosModel } from './usuarios.model';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  user: UsuariosModel = new UsuariosModel();
  userT: UsuariosModel = new UsuariosModel();
  userAtt: UsuariosModel = new UsuariosModel();
  setId: String;
  setIdDelete: String;
  users: Array<any> = new Array();

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }
  
  onSubmitCadastro(f: NgForm) {
    if (!f.valid) {
      alert('Favor preencher todos os campos');
    } else {
      this.cadastrarUsuario();
    }
  }

  onSubmitUpdate(g: NgForm) {
    if (!g.valid) {
      alert('Favor preencher todos os campos');
    } else {
      this.atualizarUsuario();
    }
  }

  onSubmitGetUsuario(h: NgForm) {
    if (!h.valid) {
      alert('Favor preencher todos os campos');
    } else {
      this.getUsuario();
    }
  }

  onSubmitDelete(i: NgForm) {
    if (!i.valid) {
      alert('Favor preencher todos os campos');
    } else {
      this.deletarUsuario();
    }
  }


  cadastrarUsuario() {
    this.usuarioService.cadastrarUsuario(this.user).subscribe(user => {
      this.user = new UsuariosModel();
      this.listarUsuarios();
    }, err => {
      console.log('erro ao cadastrar o user', err);
    });
  }

  listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe(users => {
      this.users = users;
    }, err => {
      console.log('erro ao listar os users', err);
    })
  }

  getUsuario() {
    if (this.setId === null) {

    }
    this.usuarioService.getUsuario(this.setId).subscribe(user => {
      if (user) {
        this.userT = user.constructor(user);
        this.setId = '';
      } else {
        this.setId = '';
        this.userT = new UsuariosModel();
      }

    }, err => {
      console.log('erro ao buscar user ', err);
    });
  }

  deletarUsuario() {
    this.usuarioService.deletarUsuario(this.setIdDelete).subscribe(user => {
      if (this.userT) {
        if (this.userT._id === this.setIdDelete) {
          this.userT = new UsuariosModel();
        }
      }
      this.setIdDelete = '';
      this.listarUsuarios();
    }, err => {
      console.log('erro ao deletar user ', err);
    });
  }

  atualizarUsuario() {
    this.usuarioService.atualizarUsuario(this.userAtt).subscribe(user => {
      this.userAtt = new UsuariosModel();
      this.listarUsuarios();

    }, err => {
      console.log('erro ao atualizar o user', err)
    })
  }
}

