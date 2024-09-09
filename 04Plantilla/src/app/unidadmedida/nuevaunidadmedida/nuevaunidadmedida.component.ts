import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from '../../Services/unidadmedida.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevaunidadmedida',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevaunidadmedida.component.html',
  styleUrl: './nuevaunidadmedida.component.scss'
})
export class NuevaunidadmedidaComponent implements OnInit {
  
  titulo = 'Nueva Unidad de Medida';
  frm_UnidadMedida: FormGroup;
  listaUnidadMedida : IUnidadMedida [] =[];
  idUnidadMedida = 0;


  constructor(
    private unidadService: UnidadmedidaService,
    private navegacion: Router,
    private ruta : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUnidadMedida = parseInt(this.ruta.snapshot.paramMap.get('id'));

    this.frm_UnidadMedida = new FormGroup({
      Detalle: new FormControl('', Validators.required),
      Tipo: new FormControl('', Validators.required)
    });
    this.CargarListaUnidadMedida();
    if(this.idUnidadMedida >0){
      this.unidadService.uno(this.idUnidadMedida).subscribe((unaUnidadMedida)=>{
        this.frm_UnidadMedida.controls["Detalle"].setValue(unaUnidadMedida.Detalle);
        this.frm_UnidadMedida.controls["Tipo"].setValue(unaUnidadMedida.Tipo);
        this.titulo = "Editar Unidad Medida";
      });
    }
    

  }

  CargarListaUnidadMedida(){
    this.unidadService.todos().subscribe({
      next:(data)=>{
        this.listaUnidadMedida = data;
        
      },
      error: (e) => {
        console.log(e);
      }
    });

  }

  cambio(objetoSleect: any) {
    this.frm_UnidadMedida.get('Tipo')?.setValue(objetoSleect.target.value);
  }
  grabar() {
    let unidadmedida : IUnidadMedida;
    if(this.idUnidadMedida >0){
      unidadmedida= {
        idUnidad_Medida : this.idUnidadMedida,
        Detalle : this.frm_UnidadMedida.get("Detalle")?.value,
        Tipo : this.frm_UnidadMedida.get("Tipo")?.value
      };
      this.unidadService.actualizar(unidadmedida).subscribe((respuesta)=>{
        if(parseInt(respuesta)>0){
          alert("Unidad Mediada Actualizada");
          this.navegacion.navigate(["/unidadmedida"])
        }
      });
    }else{
      unidadmedida = {
        Detalle : this.frm_UnidadMedida.get("Detalle")?.value,
        Tipo : this.frm_UnidadMedida.get("Tipo")?.value
      }
      this.unidadService.insertar(unidadmedida).subscribe((respuesta)=>{
        if (parseInt(respuesta) > 0) {
          alert('Unidad Medida grabada');
          this.navegacion.navigate(['/unidadmedida']);
        }
      });
    }
  }
}
